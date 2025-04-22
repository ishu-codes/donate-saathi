import { motion } from "framer-motion";
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
  ArrowRight,
  Award,
  Calendar,
  Gift,
  HandPlatter,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Search,
  Tag,
  Trash,
} from "lucide-react";
import { DonationCategories } from "@/interfaces";
import { Separator } from "../ui/separator";
import { useState } from "react";

export default function Recent() {
  const [searchTerm, setSearchTerm] = useState("");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Filter donations based on search term
  const filteredDonations = DONATIONS.filter(
    (donation) =>
      donation.recipients[0]?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      donation.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation?.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-green-50 to-white">
      {/* Decorative elements */}
      <div className="absolute top-24 right-10 w-96 h-96 bg-green-100 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-24 left-10 w-72 h-72 bg-green-100 rounded-full opacity-20 blur-3xl -z-10"></div>

      {/* Header section */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Your Recent Donations
        </h1>
        <p className="text-gray-600">
          Track all your donations and their impact over time
        </p>
      </motion.div>

      {/* Stats cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Donated</h3>
            <span className="p-2 bg-green-50 rounded-md">
              <Gift className="h-5 w-5 text-green-600" />
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-800">24</p>
          <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
            <span className="text-green-600">+3</span> from last month
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">
              Most Active Category
            </h3>
            <span className="p-2 bg-green-50 rounded-md">
              <Tag className="h-5 w-5 text-green-600" />
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">Food & Essentials</p>
          <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
            <span className="text-green-600">43%</span> of your donations
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Impact Score</h3>
            <span className="p-2 bg-green-50 rounded-md">
              <Award className="h-5 w-5 text-green-600" />
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-800">156</p>
          <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
            <span className="text-green-600">Excellent</span> donor status
          </p>
        </motion.div>
      </motion.div>

      {/* Search and filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white p-4 rounded-xl shadow-sm border border-green-100 mb-6"
      >
        <div className="flex items-center gap-3 px-3">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search donations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none py-2 text-gray-700 placeholder-gray-400"
          />
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setSearchTerm("")}
          >
            Clear
          </Button>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-green-50/50">
              <TableHead className="w-[120px]">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Date
                </span>
              </TableHead>
              <TableHead>
                <span className="flex items-center gap-1">
                  <Gift className="h-4 w-4" /> Recipient
                </span>
              </TableHead>
              <TableHead>
                <span className="flex items-center gap-1">
                  <Tag className="h-4 w-4" /> Category
                </span>
              </TableHead>
              <TableHead>
                <span className="flex items-center gap-1">
                  <HandPlatter className="h-4 w-4" /> Items
                </span>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDonations.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-gray-500"
                >
                  No donations found matching "{searchTerm}"
                </TableCell>
              </TableRow>
            ) : (
              filteredDonations.map((donation) => (
                <Dialog key={donation.id}>
                  <DialogTrigger asChild>
                    <TableRow className="cursor-pointer hover:bg-green-50/50 transition-colors">
                      <TableCell className="font-medium">
                        {new Date(donation.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {donation.recipients?.[0]?.name || "N/A"}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {donation.category.charAt(0).toUpperCase() +
                            donation.category.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{donation.amount}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant={"ghost"}
                            className="p-2 hover:bg-green-100 rounded-md text-green-600 cursor-pointer"
                          >
                            <span className="sr-only">Edit</span>
                            <Pencil size={16} />
                          </Button>
                          <Button
                            variant={"ghost"}
                            className="p-2 hover:bg-red-100 text-red-500 rounded-md hover:text-red-600 cursor-pointer"
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
                      <DialogTitle className="text-xl">
                        {donation.recipients[0]?.name}
                      </DialogTitle>
                      <DialogDescription className="text-gray-600">
                        {donation.message}
                      </DialogDescription>
                      <DialogDescription className="text-gray-500">
                        {new Date(donation.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </DialogDescription>
                      <Separator orientation="horizontal" />
                    </DialogHeader>
                    <div className="flex items-center gap-4 bg-green-50 p-4 rounded-lg">
                      {
                        DonationCategories.find(
                          (cate) => cate.title === donation.category
                        )?.icon
                      }
                      <DialogDescription className="font-medium text-green-800">
                        {donation.amount}
                      </DialogDescription>
                    </div>

                    <div className="mt-4 space-y-3">
                      <h4 className="text-sm font-medium text-gray-700">
                        Recipient Contact
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant={"outline"}
                          className="flex gap-2 items-center justify-center bg-gray-50"
                        >
                          <Phone size={14} />
                          <span>Call</span>
                        </Button>
                        <Button
                          variant={"outline"}
                          className="flex gap-2 items-center justify-center bg-gray-50"
                        >
                          <Mail size={14} />
                          <span>Email</span>
                        </Button>
                      </div>
                    </div>

                    <Separator orientation="horizontal" />
                    <DialogFooter className="flex flex-col">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                        <span>Donate Again</span>
                        <ArrowRight size={14} />
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ))
            )}
          </TableBody>
        </Table>
      </motion.div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 text-center"
      >
        <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all">
          <Gift className="mr-2 h-4 w-4" />
          Make Another Donation
        </Button>
      </motion.div>
    </div>
  );
}
