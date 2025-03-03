import { Link, useLocation } from "react-router-dom";
import { BadgePlus, History, Home, LogOut, Settings } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const NAVS = [
    { title: "Home", icon: <Home />, url: "/home" },
    { title: "New donation", icon: <BadgePlus />, url: "/new-donation" },
    { title: "Recent", icon: <History />, url: "/recent" },
    { title: "Settings", icon: <Settings />, url: "/settings" },
  ];
  return (
    <>
      <div className="h-full flex flex-col gap-8">
        <Link className="px-2" to="/">
          <picture className="h-4">
            <img src="/logo.svg" alt="Logo" className="h-full" />
          </picture>
        </Link>

        <div className="flex flex-col">
          {NAVS.map((nav, idx) => (
            <Link
              className={`flex gap-2 px-4 py-3 rounded-xl ${
                location.pathname === nav.url
                  ? "bg-brand text-primary-foreground pointer-events-none"
                  : "text-muted-foreground hover:bg-accent"
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
