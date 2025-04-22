import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/db";
import {
  createDonation,
  requestDonation,
  DonationSubmission,
} from "@/services/donation";

// Base interfaces
export interface NGORecord {
  id: number;
  name: string;
  description: string;
  location: string;
  email: string;
  phone: string;
  website: string | null;
  tags?: string[];
  ngo_tag?: NGOTagRecord[];
}

// Tag Type
interface Tag {
  id: number;
  name: string;
}

// Donation Types
interface DonationTag {
  id: number;
  name: string;
}

interface DonationImage {
  id: number;
  media_url: string | null;
  media_type: string | null;
}

interface DonationResponse {
  id: number;
  title: string;
  description: string;
  quantity: number;
  unit: string;
  location: string;
  created_at: string;
  status: string;
  donor_id: string;
  tag: DonationTag;
  donation_images: DonationImage[];
}

// Fix for the DonationRequestResponse donation interface
interface DonationMedia {
  id: number;
  media_url: string | null;
  media_type: string | null;
}

interface DonationData {
  title: string;
  description: string;
  quantity: number;
  unit: string;
  location: string;
  donor_id: string;
  donation_images: DonationMedia[];
}

// Donation Request Types
interface DonationRequestResponse {
  id: number;
  donation_id: number;
  reason: string;
  status: string;
  created_at: string;
  donation: DonationData;
}

