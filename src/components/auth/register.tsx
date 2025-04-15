import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
// import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/db";
import type { Tag, NGOData } from "@/interface";
// import { fetchTags } from "@/db";
import { useTags } from "@/hooks/db";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState<"DONOR" | "NGO">("DONOR");
  // const [tags, setTags] = useState<Tag[]>([]);
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
  const {
    data: tagsData,
    isLoading: isLoadingTags,
    error: tagsError,
  } = useTags();

  // useEffect(() => {
  //   fetchTags().then((res) => {
  //     setTags(res ?? []);
  //   });
  // }, []);

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

      navigate("/home");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="flex-1 bg-blue-600 p-8 flex flex-col justify-between text-white pt-16">
        <div className="h-full flex flex-col gap-8">
          <h1 className="text-5xl font-bold mb-4">Hello Saathi! 👋</h1>
          <p className="text-xl">
            Donate Saathi connects those in need with people who have excess
            resources. Make a difference through seamless giving and sharing!
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
            <h3 className="text-3xl font-bold">Register!</h3>
            <Tabs
              defaultValue="donor"
              className="w-full mt-4"
              onValueChange={(value) => setUserType(value)}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="donor">Register as Donor</TabsTrigger>
                <TabsTrigger value="NGO">Register as NGO</TabsTrigger>
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
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="text-red-500 text-sm">{error}</div>}

              {[
                {
                  type: "text",
                  placeholder: "Username",
                  value: username,
                  onChange: setUsername,
                },
                {
                  type: "email",
                  placeholder: "Email",
                  value: email,
                  onChange: setEmail,
                },
                {
                  type: "password",
                  placeholder: "Password",
                  value: password,
                  onChange: setPassword,
                },
              ].map((field) => (
                <div className="space-y-2" key={field.placeholder}>
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    required
                  />
                </div>
              ))}

              {userType === "NGO" && (
                <div className="space-y-4">
                  {[
                    {
                      name: "name",
                      type: "text",
                      placeholder: "NGO Name",
                    },
                    {
                      name: "description",
                      type: "text",
                      placeholder: "Description",
                    },
                    {
                      name: "location",
                      type: "text",
                      placeholder: "Location",
                    },
                    {
                      name: "phone",
                      type: "tel",
                      placeholder: "Phone Number",
                    },
                    {
                      name: "website",
                      type: "url",
                      placeholder: "Website (Optional)",
                    },
                  ].map((field) => (
                    <Input
                      key={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={ngoDetails[field.name as keyof NGOData]}
                      onChange={(e) =>
                        setNgoDetails({
                          ...ngoDetails,
                          [field.name]: e.target.value,
                        })
                      }
                      required={field.name !== "website"}
                    />
                  ))}

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Tags</label>
                    <div className="grid grid-cols-2 gap-2">
                      {tagsData?.map((tag) => (
                        <div
                          key={tag.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`tag-${tag.id}`}
                            checked={selectedTags.includes(tag.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedTags([...selectedTags, tag.id]);
                              } else {
                                setSelectedTags(
                                  selectedTags.filter((id) => id !== tag.id)
                                );
                              }
                            }}
                          />
                          <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isRegistering}>
                {isRegistering ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Registering...
                  </div>
                ) : (
                  "Register"
                )}
              </Button>

              {/* Sign-in */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 text-blue-600 hover:text-blue-800"
                    onClick={() => navigate("/login")}
                  >
                    Sign in
                  </Button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Dialog open={isRegistering} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center p-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold">Registering...</h3>
            <p className="text-sm text-gray-500 text-center mt-1">
              {userType === "NGO"
                ? "Creating your NGO profile. Please wait..."
                : "Setting up your donor account. Please wait..."}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
