import { Link, useLocation } from "react-router-dom";
import { BadgePlus, History, Home, LogOut, Settings } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const NAVS = [
    { title: "Home", icon: <Home size={22} />, url: "/home" },
    { title: "New donation", icon: <BadgePlus />, url: "/new-donation" },
    { title: "Recent", icon: <History />, url: "/recent" },
    { title: "Settings", icon: <Settings />, url: "/settings" },
  ];
  return (
    <>
      <div className="h-full flex flex-col gap-10">
        <Link className="px-4" to="/">
          <picture className="h-4">
            <img src="/logo.svg" alt="Logo" className="h-full" />
          </picture>
        </Link>

        <div className="flex flex-col gap-2">
          {NAVS.map((nav, idx) => (
            <Link
              className={`flex gap-2 px-6 py-3 hover:bg-accent ${
                location.pathname === nav.url
                  ? "text-brand border-r-2 border-brand pointer-events-none"
                  : "text-secondary-foreground"
              }`}
              to={nav.url}
              key={idx}
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
      >
        <LogOut />
        Logout
      </Link>
    </>
  );
}
