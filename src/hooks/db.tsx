import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/db";

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

      return data.map((ngo) => ({
        id: ngo.id,
        name: ngo.name,
        description: ngo.description,
        location: ngo.location,
        email: ngo.email,
        phone: ngo.phone,
        website: ngo.website,
        tags: ngo.ngo_tag.map((t) => t.tag?.name).filter(Boolean),
      }));
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
