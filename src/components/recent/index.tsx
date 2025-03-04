import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { DONATIONS } from "@/data";
import {
  Apple,
  HandPlatter,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Trash,
} from "lucide-react";
import { DonationCategories } from "@/interfaces";
import { Separator } from "../ui/separator";

export default function Recent() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-background rounded-2xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Recent Donations
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Recipient Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Items</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DONATIONS.map((donation) => (
            <Dialog key={donation.id}>
              <DialogTrigger asChild>
                <TableRow className="cursor-pointer">
                  <TableCell>
                    {new Date(donation.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {donation.recipients?.[0]?.name || "N/A"}
                  </TableCell>
                  <TableCell>
                    {donation.category.charAt(0).toUpperCase() +
                      donation.category.slice(1)}
                  </TableCell>
                  <TableCell>{donation.amount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant={"ghost"}
                        className="p-2 hover:bg-gray-100 rounded-md text-secondary-foreground cursor-pointer"
                      >
                        <span className="sr-only">Edit</span>
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant={"ghost"}
                        className="p-2 hover:bg-gray-100 text-secondary-foreground rounded-md hover:text-red-600 cursor-pointer"
                      >
                        <span className="sr-only">Delete</span>
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{donation.recipients[0]?.name}</DialogTitle>
                  <DialogDescription>{donation.message}</DialogDescription>
                  <DialogDescription>{donation.date}</DialogDescription>
                  <Separator orientation="horizontal" />
                </DialogHeader>
                <div className="flex items-center gap-4">
                  {
                    DonationCategories.find(
                      (cate) => cate.title === donation.category
                    )?.icon
                  }
                  <DialogDescription>{donation.amount}</DialogDescription>
                </div>

                <Separator orientation="horizontal" />
                <DialogFooter className="w-full flex !justify-between">
                  <Button variant={"ghost"}>
                    <Phone />
                  </Button>
                  <Button variant={"ghost"}>
                    <Mail />
                  </Button>
                  <Button variant={"ghost"}>
                    <MapPin />
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
