import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  Info,
  Lock,
  LogOut,
  Mail,
  Shield,
  User,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/db";

export default function Settings() {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      setSuccess("Password updated successfully!");
      toast.success("Password updated successfully");
      setNewPassword("");
      setCurrentPassword("");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      toast.error("Failed to update password", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const userId = user?.id;
        if (!userId) {
          throw new Error("User ID not found");
        }

        const { error } = await supabase.auth.admin.deleteUser(userId);
        if (error) throw error;
        toast.success("Account deleted successfully");
        await signOut();
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        toast.error("Failed to delete account", {
          description: errorMessage,
        });
      }
    }
  };

  const getInitial = () => {
    return user?.email ? user.email.charAt(0).toUpperCase() : "U";
  };

  const getFormattedCreationDate = () => {
    return user?.created_at
      ? new Date(user.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Decorative elements */}
      <div className="absolute top-24 right-10 w-96 h-96 bg-green-100 rounded-full opacity-30 blur-3xl -z-10"></div>
      <div className="absolute bottom-24 left-10 w-72 h-72 bg-green-100 rounded-full opacity-30 blur-3xl -z-10"></div>

      {/* Header section */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Account Settings
        </h1>
        <p className="text-gray-600">
          Manage your account preferences, security, and personal information
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1 shadow-sm">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-600"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-600"
            >
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-600"
            >
              <Info className="h-4 w-4 mr-2" />
              Preferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="border border-gray-100 shadow-sm bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <User className="h-5 w-5 text-green-600" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-gray-500">
                  View and update your account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-semibold border-2 border-green-200">
                      {getInitial()}
                    </div>
                    <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full">
                      <Check className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-green-500" />
                    Email Address
                  </label>
                  <div className="relative">
                    <Input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="bg-gray-50 text-gray-700 border-gray-200"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Account Created
                  </label>
                  <Input
                    type="text"
                    value={getFormattedCreationDate()}
                    disabled
                    className="bg-gray-50 text-gray-700 border-gray-200"
                  />
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Update Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="border border-gray-100 shadow-sm bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-green-600" />
                  Security Settings
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Manage your password and account security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-100 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 text-green-700 p-4 rounded-lg border border-green-100 flex items-center gap-3">
                    <Check className="h-5 w-5" />
                    <p className="text-sm">{success}</p>
                  </div>
                )}

                <form onSubmit={handlePasswordReset} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <Input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      className="border-gray-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="border-gray-200"
                    />
                    <p className="text-xs text-gray-500">
                      Password must be at least 8 characters long and include
                      uppercase letters, numbers, and special characters.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white mt-2"
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </Button>
                </form>

                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                  </h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-red-700">
                      Deleting your account will permanently remove all your
                      data, including donation history and personal information.
                      This action cannot be undone.
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    className="w-full"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="border border-gray-100 shadow-sm bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Info className="h-5 w-5 text-green-600" />
                  Notification Preferences
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Manage how you receive notifications and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Email Notifications",
                      description:
                        "Receive notifications about donation requests and updates via email",
                      enabled: true,
                    },
                    {
                      name: "Marketing Communications",
                      description:
                        "Receive news, updates, and promotional offers from DonateSaathi",
                      enabled: false,
                    },
                    {
                      name: "Monthly Impact Reports",
                      description:
                        "Receive monthly reports about the impact of your donations",
                      enabled: true,
                    },
                  ].map((pref, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {pref.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {pref.description}
                        </p>
                      </div>
                      <div
                        className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${
                          pref.enabled
                            ? "bg-green-500 justify-end"
                            : "bg-gray-200 justify-start"
                        }`}
                      >
                        <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