// Add more specific record types
interface TagRecord {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

interface NGOTagRecord {
  tag?: TagRecord;
}

interface CampaignRecord {
  id: number;
  name: string;
  description: string;
  target: number;
  completed: number | null;
  tag: TagRecord | TagRecord[] | { name: string } | null;
  ngo: { name: string; location: string } | null;
  image: string | null;
  created_at?: string;
  updated_at?: string;
  ngo_id?: number;
  tag_id?: number;
}

interface DonationImageRecord {
  id?: number;
  media_url?: string;
  media_type?: string;
}

interface DonationRecord {
  id?: number;
  title?: string;
  description?: string;
  quantity?: number;
  unit?: string;
  location?: string;
  created_at?: string;
  status?: string;
  donor_id?: string;
  tag?: TagRecord | TagRecord[];
  donation_images?: DonationImageRecord[];
}

interface DonationRequestRecord {
  id?: number;
  donation_id?: number;
  reason?: string;
  status?: string;
  created_at?: string;
  donation?: DonationRecord | DonationRecord[];
}

export function useNgos() {
  return useQuery<NGORecord[], Error>({
    queryKey: ["ngos"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("ngos").select("*");
        if (error) throw error;
        return data as NGORecord[];
      } catch (err) {
        console.error("Error fetching NGOs:", err);
        throw err;
      }
    },
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}

export function useTags() {
  return useQuery<Tag[], Error>({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tag").select("*");
      if (error) throw new Error(error.message);

      // Clean and type the data
      return data.map((tag) => ({
        id: Number(tag.id),
        name: String(tag.name),
      }));
    },
    staleTime: 1000 * 60 * 60 * 60, // Cache for 1 hr
    refetchOnWindowFocus: false,
  });
}

export const useCampaigns = () => {
  return useQuery<CampaignRecord[], Error>({
    queryKey: ["campaigns"],
    queryFn: async () => {
      // Fetch campaigns from Supabase
      const { data: campaigns, error } = await supabase.from("campaign").select(
        `
          *,
          tag (
            name
          ),
          ngo (
            name,
            location
          )
          `
      );

      if (error) throw error;

      // Ensure campaigns is not null
      if (!campaigns) return [];

      // Transform data if needed (e.g., for handling tag data format)
      return campaigns.map((campaign) => {
        // Ensure type safety when handling potentially variable data structures
        return {
          ...campaign,
          tag: campaign.tag || null,
        };
      });
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export function useFindDonations() {
  return useQuery<DonationResponse[], Error>({
    queryKey: ["findDonations"],
    queryFn: async () => {
      // Query the donation_available table
      const { data, error } = await supabase.from("donation").select(`
          id,
          title,
          description,
          quantity,
          unit,
          location,
          created_at,
          status,
          donor_id,
          tag: type (
            id,
            name
          ),
          donation_images (
            id,
            media_url,
            media_type
          )
        `);

      if (error) throw error;

      // Transform to DonationResponse[] with proper type handling
      return (data || []).map((item) => {
        // Use type assertion for safety
        const rawDonation = item as DonationRecord;

        // Handle the tag safely
        let tagInfo: DonationTag = { id: 0, name: "" };
        try {
          if (rawDonation.tag) {
            // Handle tag as array or object
            if (Array.isArray(rawDonation.tag) && rawDonation.tag.length > 0) {
              tagInfo = {
                id: Number(rawDonation.tag[0]?.id || 0),
                name: String(rawDonation.tag[0]?.name || ""),
              };
            } else if (typeof rawDonation.tag === "object") {
              const tagObj = rawDonation.tag as TagRecord;
              tagInfo = {
                id: Number(tagObj.id || 0),
                name: String(tagObj.name || ""),
              };
            }
          }
        } catch (err) {
          console.error("Error parsing donation tag:", err);
        }

        // Handle donation images
        const donationImages: DonationImage[] = [];
        try {
          if (Array.isArray(rawDonation.donation_images)) {
            rawDonation.donation_images.forEach((img: DonationImageRecord) => {
              donationImages.push({
                id: Number(img.id || 0),
                media_url: img.media_url ? String(img.media_url) : null,
                media_type: img.media_type ? String(img.media_type) : null,
              });
            });
          }
        } catch (err) {
          console.error("Error parsing donation images:", err);
        }

        // Create normalized donation object
        const normalizedDonation: DonationResponse = {
          id: Number(rawDonation.id || 0),
          title: String(rawDonation.title || ""),
          description: String(rawDonation.description || ""),
          quantity: Number(rawDonation.quantity || 0),
          unit: String(rawDonation.unit || ""),
          location: String(rawDonation.location || ""),
          created_at: String(
            rawDonation.created_at || new Date().toISOString()
          ),
          status: String(rawDonation.status || "AVAILABLE"),
          donor_id: String(rawDonation.donor_id || ""),
          tag: tagInfo,
          donation_images: donationImages,
        };

        return normalizedDonation;
      });
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    refetchOnWindowFocus: false,
  });
}

// Fix the createDonation function to use the proper signature
export function useCreateDonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      donationData,
      mediaFiles,
    }: {
      donationData: DonationSubmission;
      mediaFiles: File[];
    }) => createDonation(donationData, mediaFiles),
    onSuccess: () => {
      // Invalidate queries that might be affected
      queryClient.invalidateQueries({ queryKey: ["findDonations"] });
      queryClient.invalidateQueries({ queryKey: ["userDonations"] });
    },
  });
}

// Fix the requestDonation function to use the proper signature
export function useRequestDonation() {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    {
      donationId: number;
      userId: string;
      reason: string;
    }
  >({
    mutationFn: ({
      donationId,
      userId,
      reason,
    }: {
      donationId: number;
      userId: string;
      reason: string;
    }) => requestDonation(donationId, userId, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["findDonations"] });
      queryClient.invalidateQueries({ queryKey: ["donationRequests"] });
    },
  });
}

