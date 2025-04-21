import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/db";
import type { NGOData } from "@/interface";
import { useTags } from "@/hooks/db";
import { motion } from "framer-motion";
import {
  FaUser,
  FaLock,
  FaBuilding,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
  FaArrowRight,
  FaSeedling,
} from "react-icons/fa";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState<"donor" | "NGO">("donor");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [ngoDetails, setNgoDetails] = useState<NGOData>({
    name: "",
    description: "",
    location: "",
    phone: "",
    website: "",
    tags: [],
  });
  const [isRegistering, setIsRegistering] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { data: tagsData, isLoading: isLoadingTags } = useTags();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    try {
      if (userType === "NGO" && selectedTags.length === 0) {
        setError("Please select at least one tag for your NGO");
        return;
      }

      const { data: userData, error: signUpError } = await signUp(
        email,
        password,
        username
      );
      if (signUpError) throw signUpError;

      if (userType === "NGO") {
        // Create NGO record
        const { data: ngoData, error: ngoError } = await supabase
          .from("ngo")
          .insert([
            {
              name: ngoDetails.name,
              description: ngoDetails.description,
              location: ngoDetails.location,
              email: email,
              phone: ngoDetails.phone,
              website: ngoDetails.website,
            },
          ])
          .select()
          .single();

        if (ngoError) throw ngoError;

        // Create NGO tag associations
        const ngoTagData = selectedTags.map((tagId) => ({
          ngo_id: ngoData.id,
          tag_id: tagId,
        }));

        const { error: tagError } = await supabase
          .from("ngo_tag")
          .insert(ngoTagData);

        if (tagError) throw tagError;

        // Update user profile with NGO role and ID
        const { error: profileError } = await supabase
          .from("user_profiles")
          .insert([
            {
              user_id: userData.user.id,
              role: "NGO",
              ngo_id: ngoData.id,
            },
          ]);

        if (profileError) throw profileError;
      } else {
        // Create donor profile
        const { error: profileError } = await supabase
          .from("user_profiles")
          .insert([
            {
              user_id: userData.user.id,
              role: "DONOR",
            },
          ]);

        if (profileError) throw profileError;
      }

      navigate("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsRegistering(false);
    }
  };

  const handleTagToggle = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const getIcon = (fieldName: string) => {
    switch (fieldName) {
      case "username":
        return <FaUser className="h-5 w-5 text-gray-400" />;
      case "email":
        return <FaEnvelope className="h-5 w-5 text-gray-400" />;
      case "password":
        return <FaLock className="h-5 w-5 text-gray-400" />;
      case "name":
        return <FaBuilding className="h-5 w-5 text-gray-400" />;
      case "location":
        return <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />;
      case "phone":
        return <FaPhone className="h-5 w-5 text-gray-400" />;
      case "website":
        return <FaGlobe className="h-5 w-5 text-gray-400" />;
      default:
        return <FaUser className="h-5 w-5 text-gray-400" />;
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
          <div className="absolute h-full w-full grid grid-cols-8 grid-rows-12">
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
              Hello Saathi! 👋
            </motion.h1>
            <motion.p
              className="text-xl text-green-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              DonateSaathi connects those in need with people who have excess
              resources. Make a difference through seamless giving and sharing!
            </motion.p>
          </div>

          <motion.div
            className="mt-auto bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-3">Join Our Community</h3>
            <p className="text-green-50 mb-5">
              Whether you're looking to donate, volunteer, or represent an NGO,
              DonateSaathi provides a platform to make meaningful connections
              and impact.
            </p>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                <span className="text-sm text-green-200">Register</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                <span className="text-sm text-green-200">Connect</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                <span className="text-sm text-green-200">Contribute</span>
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
      <div className="flex-1 p-4 md:p-8 flex items-center justify-center relative overflow-y-auto max-h-screen">
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
                Create an account
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-2"
              >
                <Tabs
                  defaultValue="donor"
                  className="w-full"
                  value={userType}
                  onValueChange={(value) =>
                    setUserType(value as "donor" | "NGO")
                  }
                >
                  <TabsList className="grid w-full grid-cols-2 bg-green-50">
                    <TabsTrigger
                      value="donor"
                      className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                    >
                      Register as Donor
                    </TabsTrigger>
                    <TabsTrigger
                      value="NGO"
                      className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                    >
                      Register as NGO
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="donor">
                    <p className="text-gray-500 mt-2">
                      Join as a donor to start making a difference today!
                    </p>
                  </TabsContent>

                  <TabsContent value="NGO">
                    <p className="text-gray-500 mt-2">
                      Register your NGO to connect with donors and volunteers.
                    </p>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-5 pt-6">
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

                {/* Common fields */}
                {[
                  {
                    name: "username",
                    type: "text",
                    placeholder: "Username",
                    value: username,
                    onChange: setUsername,
                    label: "Username",
                  },
                  {
                    name: "email",
                    type: "email",
                    placeholder: "Email address",
                    value: email,
                    onChange: setEmail,
                    label: "Email",
                  },
                  {
                    name: "password",
                    type: "password",
                    placeholder: "Password",
                    value: password,
                    onChange: setPassword,
                    label: "Password",
                  },
                ].map((field, index) => (
                  <motion.div
                    className="space-y-1"
                    key={field.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {field.label}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {getIcon(field.name)}
                      </div>
                      <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        required
                        className="pl-10 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </motion.div>
                ))}

                {/* NGO specific fields */}
                {userType === "NGO" && (
                  <motion.div
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <div className="h-px bg-gray-200 my-2"></div>

                    <div className="text-sm font-medium text-gray-700">
                      NGO Details
                    </div>

                    {[
                      {
                        name: "name",
                        type: "text",
                        placeholder: "NGO Name",
                        label: "NGO Name",
                      },
                      {
                        name: "description",
                        type: "text",
                        placeholder: "Description",
                        label: "Description",
                      },
                      {
                        name: "location",
                        type: "text",
                        placeholder: "Location",
                        label: "Location",
                      },
                      {
                        name: "phone",
                        type: "tel",
                        placeholder: "Phone Number",
                        label: "Phone Number",
                      },
                      {
                        name: "website",
                        type: "url",
                        placeholder: "Website (Optional)",
                        label: "Website (Optional)",
                      },
                    ].map((field, index) => (
                      <motion.div
                        className="space-y-1"
                        key={field.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                      >
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                          {field.label}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {getIcon(field.name)}
                          </div>
                          <Input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={
                              ngoDetails[field.name as keyof NGOData] as string
                            }
                            onChange={(e) =>
                              setNgoDetails({
                                ...ngoDetails,
                                [field.name]: e.target.value,
                              })
                            }
                            required={field.name !== "website"}
                            className="pl-10 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
                          />
                        </div>
                      </motion.div>
                    ))}

                    {/* NGO Tags */}
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                    >
                      <label className="text-sm font-medium text-gray-700 block">
                        Select NGO Categories (at least one)
                      </label>
                      {isLoadingTags ? (
                        <div className="flex justify-center py-4">
                          <Loader2 className="h-6 w-6 animate-spin text-green-600" />
                        </div>
                      ) : tagsData ? (
                        <div className="flex flex-wrap gap-2 p-3 bg-green-50 rounded-lg">
                          {tagsData.map((tag) => (
                            <div
                              key={tag.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`tag-${tag.id}`}
                                checked={selectedTags.includes(tag.id)}
                                onCheckedChange={() => handleTagToggle(tag.id)}
                                className="border-green-500 text-green-600 focus:ring-green-500"
                              />
                              <label
                                htmlFor={`tag-${tag.id}`}
                                className="text-sm font-medium cursor-pointer text-gray-700"
                              >
                                {tag.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-red-500">
                          Failed to load tags. Please try again later.
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                )}

                <motion.div
                  className="pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: userType === "NGO" ? 1.6 : 0.9 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center group"
                    disabled={isRegistering}
                  >
                    {isRegistering ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Creating your account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: userType === "NGO" ? 1.7 : 1 }}
                className="pt-2 text-sm text-center text-gray-500"
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Sign in
                </Link>
              </motion.div>
            </CardContent>
          </Card>

          <motion.div
            className="mt-6 text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: userType === "NGO" ? 1.8 : 1.1 }}
          >
            By creating an account, you agree to our{" "}
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
