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

  const mediaUrls = await Promise.all(
    files.map(async (file) => {
      const fileName = `${crypto.randomUUID()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("donation-images")
        .upload(fileName, file);

      if (error) throw error;

      // Get the public URL for the file
      const { data: publicUrlData } = supabase.storage
        .from("donation-images")
        .getPublicUrl(data.path);

      return {
        url: publicUrlData.publicUrl,
        type: file.type.startsWith("image/")
          ? "image"
          : ("video" as "image" | "video"),
      };
    })
  );

  return mediaUrls;
}

/**
 * Creates a new donation in the database
 */
export async function createDonation(
  donationData: DonationSubmission,
  mediaFiles: File[]
): Promise<{ id: number }> {
  try {
    // Verify authentication before proceeding
    const session = await logSessionInfo();
    if (!session) {
      throw new Error("No active session found. Please login again.");
    }

    // console.log("Verified session before donation:", session.user.id);

    // Ensure donor_id matches the authenticated user's ID
    if (donationData.donor_id !== session.user.id) {
      console.warn("Donor ID mismatch, correcting:", {
        provided: donationData.donor_id,
        session: session.user.id,
      });
      donationData.donor_id = session.user.id;
    }

    // 1. Upload media files
    const mediaUrls = await uploadDonationMedia(mediaFiles);

    // 2. Create the donation record
    const { data, error } = await supabase
      .from("donation")
      .insert([
        {
          type: donationData.type,
          description: donationData.description,
          donor_id: donationData.donor_id,
          quantity: donationData.quantity,
          unit: donationData.unit,
          amount: donationData.amount,
          campaign_id: donationData.campaign_id,
        },
      ])
      .select()
      .single();

    console.log("");

    if (error) {
      console.error("Error inserting donation:", error);
      throw error;
    }

    // console.log("Donation created:", data);

    // 3. Add to donation_available
    const { data: availableData, error: availableError } = await supabase
      .from("donation_available")
      .insert([
        {
          title: `${
            donationData.type.charAt(0) +
            donationData.type.slice(1).toLowerCase()
          } Donation`,
          description: donationData.description,
          donor_id: donationData.donor_id, // Use the verified donor_id
          quantity: donationData.quantity,
          unit: donationData.unit,
          location: donationData.location,
          type: getTagIdForDonationType(donationData.type),
          donation_id: data.id,
          status: "AVAILABLE",
        },
      ])
      .select()
      .single();

    if (availableError) {
      console.error("Error inserting donation_available:", availableError, {
        donor_id: donationData.donor_id,
        sessionUserId: session.user.id,
      });
      throw availableError;
    }

    console.log("Donation available created:", availableData);

    // 4. Store media urls in donation_images table
    if (mediaUrls.length > 0) {
      const imageInserts = mediaUrls.map((media) => ({
        donation_id: data.id,
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

    return { id: data.id };
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
  const { data, error } = await supabase.from("donation_available").select(
    `
      id,
      title,
      description,
      quantity,
      unit,
      location,
      created_at,
      status,
      donation_id,
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
      *,
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
    .from("donation_available")
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
