import { ReactNode } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen flex">
      <div className="w-72 h-full flex flex-col py-6">
        <Sidebar />
      </div>
      <div className="w-full flex flex-col bg-secondary">
        <Navbar />
        <main className="w-full flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
