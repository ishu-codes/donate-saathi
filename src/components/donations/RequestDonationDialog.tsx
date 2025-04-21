import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useRequestDonation } from "@/hooks/db";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface RequestDonationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  donationId: number;
  donationTitle: string;
}

export function RequestDonationDialog({
  isOpen,
  onClose,
  donationId,
  donationTitle,
}: RequestDonationDialogProps) {
  const [reason, setReason] = useState("");
  const { user } = useAuth();
  const requestDonation = useRequestDonation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to request a donation");
      return;
    }

    if (!reason.trim()) {
      toast.error("Please provide a reason for your request");
      return;
    }

    try {
      await requestDonation.mutateAsync({
        donationId,
        userId: user.id,
        reason: reason.trim(),
      });

      toast.success("Request submitted", {
        description: "Your donation request has been submitted successfully.",
      });

      setReason("");
      onClose();
    } catch (error) {
      console.error("Error requesting donation:", error);
      toast.error("Failed to submit request", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Donation</DialogTitle>
          <DialogDescription>
            You are requesting:{" "}
            <span className="font-medium">{donationTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason">
              Why do you need this donation?{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="reason"
              placeholder="Please describe who will benefit from this donation and how it will be used..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="resize-none"
              required
            />
            <p className="text-xs text-gray-500">
              This information helps the donor understand how their donation
              will make an impact.
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={requestDonation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={requestDonation.isPending}>
              {requestDonation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
