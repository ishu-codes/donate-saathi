import { supabase } from "@/lib/db";
// import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";
// import type { Database, Tables, Enums } from "./types";

export async function getNGOs() {
  const ngosWithTags = supabase
    .from("ngo")
    .select(
      `id, name, description, location, email, phone, website, ngo_tag(tag_id, tag:tag(name))`
    );
  //   type NGOsWithTags = QueryData<typeof ngosWithTags>;
  const { data, error } = await ngosWithTags;
  if (error) throw error;

  return data.map((ngo) => ({
    id: ngo.id,
    name: ngo.name,
    description: ngo.description,
    location: ngo.location,
    email: ngo.email,
    phone: ngo.phone,
    website: ngo.website,
    tags: ngo.ngo_tag.map((t) => t.tag?.name).filter(Boolean), // Extract tag names
  }));
}

export async function fetchTags() {
  const { data, error } = await supabase.from("tag").select("*");
  if (error) {
    console.error("Error fetching tags:", error);
    return;
  }
  return data;
}
