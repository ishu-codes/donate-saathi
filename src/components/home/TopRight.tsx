import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function TopRight() {
  const [activeTab, setActiveTab] = useState("goal");

  const collected = 24000;
  const target = 48000;
  const percentage = Math.round((collected / target) * 100);
  const remaining = target - collected;

  return (
    <div className="w-full dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          Donation Profile
        </h2>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex justify-between bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {["Overview", "Goal", "Statistics"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={cn(
              "w-1/3 py-2 text-sm font-medium rounded-lg transition",
              activeTab === tab.toLowerCase()
                ? "bg-white dark:bg-gray-700 shadow-md"
                : "text-gray-500"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="text-center mt-6">
        <div className="flex justify-center">
          <span className="bg-purple-500 text-white p-2 rounded-full shadow-md">
            ⭐
          </span>
        </div>
        <h3 className="text-lg font-semibold mt-2">Donation Goal for 2023</h3>
        <p className="text-gray-500 text-sm">
          ${collected.toLocaleString()} / ${target.toLocaleString()}
        </p>

        {/* Heart Progress Bar */}
        <div className="relative flex justify-center mt-4">
          <div className="w-40 h-40 relative">
            <svg viewBox="0 0 200 200" className="absolute w-full h-full">
              <path
                d="M100 180C70 140 20 120 20 75C20 40 50 20 75 20C90 20 100 40 100 40C100 40 110 20 125 20C150 20 180 40 180 75C180 120 130 140 100 180Z"
                fill="url(#gradient)"
                stroke="white"
                strokeWidth="5"
              />
              <defs>
                <linearGradient id="gradient" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#9f7aea" />
                  <stop offset={`${100 - percentage}%`} stopColor="#e9d5ff" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
              {percentage}%
            </div>
          </div>
        </div>

        {/* Donate Call to Action */}
        <p className="text-sm text-gray-600 mt-3">
          Donate{" "}
          <span className="font-bold text-purple-600">
            ${remaining.toLocaleString()}
          </span>{" "}
          to reach your target.
        </p>
      </div>
    </div>
  );
}
