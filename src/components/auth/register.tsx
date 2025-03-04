import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="flex-1 bg-blue-600 p-8 flex flex-col justify-between text-white pt-16">
        <div className="h-full flex flex-col gap-8">
          {/* <div className="text-4xl mb-4"></div> */}
          {/* <img src="/icon.png" alt="logo" className="w-20" /> */}
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
            {/* <h2 className="text-2xl font-bold">SaleSkip</h2> */}
            <h3 className="text-3xl font-bold">Register!</h3>
            <p className="text-gray-500 mt-2">
              Don't have an account?{" "}
              <a href="#" className="text-blue-600 underline">
                Create a new account now,
              </a>{" "}
              it's FREE! Takes less than a minute.
            </p>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col">
            <div className="space-y-2">
              <Input type="email" placeholder="Email" />
            </div>
            <div className="space-y-2">
              <Input type="password" placeholder="Password" />
            </div>
            {/* <Button className="w-full" variant="default">
              Login Now
            </Button> */}
            <Link
              to={"/home"}
              className="w-full text-center mt-4 px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded-md"
            >
              Login
            </Link>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <FcGoogle className="h-5 w-5" />
              Login with Google
            </Button>
            <div className="text-center text-sm text-gray-500">
              Forget password?{" "}
              <a href="#" className="text-gray-900">
                Click here
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
