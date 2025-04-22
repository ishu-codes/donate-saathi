import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Theme() {
  return (
    <Button
      variant={"ghost"}
      className="cursor-pointer hover:bg-green-50 transition-colors"
    >
      <Bell className="h-[1.2rem] w-[1.2rem] text-gray-600" />
      <span className="sr-only">Notifications</span>
    </Button>
  );
}
