import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import { Search } from "lucide-react";
// import { Button } from "@/components/ui";
import Notification from "./Notification";
// import Theme from "./Theme";

export default function Navbar() {
  // const [searchQuery, setSearchQuery] = useState<string>("");
  const [heading, setHeading] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const segments = location.pathname.split("/");
    const lastSegment = segments[segments.length - 1].replace("-", " ");
    setHeading(lastSegment[0].toUpperCase() + lastSegment.slice(1));
  }, [location]);

  return (
    <div className="w-full h-16 flex items-center justify-between px-8 py-4 bg-background border-b">
      <h2 className="font-semibold text-2xl">{heading}</h2>
      {/* <form className="w-1/3 flex bg-accent rounded-full">
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
      </form> */}
      {/* <div className="flex gap-4"> */}
      <Notification />
      {/* <Theme /> */}
      {/* </div> */}
    </div>
  );
}
