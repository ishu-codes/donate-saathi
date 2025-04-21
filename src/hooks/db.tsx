import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/db";
import {
  createDonation,
  requestDonation,
  DonationSubmission,
} from "@/services/donation";

export function useNgos() {
  return useQuery({
    queryKey: ["ngos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ngo")
        .select(
          "id, name, description, location, email, phone, website, ngo_tag(tag(name))"
        );

      if (error) throw new Error(error.message);

      // Log the structure to help debug
      console.log("NGO data structure:", data[0]);

      // Use a simpler approach with type assertion
      return data.map((ngo: any) => {
        // Extract tags using a safe approach
        const tags: string[] = [];

        if (ngo.ngo_tag && Array.isArray(ngo.ngo_tag)) {
          ngo.ngo_tag.forEach((tagItem: any) => {
            // Try to extract tag name from different possible structures
            if (tagItem?.tag?.name) {
              tags.push(tagItem.tag.name);
            }
          });
        }

        return {
          id: ngo.id,
          name: ngo.name,
          description: ngo.description,
          location: ngo.location,
          email: ngo.email,
          phone: ngo.phone,
          website: ngo.website,
          tags,
        };
      });
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hr
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
}

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tag").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hr
    refetchOnWindowFocus: false,
  });
}

export function useCampaigns() {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase.from("campaign").select(
        `id,
          name,
          description,
          target,
          completed,
          tag: type (name),
          ngo: ngo_id (name, location),
          image`
      );
      if (error) throw new Error(error.message);
      console.log("campaigns:", data);
      return data;
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hr
    refetchOnWindowFocus: false,
  });
}

export function useFindDonations() {
  return useQuery({
    queryKey: ["findDonations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("donation_available")
        .select("*");

      if (error) throw error;
      console.log("getAvailableDonations", data);
      return data;
    },
    staleTime: 1000 * 60, // Cache for 1 minute
    refetchOnWindowFocus: false,
  });
}

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

export function useRequestDonation() {
  const queryClient = useQueryClient();

  return useMutation({
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
  return useQuery({
    queryKey: ["userDonations", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("donation_available")
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
          donation_id,
          tag: type (
            id,
            name
          ),
          donation_images (
            id,
            image_url,
            media_type
          )
        `
        )
        .eq("donor_id", userId);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
    staleTime: 1000 * 60, // Cache for 1 minute
    refetchOnWindowFocus: false,
  });
}

export function useDonationRequests(userId: string) {
  return useQuery({
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
          donation_available!donation_id (
            title,
            description,
            quantity,
            unit,
            location,
            donor_id,
            donation_images (
              id,
              image_url,
              media_type
            )
          )
        `
        )
        .eq("requester_id", userId);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
}
