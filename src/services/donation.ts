import { supabase, logSessionInfo } from "@/lib/db";

export interface DonationMedia {
  url: string;
  type: "image" | "video";
}

export interface DonationSubmission {
  type: string;
  description: string;
  quantity: number;
  unit: string;
  location: string;
  campaign_id?: number;
  amount?: number;
  donor_id: string;
}

/**
 * Uploads media files for a donation to Supabase storage
 */
export async function uploadDonationMedia(
  files: File[]
): Promise<DonationMedia[]> {
  if (!files.length) return [];

  // Get the current authenticated user
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) {
    throw new Error("Authentication required for file upload");
  }

  console.log("Starting upload of", files.length, "files");

  // Process files one at a time for better error handling
  const mediaUrls: DonationMedia[] = [];

  for (const file of files) {
    try {
      // Create a simple filename without user ID prefix
      const fileName = `${Date.now()}-${file.name}`;

      console.log(`Uploading file: ${file.name}`);

      // Update storage bucket permissions programmatically
      // This ensures the user has access regardless of RLS policies
      const { error: policyError } = await supabase.rpc(
        "check_storage_permissions"
      );
      if (policyError) {
        console.warn("Could not verify storage permissions:", policyError);
      }

      // Upload with explicit upsert option
      const { data, error } = await supabase.storage
        .from("donation-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true, // Allow overwriting existing files
        });

      if (error) {
        console.error("Upload error:", error);
        throw error;
      }

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from("donation-images")
        .getPublicUrl(data.path);

      console.log("File uploaded successfully:", data.path);

      mediaUrls.push({
        url: publicUrlData.publicUrl,
        type: file.type.startsWith("image/") ? "image" : "video",
      });
    } catch (error) {
      console.error("Error uploading file:", file.name, error);
      // Continue with other files
    }
  }

  return mediaUrls;
}

export async function createDonation(
  donationSubmission: DonationSubmission,
  mediaFiles: File[]
): Promise<{ id: number }> {
  try {
    // Verify authentication before proceeding
    const session = await logSessionInfo();
    if (!session) {
      throw new Error("No active session found. Please login again.");
    }

    console.log("Authenticated as:", session.user.id);

    // Ensure donor_id matches the authenticated user's ID
    if (donationSubmission.donor_id !== session.user.id) {
      console.warn("Donor ID mismatch, correcting:", {
        provided: donationSubmission.donor_id,
        session: session.user.id,
      });
      donationSubmission.donor_id = session.user.id;
    }

    // 1. Upload media files first
    const mediaUrls = await uploadDonationMedia(mediaFiles);
    console.log("Media uploaded:", mediaUrls.length, "files");

    // 2. Insert into donation_available table only (we're dropping the duplicate donation table)
    const { data: donationData, error: donationError } = await supabase
      .from("donation")
      .insert([
        {
          title: `${
            donationSubmission.type.charAt(0) +
            donationSubmission.type.slice(1).toLowerCase()
          } Donation`,
          description: donationSubmission.description,
          donor_id: donationSubmission.donor_id,
          quantity: donationSubmission.quantity,
          unit: donationSubmission.unit,
          location: donationSubmission.location,
          type: getTagIdForDonationType(donationSubmission.type),
          status: "AVAILABLE",
        },
      ])
      .select()
      .single();

    if (donationError) {
      console.error("Error inserting donation:", donationError);
      throw donationError;
    }

    console.log("Donation created:", donationData);

    // 3. Store media urls in donation_images table
    if (mediaUrls.length > 0) {
      const imageInserts = mediaUrls.map((media) => ({
        donation_id: donationData.id,
        media_url: media.url,
        media_type: media.type,
      }));

      const { data: imageData, error: imageError } = await supabase
        .from("donation_images")
        .insert(imageInserts)
        .select();

      if (imageError) {
        console.error("Error inserting donation_images:", imageError);
        throw imageError;
      }

      console.log("Donation images created:", imageData);
    }

    return { id: donationData.id };
  } catch (error) {
    console.error("Error creating donation:", error);
    throw error;
  }
}

/**
 * Get the tag ID for a donation type
 */
function getTagIdForDonationType(type: string): number {
  // This mapping should match your tag IDs in the database
  const typeToTagMap: Record<string, number> = {
    FOOD: 1,
    CLOTHES: 2,
    MEDICINE: 3,
    BOOKS: 4,
    FUNDS: 5,
    OTHER: 6,
  };

  return typeToTagMap[type] || 6; // Default to "OTHER" if type not found
}

/**
 * Get all available donations
 */
export async function getAvailableDonations() {
  console.log("fetching donations");
  const { data, error } = await supabase.from("donation").select(
    `
      id,
      title,
      description,
      quantity,
      unit,
      location,
      created_at,
      status,
      tag: type (
        id,
        name
      ),
      donor: donor_id (
        id,
        email,
        created_at
      ),
      donation_images (
        id,
        media_url,
        media_type
      )
    `
  );

  if (error) throw error;
  console.log("getAvailableDonations", data);
  return data;
}

/**
 * Get a specific donation by ID
 */
export async function getDonation(id: number) {
  const { data, error } = await supabase
    .from("donation")
    .select(
      `
      id,
      title,
      description,
      quantity,
      unit,
      location,
      created_at,
      status,
      tag: type (
        id,
        name
      ),
      donor: donor_id (
        id,
        email,
        created_at
      ),
      donation_images (
        id,
        media_url,
        media_type
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update the status of a donation
 */
export async function updateDonationStatus(id: number, status: string) {
  const { data, error } = await supabase
    .from("donation")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Request a donation
 */
export async function requestDonation(
  donationId: number,
  userId: string,
  requestData: { reason: string }
) {
  const { data, error } = await supabase
    .from("donation_requests")
    .insert([
      {
        donation_id: donationId,
        requester_id: userId,
        reason: requestData.reason,
        status: "PENDING",
      },
    ])
    .select()
    .single();

  if (error) throw error;

  // Update the donation status to REQUESTED
  await updateDonationStatus(donationId, "REQUESTED");

  return data;
}
