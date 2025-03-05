import React, { useState } from "react";
import {
  FaSearch,
  FaHeart,
  FaHandHoldingHeart,
  FaTshirt,
  FaHome,
  FaUtensils,
  FaBookOpen,
  FaMedkit,
} from "react-icons/fa";

interface DonationCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
}

import { donatingEntities } from "../landing-page/data";

export default function FindDonations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories: DonationCategory[] = [
    {
      id: "all",
      name: "All Categories",
      icon: <FaHeart className="text-red-500" />,
    },
    {
      id: "food",
      name: "Food",
      icon: <FaUtensils className="text-orange-500" />,
    },
    {
      id: "clothing",
      name: "Clothing",
      icon: <FaTshirt className="text-blue-500" />,
    },
    {
      id: "shelter",
      name: "Shelter",
      icon: <FaHome className="text-green-500" />,
    },
    {
      id: "education",
      name: "Education",
      icon: <FaBookOpen className="text-purple-500" />,
    },
    {
      id: "medical",
      name: "Medical Aid",
      icon: <FaMedkit className="text-red-500" />,
    },
  ];

  const filteredOrgs = donatingEntities.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || org.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find Donation Opportunities
        </h1>
        <p className="text-xl text-gray-600">
          Connect with organizations making a difference in people's lives
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search organizations..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Organizations Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOrgs.map((org) => (
            <div
              key={org.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className="h-48 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${org.image})` }}
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {org.name}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      org.urgencyLevel === "High"
                        ? "bg-red-100 text-red-800"
                        : org.urgencyLevel === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {org.urgencyLevel} Priority
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{org.description}</p>
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <FaHandHoldingHeart />
                  <span>{org.impact}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <FaHome />
                  <span>{org.location}</span>
                </div>
                <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
                  Donate Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
