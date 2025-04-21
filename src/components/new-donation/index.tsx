import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2, FileUp, X } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { supabase, logSessionInfo } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DonationCard from "./DonationCard";
import { useCreateDonation } from "@/hooks/db";
import { useNavigate } from "react-router-dom";

// Update the form schema to match our requirements
const formSchema = z.object({
  type: z.enum(["FOOD", "CLOTHES", "FUNDS", "MEDICINE", "BOOKS", "OTHER"], {
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
  amount: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function NewDonation() {
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ url: string; type: string }[]>([]);
  const [campaigns, setCampaigns] = useState<{ id: number; name: string }[]>(
    []
  );
  const { user } = useAuth();
  const navigate = useNavigate();
  const createDonation = useCreateDonation();

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

    try {
      // Debug authentication
      console.log("Current user ID:", user.id);
      const session = await logSessionInfo();

      if (!session) {
        toast.error("Session expired", {
          description: "Your session has expired. Please login again.",
        });
        return;
      }

      // Convert campaign_id to number if it exists
      const campaign_id = values.campaign_id
        ? parseInt(values.campaign_id, 10)
        : undefined;

      // Convert amount to number if it exists and type is FUNDS
      const amount =
        values.type === "FUNDS" && values.amount
          ? parseFloat(values.amount)
          : undefined;

      console.log("Submitting donation with data:", {
        type: values.type,
        description: values.description,
        donor_id: user.id,
        quantity: values.quantity,
        unit: values.unit,
        location: values.location,
        campaign_id,
        amount,
        mediaFiles: mediaFiles.length,
      });

      await createDonation.mutateAsync({
        donationData: {
          type: values.type,
          description: values.description,
          donor_id: user.id,
          quantity: values.quantity,
          unit: values.unit,
          location: values.location,
          campaign_id,
          amount,
        },
        mediaFiles,
      });

      toast.success("Donation created", {
        description: "Your donation has been successfully created.",
      });

      // Clean up previews
      setPreviews((prev) => {
        prev.forEach((p) => URL.revokeObjectURL(p.url));
        return [];
      });

      // Reset form and state
      form.reset();
      setMediaFiles([]);

      // Navigate to the donations page
      navigate("/find-donations");
    } catch (error: any) {
      console.error("Error creating donation:", error);
      // Extract more detailed error information from Supabase
      const errorMessage = error.message || "Unknown error";
      const details = error.details || "";
      const hint = error.hint || "";
      const code = error.code || "";

      toast.error("Error creating donation", {
        description: `${errorMessage}${details ? ` Details: ${details}` : ""}${
          hint ? ` Hint: ${hint}` : ""
        }${code ? ` (Code: ${code})` : ""}`,
      });
    }
  }

  useEffect(() => {
    // Fetch campaigns when component mounts
    const fetchCampaigns = async () => {
      const { data: campaignsData } = await supabase
        .from("campaign")
        .select("id, name");

      if (campaignsData) setCampaigns(campaignsData);
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="flex gap-8">
      <div className="flex flex-col w-1/2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-secondary-foreground">
            Create New Donation
          </CardTitle>
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
                        {[
                          "FOOD",
                          "CLOTHES",
                          "FUNDS",
                          "MEDICINE",
                          "BOOKS",
                          "OTHER",
                        ].map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0) + type.slice(1).toLowerCase()}
                          </SelectItem>
                        ))}
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
                        <Input type="number" {...field} />
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
              </FormItem>

              <Button
                type="submit"
                className="w-full"
                disabled={createDonation.isPending}
              >
                {createDonation.isPending ? (
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
