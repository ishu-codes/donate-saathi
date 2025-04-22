import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Award, Gift, Sparkles, Target, TrendingUp, Users } from "lucide-react";

export default function TopRight() {
  const [activeTab, setActiveTab] = useState("overview");

  const collected = 24000;
  const target = 48000;
  const percentage = Math.round((collected / target) * 100);
  const remaining = target - collected;

  const tabContent = {
    overview: (
      <div className="text-center mt-6 space-y-8">
        {/* Goal summary */}
        <div>
          <motion.div
            className="mx-auto w-48 h-48 relative mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Background circle */}
            <div className="absolute inset-0 rounded-full bg-gray-100"></div>

            {/* Progress indicator */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#e6e6e6"
                strokeWidth="12"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="url(#gradient)"
                strokeLinecap="round"
                strokeWidth="12"
                strokeDasharray="276.46"
                initial={{ strokeDashoffset: 276.46 }}
                animate={{ strokeDashoffset: 276.46 * (1 - percentage / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#16a34a" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
            </svg>

            {/* Percentage text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <span className="text-4xl font-bold text-green-600">
                  {percentage}%
                </span>
                <p className="text-xs text-gray-500 mt-1">of goal reached</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Annual Donation Goal
            </h3>
            <p className="text-gray-600 mt-1 text-sm">
              ₹{(collected / 1000).toFixed(0)}K raised of ₹
              {(target / 1000).toFixed(0)}K goal
            </p>
          </motion.div>
        </div>

        {/* Time remaining */}
        <motion.div
          className="bg-green-50 p-4 rounded-xl border border-green-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-medium text-gray-700">
                Time Remaining
              </h4>
              <p className="text-green-600 font-semibold">4 months left</p>
            </div>
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="pt-4"
        >
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2 w-full">
            <Gift size={18} />
            <span>Make a Donation</span>
          </button>
          <p className="text-sm text-gray-500 mt-3">
            Additional ₹{(remaining / 1000).toFixed(0)}K needed to reach the
            target
          </p>
        </motion.div>
      </div>
    ),

    goal: (
      <div className="mt-6 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-medium text-gray-800 mb-2">Goal Progress</h3>
          <div className="h-2.5 bg-gray-100 rounded-full w-full">
            <motion.div
              className="h-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-600"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>₹0</span>
            <span>₹{(target / 1000).toFixed(0)}K</span>
          </div>
        </motion.div>

        <div className="space-y-3 pt-4">
          <motion.div
            className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm border border-gray-100"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Gift className="w-10 h-10 text-green-500 p-2 bg-green-50 rounded-lg" />
            <div>
              <p className="text-sm font-medium text-gray-800">
                Donation Items
              </p>
              <div className="flex gap-1 items-baseline">
                <span className="text-xl font-bold text-green-600">24</span>
                <span className="text-xs text-gray-500">items this year</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm border border-gray-100"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Users className="w-10 h-10 text-blue-500 p-2 bg-blue-50 rounded-lg" />
            <div>
              <p className="text-sm font-medium text-gray-800">People Helped</p>
              <div className="flex gap-1 items-baseline">
                <span className="text-xl font-bold text-blue-600">156</span>
                <span className="text-xs text-gray-500">beneficiaries</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm border border-gray-100"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Award className="w-10 h-10 text-amber-500 p-2 bg-amber-50 rounded-lg" />
            <div>
              <p className="text-sm font-medium text-gray-800">Achievements</p>
              <div className="flex gap-1 items-baseline">
                <span className="text-xl font-bold text-amber-600">8</span>
                <span className="text-xs text-gray-500">
                  milestones reached
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    ),

    statistics: (
      <div className="mt-6 space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-medium text-gray-800 mb-3">Monthly Donations</h3>
          <div className="h-32 flex items-end gap-1">
            {[30, 45, 25, 60, 75, 45, 80, 45, 60, 35, 45, 30].map(
              (height, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t-sm"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                ></motion.div>
              )
            )}
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Jan</span>
            <span>Dec</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-green-50 p-4 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Monthly</p>
              <p className="text-xl font-bold text-green-700">₹2,000</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Growth</p>
              <p className="text-xl font-bold text-green-700 flex items-center">
                12% <TrendingUp size={16} className="ml-1" />
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="text-sm text-gray-600 flex items-center gap-1 justify-center">
            <Sparkles size={14} className="text-amber-500" />
            <span>You're in the top 10% of donors!</span>
          </p>
        </motion.div>
      </div>
    ),
  };

  return (
    <div className="w-full h-full p-6 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <span className="bg-green-100 p-1.5 rounded-lg">
            <Gift className="w-5 h-5 text-green-600" />
          </span>
          Donation Profile
        </h2>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex bg-gray-100 p-1 rounded-lg">
        {["Overview", "Goal", "Statistics"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-md transition-all",
              activeTab === tab.toLowerCase()
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto">
        {tabContent[activeTab as keyof typeof tabContent]}
      </div>
    </div>
  );
}
