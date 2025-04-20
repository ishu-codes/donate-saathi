import {
  Card,
  CardContent,
  CardDescription,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartHandshake } from "lucide-react";

export default function BottomLeft() {
  return (
    <Card className="border-none shadow-none flex flex-col items-center">
      <CardHeader className="items-center">
        <CardTitle>Lives impacted</CardTitle>
        <CardDescription>(in total)</CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full flex items-center justify-center gap-2 px-8">
        <div className="flex-1 flex justify-center text-red-400">
          {Array.from({ length: 5 }, (_, index) => (
            <HeartHandshake size={35} key={index} />
          ))}
        </div>
        <h4 className="w-20 text-[3rem] font-semibold">5</h4>
      </CardContent>
      {/* <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter> */}
    </Card>
  );
}
