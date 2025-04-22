import { ReactNode, useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Toaster } from "./ui/sonner";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

export default function Layout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden flex items-center p-4 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mr-2"
        >
          <Menu />
        </Button>
        <span className="font-bold text-xl text-green-600">DonateSaathi</span>
      </div>

      {/* Sidebar - hidden on mobile by default unless toggled */}
      <div
        className={`${
          sidebarOpen ? "fixed inset-0 z-50" : "hidden"
        } md:relative md:block`}
      >
        <div
          className="absolute inset-0 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="w-full flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="w-full flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}
