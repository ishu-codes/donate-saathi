import { Link, useLocation } from "react-router-dom";
import {
  BadgePlus,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
  X,
} from "lucide-react";
import { FaSeedling } from "react-icons/fa";
import { Button } from "../ui/button";

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();

  const NAVS = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={22} />,
      url: "/dashboard",
    },
    { title: "New donation", icon: <BadgePlus />, url: "/new-donation" },
    { title: "Recent", icon: <History />, url: "/recent" },
    { title: "Settings", icon: <Settings />, url: "/settings" },
  ];
  return (
    <div className="w-72 h-full flex flex-col py-6 sticky top-0 border-r bg-background z-10">
      <div className="h-full flex flex-col gap-10">
        <div className="flex gap-2 items-center px-4 justify-between">
          <Link className="flex gap-2 items-center" to="/">
            <FaSeedling className="text-3xl text-green-600" />
            <span className="text-2xl font-bold text-green-600">
              DonateSaathi
            </span>
          </Link>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="md:hidden"
            >
              <X size={20} />
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {NAVS.map((nav, idx) => (
            <Link
              className={`flex gap-2 px-6 py-3 hover:bg-accent ${
                location.pathname === nav.url
                  ? "text-green-600 border-r-2 border-green-600 pointer-events-none"
                  : "text-muted-foreground"
              }`}
              to={nav.url}
              key={idx}
              onClick={onClose}
            >
              {nav.icon}
              {nav.title}
            </Link>
          ))}
        </div>
      </div>

      <Link
        className="flex gap-2 px-4 py-3 hover:bg-accent rounded-xl text-muted-foreground"
        to={"/logout"}
        onClick={onClose}
      >
        <LogOut />
        Logout
      </Link>
    </div>
  );
}
