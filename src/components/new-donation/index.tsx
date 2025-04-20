import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Upload, MapPin, Loader2, FileUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DonationCard from "./DonationCard";

// Update the form schema to match our requirements
const formSchema = z.object({
  type: z.enum(["FOOD", "CLOTHES", "FUNDS", "MEDICINE"], {
    required_error: "Please select a donation type.",
  }),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(500, "Description must not exceed 500 characters."),
  location: z.string().min(1, "Location is required."),
  quantity: z.number().min(1, "Quantity is required."),
  unit: z.string().min(1, "Unit is required."),
  campaign_id: z.string().optional(),
  media: z.array(z.any()).optional(),
  amount: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function NewDonation() {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  // const { toast } = Toaster();
  const [campaigns, setCampaigns] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ url: string; type: string }[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: undefined,
      description: "",
      location: "",
      quantity: 1,
      unit: "",
      amount: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    setMediaFiles((prev) => [...prev, ...validFiles]);

    // Create previews
    validFiles.forEach((file) => {
      const fileUrl = URL.createObjectURL(file);
      setPreviews((prev) => [
        ...prev,
        {
          url: fileUrl,
          type: file.type.startsWith("image/") ? "image" : "video",
        },
      ]);
    });
  };

  const removeFile = (index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  async function onSubmit(values: FormData) {
    if (!user) {
      toast.error("Authentication required", {
        description: "Please login to create a donation.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Upload images to Supabase storage
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const fileName = `${crypto.randomUUID()}-${image.name}`;
          const { data, error } = await supabase.storage
            .from("donation-images")
            .upload(fileName, image);

          if (error) throw error;
          return {
            url: data.path,
            type: file.type.startsWith("image/") ? "image" : "video",
          };
        })
      );

      // Create donation record
      const { data: donation, error: donationError } = await supabase
        .from("donation")
        .insert([
          {
            type: values.type,
            description: values.description,
            donor_id: user.id,
            quantity: values.quantity,
            unit: values.unit,
            location: values.location,
            images: imageUrls,
            status: "PENDING",
          },
        ])
        .select()
        .single();

      if (donationError) throw donationError;

      toast("Success!", {
        description: "Your donation has been created successfully.",
      });

      // Reset form
      form.reset();
      setImages([]);
      setPreviewUrls([]);

      setPreviews((prev) => {
        prev.forEach((p) => URL.revokeObjectURL(p.url));
        return [];
      });
      setMediaFiles([]);
    } catch (error) {
      toast.error("Error", {
        description: "Failed to create donation. Please try again.",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    // Fetch campaigns and NGOs when component mounts
    const fetchData = async () => {
      const { data: campaignsData } = await supabase
        .from("campaign")
        .select("id, name")
        .eq("completed", false);

      const { data: ngosData } = await supabase.from("ngo").select("id, name");

      if (campaignsData) setCampaigns(campaignsData);
      if (ngosData) setNgos(ngosData);
    };

    fetchData();
  }, []);

  return (
    <div
      className="flex gap-8"
      // initial={{ opacity: 0, y: 20 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col w-1/2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-secondary-foreground">
            Create New Donation
          </CardTitle>
          {/* <p className="text-muted-foreground">
            Fill in the details below to create a new donation proposal
          </p> */}
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Donation Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select donation type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["FOOD", "CLOTHES", "FUNDS", "MEDICINE"].map(
                          (type) => (
                            <SelectItem key={type} value={type}>
                              {type.charAt(0) + type.slice(1).toLowerCase()}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe your donation..."
                        className="resize-none"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., kg, items, INR" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {form.watch("type") === "FUNDS" && (
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (INR)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Location</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter pickup location" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="campaign_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campaign</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a campaign" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {campaigns.map((campaign) => (
                          <SelectItem
                            key={campaign.id}
                            value={campaign.id.toString()}
                          >
                            {campaign.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="ngo_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NGO</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an NGO" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ngos.map((ngo) => (
                          <SelectItem key={ngo.id} value={ngo.id.toString()}>
                            {ngo.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormItem>
                <FormLabel>Upload Images & Videos</FormLabel>
                <div className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("file-upload")?.click()
                      }
                      className="w-full"
                    >
                      <FileUp className="w-4 h-4 mr-2" />
                      Add Media
                    </Button>
                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>

                  {previews.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {previews.map((preview, index) => (
                        <div key={index} className="relative group">
                          {preview.type === "image" ? (
                            <img
                              src={preview.url}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-md"
                            />
                          ) : (
                            <video
                              src={preview.url}
                              className="w-full h-24 object-cover rounded-md"
                              controls
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute top-1 right-1 p-1 bg-red-500 rounded-full 
                text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <FormMessage />
              </FormItem>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating Donation...
                  </div>
                ) : (
                  "Submit Donation"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </div>
      <div className="flex-1 px-8">
        <DonationCard
          mediaPreviews={previews}
          donationType={form.watch("type")}
          campaigns={campaigns}
          campaignId={form.watch("campaign_id")}
          description={form.watch("description")}
          location={form.watch("location")}
          quantity={form.watch("quantity")}
          amount={form.watch("amount")}
          unit={form.watch("unit")}
        />
      </div>
    </div>
  );
}
