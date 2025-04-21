import { supabase } from "@/lib/db";

export async function uploadDonationImages(
  files: File[],
  folder = "donations"
) {
  const urls: string[] = [];

  for (const file of files) {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${ext}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("donation-images")
      .upload(filePath, file, {
        upsert: false,
        cacheControl: "3600",
      });

    if (uploadError)
      throw new Error(`Upload failed for ${file.name}: ${uploadError.message}`);

    const { data } = supabase.storage
      .from("donation-images")
      .getPublicUrl(filePath);
    urls.push(data.publicUrl);
  }

  return urls;
}
