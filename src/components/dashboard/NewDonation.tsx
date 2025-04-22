import {
  Card,
  CardContent,
  //   CardDescription,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Gift, Plus, ArrowRight } from "lucide-react";
// import { Button } from "../ui";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NewDonation() {
  return (
    <Card className="border-none shadow-none flex flex-col items-center h-full">
      <CardHeader className="items-center">
        <CardTitle className="text-xl text-gray-800">Create Donation</CardTitle>
        {/* <CardDescription>(in total)</CardDescription> */}
      </CardHeader>
      <CardContent className="w-full h-full flex flex-col items-center justify-center gap-4 px-8">
        <motion.div
          className="relative w-40 h-40 mb-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-50 to-green-100 border-glow"></div>
          <motion.div
            className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-green-200 opacity-60"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="absolute -bottom-4 -left-2 w-8 h-8 rounded-full bg-green-300 opacity-60"
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
              delay: 0.5,
            }}
          ></motion.div>

          {/* Main button */}
          <Link
            to="/new-donation"
            className="absolute inset-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-500 group z-10"
          >
            <span className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 90 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Plus className="w-12 h-12 text-green-600 group-hover:text-green-700 transition-colors" />
              </motion.div>
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-600 mb-4">
            Make a difference by offering items or funds to those in need
          </p>
          <Link
            to="/new-donation"
            className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group"
          >
            <Gift size={16} />
            <span>Get Started</span>
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </CardContent>
    </Card>
  );
}
