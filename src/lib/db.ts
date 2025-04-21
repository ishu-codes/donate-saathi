import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL ?? "",
  import.meta.env.VITE_SUPABASE_PUBLIC_KEY ?? "",
  {
    auth: {
      persistSession: true,
    },
  }
);

// Log the current session to debug authentication issues
export async function logSessionInfo() {
  const { data, error } = await supabase.auth.getSession();
  console.log("Current session:", data.session);
  if (error) console.error("Session error:", error);
  return data.session;
}
