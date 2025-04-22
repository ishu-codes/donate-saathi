import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartHandshake, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomLeft() {
  // Animation variants for hearts
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1 },
  };

  return (
    <Card className="border-none shadow-none flex flex-col h-full">
      <CardHeader className="items-center">
        <CardTitle className="text-xl text-gray-800">Lives Impacted</CardTitle>
        <CardDescription className="text-gray-500">
          Amazing progress!
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full flex-1 flex flex-col items-center justify-center px-6">
        <div className="relative w-full max-w-xs aspect-square">
          {/* Progress circle background */}
          <div className="absolute inset-0 rounded-full bg-gray-100"></div>

          {/* Progress circle fill */}
          <div className="absolute inset-0">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full transform -rotate-90"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#f0f0f0"
                strokeWidth="8"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#22c55e"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="251.2"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 * 0.6 }} // 40% completion
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center"
            >
              <h3 className="text-5xl font-bold text-green-600">156</h3>
              <p className="text-gray-500 text-sm mt-1">People helped</p>
            </motion.div>
          </div>
        </div>

        {/* Heart icons */}
        <motion.div
          className="flex justify-center mt-6 gap-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {Array.from({ length: 5 }, (_, index) => (
            <motion.div
              key={index}
              variants={item}
              transition={{
                type: "spring",
                stiffness: 300,
                delay: index * 0.1,
              }}
              className={`p-2 rounded-full ${
                index < 4 ? "bg-rose-50" : "bg-gray-100"
              }`}
            >
              <HeartHandshake
                size={24}
                className={index < 4 ? "text-rose-500" : "text-gray-400"}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <div className="w-full mt-6 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Monthly growth</span>
            <span className="flex items-center gap-1 text-green-600 font-medium">
              <TrendingUp size={12} />
              +12.4%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
