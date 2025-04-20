import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui";
import Notification from "./Notification";
import Theme from "./Theme";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="w-full h-16 flex items-center justify-between px-8 py-4 bg-background border-b">
      <form className="w-1/3 flex bg-accent rounded-full">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
          placeholder="Search here.."
          className="flex-1 px-6 py-2 text-sm rounded-none outline-none border-none focus:outline-none focus:border-none"
        />
        <Button
          type="submit"
          className="bg-brand text-primary hover:bg-brand cursor-pointer"
        >
          <Search />
        </Button>
      </form>
      <div className="flex gap-4">
        <Notification />
        <Theme />
      </div>
    </div>
  );
}
