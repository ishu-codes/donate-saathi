import { ReactNode } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Toaster } from "./ui/sonner";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen flex">
      <div className="w-72 h-full flex flex-col py-6 sticky top-0">
        <Sidebar />
      </div>
      <div className="w-full flex flex-col bg-secondary">
        <Navbar />
        <main className="w-full flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
