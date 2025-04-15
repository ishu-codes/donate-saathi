import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      setNewPassword("");
      setCurrentPassword("");
    } catch (err) {
      setError(err.message);
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
        const { error } = await supabase.auth.admin.deleteUser(user?.id!);
        if (error) throw error;
        await signOut();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Welcome Section */}
      <div className="mb-8 animate-[fadeIn_0.6s_ease-out]">
        <h1 className="text-4xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your account preferences and security
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="border-0 shadow-none">
            <CardHeader className="px-0 pt-0">
              <h2 className="text-2xl font-semibold">Profile Information</h2>
              <p className="text-gray-500">Update your account settings</p>
            </CardHeader>
            <CardContent className="space-y-4 px-0">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" value={user?.email} disabled />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Account Created</label>
                <Input
                  type="text"
                  value={new Date(user?.created_at!).toLocaleDateString()}
                  disabled
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="border-0 shadow-none">
            <CardHeader className="px-0 pt-0">
              <h2 className="text-2xl font-semibold">Security Settings</h2>
              <p className="text-gray-500">
                Manage your password and account security
              </p>
            </CardHeader>
            <CardContent className="space-y-6 px-0">
              {error && <div className="text-red-500 text-sm">{error}</div>}
              {success && (
                <div className="text-green-500 text-sm">{success}</div>
              )}

              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </form>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-red-600 mb-4">
                  Danger Zone
                </h3>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
