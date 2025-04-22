import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import NewDonation from "./NewDonation";
import BottomLeft from "./BottomLeft";
import TopLeft from "./TopLeft";
import TopRight from "./TopRight";
import "./style.css";
import {
  CalendarClock,
  Gift,
  Heart,
  Award,
  TrendingUp,
  Users,
} from "lucide-react";

export default function DashBoard() {
  const { user } = useAuth();
  const username = user?.email?.split("@")[0] || "Saathi";

  // Animation variants for staggered animations
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
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-50 rounded-full opacity-30 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-50 rounded-full opacity-30 blur-3xl -z-10"></div>
      <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-3xl -z-20"></div>

      {/* Welcome Section */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative">
          <div className="absolute -left-4 -top-4 w-20 h-20 bg-green-100 rounded-full opacity-50"></div>
          <h1 className="text-4xl font-bold text-gray-800 relative z-10">
            Welcome back, <span className="text-green-600">{username}</span>! 👋
          </h1>
        </div>
        <p className="text-gray-600 mt-2 text-lg">
          Ready to make a difference today? Your generosity matters.
        </p>

        {/* Quick action buttons */}
        <div className="flex mt-6 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg shadow-md hover:shadow-lg flex items-center gap-2 transition-all"
          >
            <Gift size={18} />
            New Donation
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-white border border-green-200 text-green-600 rounded-lg shadow-sm hover:shadow flex items-center gap-2 transition-all"
          >
            <TrendingUp size={18} />
            View Stats
          </motion.button>
        </div>
      </motion.div>

      {/* Impact Summary */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
      >
        {[
          {
            title: "Total Donations",
            value: "24",
            icon: <Gift className="text-green-500" size={24} />,
            color: "green",
          },
          {
            title: "Active Requests",
            value: "12",
            icon: <CalendarClock className="text-blue-500" size={24} />,
            color: "blue",
          },
          {
            title: "Lives Impacted",
            value: "156",
            icon: <Heart className="text-rose-500" size={24} />,
            color: "rose",
          },
          {
            title: "Success Rate",
            value: "92%",
            icon: <Award className="text-amber-500" size={24} />,
            color: "amber",
          },
        ].map((stat) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            className={`
              bg-white p-6 rounded-xl shadow-md hover:shadow-xl 
              transition-all duration-300 border border-${stat.color}-100
              hover:-translate-y-1 group
            `}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {stat.title}
                </h3>
                <p className={`text-3xl font-bold text-${stat.color}-600 mt-1`}>
                  {stat.value}
                </p>
              </div>
              <div
                className={`p-3 bg-${stat.color}-50 rounded-lg group-hover:bg-${stat.color}-100 transition-colors`}
              >
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <TrendingUp size={12} className={`text-${stat.color}-500`} />
                <span className={`text-${stat.color}-600 font-medium`}>
                  +12%
                </span>{" "}
                from last month
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <motion.div
          className="lg:col-span-2 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <TopLeft />
        </motion.div>

        <motion.div
          className="lg:row-span-2 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <TopRight />
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <BottomLeft />
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <NewDonation />
        </motion.div>
      </div>

      {/* Recent Activity & Community */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Activity
            </h2>
            <button className="text-sm text-green-600 hover:text-green-700 font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Food Donation",
                description: "12kg of rice donated to Orphanage",
                time: "2 hours ago",
                icon: <Gift className="text-green-500" size={16} />,
              },
              {
                title: "Clothes Request",
                description: "Request approved for winter clothes",
                time: "Yesterday",
                icon: <Users className="text-blue-500" size={16} />,
              },
              {
                title: "Medicine Donation",
                description: "Paracetamol and vitamins donated",
                time: "3 days ago",
                icon: <Heart className="text-rose-500" size={16} />,
              },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="p-2 bg-gray-100 rounded-lg h-fit">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Community Impact */}
        <motion.div
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-md p-6 border border-green-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Community Impact
            </h2>
            <span className="text-sm text-green-700 bg-green-100 px-2 py-1 rounded-full">
              Growing
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Total Donors
            </h3>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-green-700">2,405</span>
              <span className="text-sm text-green-600 pb-1">
                +12% this month
              </span>
            </div>

            <div className="h-2 bg-green-200 rounded-full mt-2">
              <div className="h-full w-3/4 bg-green-600 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-sm font-medium text-gray-600">
                NGO Partners
              </h3>
              <p className="text-2xl font-bold text-green-700 mt-1">48</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <TrendingUp size={12} className="text-green-500" />
                <span className="text-green-600">+3</span> this month
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-sm font-medium text-gray-600">
                Cities Covered
              </h3>
              <p className="text-2xl font-bold text-green-700 mt-1">16</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <TrendingUp size={12} className="text-green-500" />
                <span className="text-green-600">+2</span> this month
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
