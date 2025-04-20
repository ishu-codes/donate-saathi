import { ReactNode } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Toaster } from "./ui/sonner";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div className="w-full flex flex-col">
        <Navbar />
        <main className="w-full flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
