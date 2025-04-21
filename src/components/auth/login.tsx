import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaArrowRight, FaSeedling } from "react-icons/fa";

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
      navigate("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-green-100 opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-teal-100 opacity-50 blur-3xl"></div>

        {/* Subtle patterns */}
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0 opacity-[0.03]"
        >
          <pattern
            id="pattern-circles"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle
              id="pattern-circle"
              cx="20"
              cy="20"
              r="1"
              fill="currentColor"
            ></circle>
          </pattern>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#pattern-circles)"
          ></rect>
        </svg>

        {/* Floating elements */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-12 h-12 bg-gradient-to-br from-green-200 to-green-300 rounded-lg opacity-30"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
        ></motion.div>

        <motion.div
          className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-gradient-to-br from-teal-200 to-green-200 rounded-full opacity-40"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut",
            delay: 1,
          }}
        ></motion.div>
      </div>

      {/* Left Section */}
      <div className="flex-1 bg-gradient-to-b from-green-600 to-green-700 relative overflow-hidden p-8 flex flex-col justify-between text-white pt-16">
        {/* Decorative background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute h-full w-full grid grid-cols-8 grid-rows-12 z-40">
            {[...Array(96)].map((_, i) => (
              <div key={i} className="border-b border-r border-white/20"></div>
            ))}
          </div>
        </div>

        <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-green-500 rounded-full opacity-20 blur-xl"></div>

        <motion.div
          className="h-full flex flex-col gap-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-4">
            <Link to="/">
              <motion.div
                className="flex items-center gap-3 mb-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <FaSeedling className="text-3xl text-white" />
                <span className="text-2xl font-bold">DonateSaathi</span>
              </motion.div>
            </Link>

            <motion.h1
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Welcome Back! 👋
            </motion.h1>
            <motion.p
              className="text-xl text-green-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Continue your journey of making a difference through seamless
              giving and sharing with DonateSaathi.
            </motion.p>
          </div>

          <motion.div
            className="mt-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex gap-6 mb-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold">2,500+</span>
                <span className="text-green-200 text-sm">Active Donors</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">120+</span>
                <span className="text-green-200 text-sm">Verified NGOs</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">₹10M+</span>
                <span className="text-green-200 text-sm">Donations Made</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-sm text-green-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          &copy; 2025 DonateSaathi. All rights reserved.
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="flex-1 p-8 flex items-center justify-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="w-full max-w-md border border-gray-100 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <motion.h3
                className="text-2xl font-bold text-gray-800"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Sign in to your account
              </motion.h3>
              <motion.p
                className="text-gray-500 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                New to DonateSaathi?{" "}
                <Link
                  to="/register"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Create an account
                </Link>
              </motion.p>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <motion.div
                    className="bg-red-50 text-red-500 text-sm p-3 rounded-lg border border-red-100"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.div>
                )}

                <motion.div
                  className="space-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="flex justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link
                    to="/forgot-password"
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    Forgot Password?
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center group"
                  >
                    <span>Sign In</span>
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>

          <motion.div
            className="mt-6 text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            By signing in, you agree to our{" "}
            <Link to="/terms" className="text-green-600 hover:text-green-700">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-green-600 hover:text-green-700">
              Privacy Policy
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
