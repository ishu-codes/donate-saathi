import Navbar from "./Navbar";
import FloatingDonate from "./FloatingDonate";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <FloatingDonate />
    </>
  );
}
