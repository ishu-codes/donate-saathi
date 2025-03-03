import { Bell } from "lucide-react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui";

export default function Notification() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="cursor-pointer">
          <Bell />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Notifications</h4>
            <p className="text-sm text-muted-foreground">
              Your donation reached to the needy ones.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