export function useUserDonations(userId: string) {
  return useQuery<DonationResponse[], Error>({
    queryKey: ["userDonations", userId],
    queryFn: async () => {
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
          donor_id,
          tag: type (
            id,
            name
          ),
          donation_images (
            id,
            media_url,
            media_type
          )
        `
        )
        .eq("donor_id", userId);

      if (error) throw error;

      // Transform to DonationResponse[] with proper type handling (similar to useFindDonations)
      return (data || []).map((item) => {
        // Use type assertion for safety
        const rawDonation = item as DonationRecord;

        // Handle the tag safely
        let tagInfo: DonationTag = { id: 0, name: "" };
        try {
          if (rawDonation.tag) {
            // Handle tag as array or object
            if (Array.isArray(rawDonation.tag) && rawDonation.tag.length > 0) {
              tagInfo = {
                id: Number(rawDonation.tag[0]?.id || 0),
                name: String(rawDonation.tag[0]?.name || ""),
              };
            } else if (typeof rawDonation.tag === "object") {
              const tagObj = rawDonation.tag as TagRecord;
              tagInfo = {
                id: Number(tagObj.id || 0),
                name: String(tagObj.name || ""),
              };
            }
          }
        } catch (err) {
          console.error("Error parsing donation tag:", err);
        }

        // Handle donation images
        const donationImages: DonationImage[] = [];
        try {
          if (Array.isArray(rawDonation.donation_images)) {
            rawDonation.donation_images.forEach((img: DonationImageRecord) => {
              donationImages.push({
                id: Number(img.id || 0),
                media_url: img.media_url ? String(img.media_url) : null,
                media_type: img.media_type ? String(img.media_type) : null,
              });
            });
          }
        } catch (err) {
          console.error("Error parsing donation images:", err);
        }

        // Create normalized donation object
        const normalizedDonation: DonationResponse = {
          id: Number(rawDonation.id || 0),
          title: String(rawDonation.title || ""),
          description: String(rawDonation.description || ""),
          quantity: Number(rawDonation.quantity || 0),
          unit: String(rawDonation.unit || ""),
          location: String(rawDonation.location || ""),
          created_at: String(
            rawDonation.created_at || new Date().toISOString()
          ),
          status: String(rawDonation.status || "AVAILABLE"),
          donor_id: String(rawDonation.donor_id || userId), // Use provided userId as fallback
          tag: tagInfo,
          donation_images: donationImages,
        };

        return normalizedDonation;
      });
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    refetchOnWindowFocus: false,
  });
}

export function useDonationRequests(userId: string) {
  return useQuery<DonationRequestResponse[]>({
    queryKey: ["donationRequests", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("donation_requests")
        .select(
          `
          id,
          donation_id,
          reason,
          status,
          created_at,
          donation:donation_id (
            title,
            description,
            quantity,
            unit,
            location,
            donor_id,
            donation_images (
              id,
              media_url,
              media_type
            )
          )
        `
        )
        .eq("requester_id", userId);

      if (error) throw error;

      // Transform to DonationRequestResponse[] with proper type handling
      return (data || []).map((item) => {
        // Use type assertion for safety
        const rawRequest = item as DonationRequestRecord;

        // Prepare default donation data
        const donationData: DonationData = {
          title: "",
          description: "",
          quantity: 0,
          unit: "",
          location: "",
          donor_id: "",
          donation_images: [],
        };

        try {
          // Extract donation data safely
          if (rawRequest.donation) {
            // Handle donation if it's an array or object
            const donationItem = Array.isArray(rawRequest.donation)
              ? rawRequest.donation[0]
              : (rawRequest.donation as DonationRecord);

            if (donationItem) {
              donationData.title = String(donationItem.title || "");
              donationData.description = String(donationItem.description || "");
              donationData.quantity = Number(donationItem.quantity || 0);
              donationData.unit = String(donationItem.unit || "");
              donationData.location = String(donationItem.location || "");
              donationData.donor_id = String(donationItem.donor_id || "");

              // Process donation images
              if (Array.isArray(donationItem.donation_images)) {
                donationItem.donation_images.forEach(
                  (img: DonationImageRecord) => {
                    donationData.donation_images.push({
                      id: Number(img.id || 0),
                      media_url: img.media_url ? String(img.media_url) : null,
                      media_type: img.media_type
                        ? String(img.media_type)
                        : null,
                    });
                  }
                );
              }
            }
          }
        } catch (err) {
          console.error("Error parsing donation request data:", err);
        }

        // Create the normalized request
        return {
          id: Number(rawRequest.id || 0),
          donation_id: Number(rawRequest.donation_id || 0),
          reason: String(rawRequest.reason || ""),
          status: String(rawRequest.status || "PENDING"),
          created_at: String(rawRequest.created_at || new Date().toISOString()),
          donation: donationData,
        };
      });
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}
