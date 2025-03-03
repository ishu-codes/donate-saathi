import { ReactNode } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen flex">
      <div className="w-60 h-full flex flex-col px-4 py-6 border-r-2 border-border">
        <Sidebar />
      </div>
      <div className="w-full flex flex-col">
        <Navbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
