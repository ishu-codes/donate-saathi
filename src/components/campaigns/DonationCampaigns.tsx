import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  // FaRegClock,
  FaHeartbeat,
  FaSearch,
  FaMapMarkerAlt,
  FaSortAmountDown,
  FaChevronDown,
  FaChevronUp,
  FaUserPlus,
  FaCheck,
} from "react-icons/fa";
import { useCampaigns } from "@/hooks/db";

const DonationCampaigns: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOpen, setSortOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("Most Popular");
  const { data: campaigns } = useCampaigns();

  // Sample campaigns data - in a real app, this would come from an API
  // const campaigns = [
  //   {
  //     id: 1,
  //     title: "Education for Children",
  //     description:
  //       "Support education initiatives that help children from underserved communities access quality education and resources.",
  //     image:
  //       "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     raised: 12500,
  //     goal: 20000,
  //     daysLeft: 15,
  //     category: "Education",
  //     location: "Mumbai, India",
  //     organizer: "Bright Future Foundation",
  //     color: "bg-blue-600",
  //     gradient: "from-blue-600 to-blue-700",
  //   },
  //   {
  //     id: 2,
  //     title: "Clean Water Initiative",
  //     description:
  //       "Help provide clean and safe drinking water to communities facing water scarcity and quality issues.",
  //     image:
  //       "https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     raised: 8300,
  //     goal: 15000,
  //     daysLeft: 22,
  //     category: "Water",
  //     location: "Chennai, India",
  //     organizer: "Clean Water Alliance",
  //     color: "bg-cyan-600",
  //     gradient: "from-cyan-600 to-cyan-700",
  //   },
  //   {
  //     id: 3,
  //     title: "Food for Every Child",
  //     description:
  //       "Support our program to provide nutritious meals to children in poverty-stricken areas around the world.",
  //     image:
  //       "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     raised: 15800,
  //     goal: 25000,
  //     daysLeft: 18,
  //     category: "Food",
  //     location: "Delhi, India",
  //     organizer: "Feed The Future",
  //     color: "bg-yellow-600",
  //     gradient: "from-yellow-600 to-yellow-700",
  //   },
  //   {
  //     id: 4,
  //     title: "Medical Care for Rural Areas",
  //     description:
  //       "Provide essential medical supplies and healthcare services to underserved rural communities across India.",
  //     image:
  //       "https://images.unsplash.com/photo-1631815588090-d4bfec5b7e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     raised: 18700,
  //     goal: 30000,
  //     daysLeft: 30,
  //     category: "Healthcare",
  //     location: "Rajasthan, India",
  //     organizer: "Rural Health Mission",
  //     color: "bg-red-600",
  //     gradient: "from-red-600 to-red-700",
  //   },
  //   {
  //     id: 5,
  //     title: "Green Community Initiative",
  //     description:
  //       "Support environmental conservation through tree planting and sustainable community development programs.",
  //     image:
  //       "https://images.unsplash.com/photo-1576766125535-b04e15fd0273?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     raised: 6200,
  //     goal: 12000,
  //     daysLeft: 25,
  //     category: "Environment",
  //     location: "Bangalore, India",
  //     organizer: "Green Earth Society",
  //     color: "bg-green-600",
  //     gradient: "from-green-600 to-green-700",
  //   },
  //   {
  //     id: 6,
  //     title: "Empowering Women Entrepreneurs",
  //     description:
  //       "Provide training, resources, and micro-loans to help women start and grow their own businesses in rural communities.",
  //     image:
  //       "https://images.unsplash.com/photo-1573875133178-5b122c3fcc2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     raised: 10900,
  //     goal: 18000,
  //     // daysLeft: 40,
  //     category: "Education",
  //     location: "Kolkata, India",
  //     organizer: "Women Empowerment Trust",
  //     color: "bg-purple-600",
  //     // gradient: "from-purple-600 to-purple-700",
  //   },
  // ];

  // Filter categories - derived from the campaigns
  const categories = ["All", ...new Set(campaigns?.map((c) => c.tag?.name))];

  // Filter campaigns based on search and category
  const filteredCampaigns = campaigns?.filter((campaign) => {
    const matchesSearch = searchQuery
      ? campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory =
      activeFilter === "All" || campaign?.tag.name === activeFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 py-24 px-6 md:px-10 lg:px-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="h-full w-full grid grid-cols-12 opacity-20">
            {[...Array(120)].map((_, i) => (
              <div key={i} className="border-b border-r border-white/20"></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Donation Campaigns
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Support meaningful causes and make a direct impact on the lives of
            those in need. Browse campaigns, learn about the impact, and donate
            to causes you care about.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search campaigns..."
                className="w-full py-3 px-5 pl-12 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
            </div>

            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              >
                <FaSortAmountDown />
                <span>Sort: {sortBy}</span>
                {sortOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {sortOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 overflow-hidden">
                  {[
                    "Most Popular",
                    "Recently Added",
                    "Most Funded",
                    "Ending Soon",
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        sortBy === option
                          ? "bg-green-50 text-green-600"
                          : "text-gray-700"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-2 mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            {categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === category
                    ? "bg-white text-green-600"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Campaigns Grid Section */}
      <section className="py-16 px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeFilter === "All"
                ? "All Campaigns"
                : activeFilter + " Campaigns"}
              <span className="ml-2 text-lg font-normal text-gray-500">
                ({filteredCampaigns?.length})
              </span>
            </h2>

            <Link
              to="/create-campaign"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <FaUserPlus size={16} />
              <span>Start a Campaign</span>
            </Link>
          </div>

          {filteredCampaigns?.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl text-gray-600 mb-4">No campaigns found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("All");
                }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCampaigns?.map((campaign, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={campaign.image}
                      alt={campaign.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={`px-4 py-1.5 rounded-full text-white text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-green-600 to-green-700`}
                      >
                        {campaign.tag?.name}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-between items-center z-10">
                      <span className="text-white text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                        <FaMapMarkerAlt size={12} /> {campaign.ngo?.location}
                      </span>
                      {/* <span className="text-white text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                        <FaRegClock size={12} /> {campaign.daysLeft} days left
                      </span> */}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
                      {campaign?.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      by {campaign.ngo?.name}
                    </p>
                    <p className="text-gray-600 mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                      {campaign?.description}
                    </p>

                    <div className="mb-6">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-green-600 rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${
                              (campaign?.completed / campaign?.target) * 100
                            }%`,
                          }}
                          transition={{ duration: 1, delay: 0.2 }}
                          viewport={{ once: true }}
                        ></motion.div>
                      </div>
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="text-gray-800 font-semibold">
                          ₹{campaign.completed.toLocaleString()}
                        </span>
                        <span className="text-gray-500">
                          of ₹{campaign.target.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 flex items-center gap-1.5">
                        <FaHeartbeat className="text-red-500" />{" "}
                        {Math.floor(campaign.completed / 100)} donors
                      </span>
                      <motion.button
                        className={`flex items-center gap-2 px-4 py-2 text-white rounded-md shadow-sm transition-all duration-300 bg-gradient-to-r from-green-600 to-green-700 hover:shadow-lg transform hover:-translate-y-1`}
                        whileTap={{ scale: 0.98 }}
                      >
                        Donate Now <FaArrowRight size={12} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filteredCampaigns && filteredCampaigns.length > 0 && (
            <div className="text-center mt-16">
              <motion.button
                className="relative overflow-hidden px-10 py-4 border-2 border-green-600 text-green-600 font-semibold rounded-md hover:text-white transition-colors duration-500 group"
                whileHover={{ boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => (window.location.href = "/#popular-causes")}
              >
                <span className="relative z-10">Find More Causes</span>
                <span className="absolute inset-0 bg-green-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* Start a Campaign Section */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 lg:p-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Start Your Own Campaign
                </h2>
                <p className="text-gray-600 mb-8">
                  Have a cause you're passionate about? Create your own
                  fundraising campaign and mobilize support from donors across
                  the country. Our platform makes it easy to get started and
                  reach your fundraising goals.
                </p>

                <ul className="space-y-4 mb-10">
                  {[
                    "Simple campaign setup process",
                    "Powerful fundraising tools",
                    "Social media integration",
                    "Transparent donation tracking",
                    "Dedicated support team",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5">
                        <FaCheck size={12} />
                      </span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/create-campaign"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FaUserPlus size={16} />
                  <span>Start a Campaign</span>
                </Link>
              </div>

              <div className="relative h-64 lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-800/80 z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Volunteers helping"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonationCampaigns;
