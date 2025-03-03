import { Link } from "react-router-dom";
import { BadgePlus, History, Home, LogOut, Settings } from "lucide-react";
const NAVS = [
  { title: "Home", icon: <Home />, url: "/home" },
  { title: "New donation", icon: <BadgePlus />, url: "/new-donation" },
  { title: "Recent", icon: <History />, url: "/recent" },
  { title: "Settings", icon: <Settings />, url: "/settings" },
];

export default function Sidebar() {
  return (
    <>
      <div className="h-full flex flex-col gap-8">
        <Link to="/">
          <picture className="h-16">
            <img src="/logo.png" alt="Logo" className="h-full" />
          </picture>
        </Link>

        <div className="flex flex-col">
          {NAVS.map((nav, idx) => (
            <Link className="flex gap-2 py-3" to={nav.url} key={idx}>
              {nav.icon}
              {nav.title}
            </Link>
          ))}
        </div>
      </div>

      <Link className="flex gap-2 py-3" to={"/logout"}>
        <LogOut />
        Logout
      </Link>
    </>
  );
}
