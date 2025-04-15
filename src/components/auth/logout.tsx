import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Logout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut();
        navigate("/login");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    handleLogout();
  }, [signOut, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Logging out...</h2>
        <p className="text-gray-600">Please wait while we sign you out.</p>
      </div>
    </div>
  );
}
