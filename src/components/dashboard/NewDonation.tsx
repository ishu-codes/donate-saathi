import {
  Card,
  CardContent,
  //   CardDescription,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
// import { Button } from "../ui";
import { Link } from "react-router-dom";

export default function NewDonation() {
  return (
    <Card className="border-none shadow-none flex flex-col items-center">
      <CardHeader className="items-center">
        <CardTitle>Make a New Donation</CardTitle>
        {/* <CardDescription>(in total)</CardDescription> */}
      </CardHeader>
      <CardContent className="w-full h-full flex flex-col items-center justify-center gap-2 px-8">
        <Link
          to="/new-donation"
          //   size={"lg"}
          //   variant={"ghost"}
          className="w-32 h-32 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground"
          //   style={{ fontSize: "4rem" }}
        >
          <Plus className="!w-16 !h-16" />
        </Link>
      </CardContent>
    </Card>
  );
}
