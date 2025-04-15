import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="flex-1 bg-blue-600 p-8 flex flex-col justify-between text-white pt-16">
        <div className="h-full flex flex-col gap-8">
          <h1 className="text-5xl font-bold mb-4">Welcome Back! 👋</h1>
          <p className="text-xl">
            Continue your journey of making a difference through seamless giving
            and sharing with Donate Saathi.
          </p>
        </div>
        <div className="text-sm">
          &copy; 2025 Donate Saathi. All rights reserved.
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 p-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h3 className="text-3xl font-bold">Login</h3>
            <p className="text-gray-500 mt-2">
              New to Donate Saathi?{" "}
              <Link to="/register" className="text-blue-600 underline">
                Create an account
              </Link>
            </p>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-blue-600">
                  Forgot Password?
                </Link>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
