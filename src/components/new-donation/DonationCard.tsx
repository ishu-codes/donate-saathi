import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

type DonationCardInterface = {
  mediaPreviews: { url: string; type: string }[];
  donationType: string;
  campaigns: { id: number; name: string }[];
  campaignId?: string;
  description: string;
  location: string;
  quantity: number;
  amount: string;
  unit: string;
};

export default function DonationCard({
  mediaPreviews,
  donationType,
  campaigns,
  campaignId,
  description,
  location,
  quantity,
  amount,
  unit,
}: DonationCardInterface) {
  return (
    <Card className="sticky top-4">
      <CardContent className="pt-6">
        <MediaCarousel previews={mediaPreviews} />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-sm">
              {donationType
                ? donationType.charAt(0) + donationType.slice(1).toLowerCase()
                : "Type not selected"}
            </Badge>
            {campaignId && (
              <span className="text-sm text-muted-foreground">
                Campaign:{" "}
                {campaigns.find((c) => c.id === parseInt(campaignId))?.name}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <pre className="text-lg leading-relaxed">
              {description || "No description provided"}
            </pre>
          </div>

          <div className="flex items-center justify-between py-4 border-t">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {location || "Location not specified"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              {donationType === "FUNDS" ? (
                <span className="text-lg font-semibold">₹{amount || "0"}</span>
              ) : (
                <span className="text-lg font-semibold">
                  {quantity || "0"} {unit || "units"}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MediaCarousel({
  previews,
}: {
  previews: { url: string; type: string }[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((i) => (i + 1) % previews.length);
  const prev = () =>
    setCurrentIndex((i) => (i - 1 + previews.length) % previews.length);

  if (previews.length === 0) return null;

  return (
    <div className="relative rounded-lg overflow-hidden aspect-video mb-6">
      {previews[currentIndex].type === "image" ? (
        <img
          src={previews[currentIndex].url}
          alt={`Preview ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <video
          src={previews[currentIndex].url}
          className="w-full h-full object-cover"
          controls
        />
      )}

      {previews.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {previews.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
