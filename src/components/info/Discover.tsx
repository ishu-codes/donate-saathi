import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNgos } from "@/hooks/db";
import { NGOsInterface } from "@/interface";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaFilter,
  FaHandshake,
  FaChevronRight,
  FaLightbulb,
  FaHeart,
  FaUsers,
  FaRegClock,
  FaSeedling,
  FaStar,
  FaShieldAlt,
  FaCertificate,
} from "react-icons/fa";

export function Discover() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNGOs, setFilteredNGOs] = useState<NGOsInterface[]>([]);
  const [categories, setCategories] = useState<string[]>();
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { data: ngos, isLoading, error } = useNgos();

  useEffect(() => {
    if (!isLoading && ngos) {
      setIsLoaded(true);
    }
  }, [isLoading, ngos]);

  useEffect(() => {
    let cates: string[] = [];
    const newNGOS = ngos?.filter((ngo) => {
      cates = cates.concat(ngo.tags);
      const matchesCategory = selectedCategory
        ? ngo.tags?.includes(selectedCategory)
        : true;
      const matchesSearch =
        ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ngo.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    setFilteredNGOs(newNGOS ?? []);
    setCategories(Array.from(new Set(cates)) ?? []);
  }, [selectedCategory, ngos, searchTerm]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-teal-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading NGO Partners...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-teal-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="text-green-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">Error: {error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      {/* Hero Section - Updated with new colors and styles */}
      <section className="relative bg-gradient-to-r from-green-600 via-green-500 to-teal-600 py-24 px-6 md:px-10 lg:px-20">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
            <svg
              className="absolute top-0 left-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <radialGradient
                  id="radialGreen"
                  cx="50%"
                  cy="50%"
                  r="50%"
                  fx="50%"
                  fy="50%"
                >
                  <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
                  <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                </radialGradient>
              </defs>
              <circle cx="10" cy="10" r="10" fill="url(#radialGreen)" />
              <circle cx="90" cy="10" r="10" fill="url(#radialGreen)" />
              <circle cx="90" cy="90" r="10" fill="url(#radialGreen)" />
              <circle cx="10" cy="90" r="10" fill="url(#radialGreen)" />
            </svg>

            {/* Floating particles */}
            <div className="absolute top-10 left-1/4 w-2 h-2 bg-green-200 rounded-full animate-float"></div>
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-teal-200 rounded-full animate-float animation-delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-green-200 rounded-full animate-float animation-delay-2000"></div>
            <div className="absolute bottom-1/2 right-1/3 w-2.5 h-2.5 bg-teal-200 rounded-full animate-float animation-delay-3000"></div>
          </div>

          <div className="h-full w-full grid grid-cols-12 opacity-10">
            {[...Array(120)].map((_, i) => (
              <div key={i} className="border-b border-r border-white/20"></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-5"
          >
            <span className="inline-flex items-center px-5 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/10">
              <FaSeedling className="mr-2 h-4 w-4" /> Partners in Change
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="text-yellow-300">NGO</span> Partners
          </motion.h1>

          <motion.p
            className="text-xl text-green-50 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our network of trusted NGOs making a real impact in
            communities across India — organizations devoted to creating
            positive and sustainable change.
          </motion.p>

          <motion.div
            className="max-w-3xl mx-auto flex items-center bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search NGOs by name or mission..."
                className="w-full py-3 px-5 pl-12 rounded-lg bg-transparent text-white placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-100" />
            </div>

            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="md:hidden flex items-center gap-2 py-3 px-4 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <FaFilter />
              {showFiltersMobile ? "Hide" : "Filters"}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Filters Section - Updated with new colors */}
      <section className="bg-white shadow-md py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`flex-wrap gap-2 ${
              showFiltersMobile ? "flex" : "hidden md:flex"
            }`}
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !selectedCategory
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Categories
            </button>
            {categories?.map((category, idx) => (
              <motion.button
                key={idx}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category?.replace("-", " ").toUpperCase()}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* NGOs Grid Section */}
      <section className="py-16 px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedCategory
                ? `${selectedCategory.replace("-", " ")} NGOs`
                : "All NGO Partners"}
              <span className="ml-2 text-lg font-normal text-gray-500">
                ({filteredNGOs.length})
              </span>
            </h2>

            <div className="text-sm text-gray-500 flex items-center gap-1">
              <FaRegClock className="text-green-500" />
              <span>Updated recently</span>
            </div>
          </div>

          {filteredNGOs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-md">
              <div className="text-green-500 text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No NGOs Found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any NGOs matching your search criteria. Try
                adjusting your filters or search term.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredNGOs.map((ngo, index) => (
                <motion.div
                  key={ngo.id}
                  variants={itemVariants}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  {/* Card Header with Enhanced Visuals */}
                  <div className="h-40 bg-gradient-to-r from-green-500 to-teal-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-30"></div>

                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <svg
                        width="100%"
                        height="100%"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <pattern
                            id={`smallGrid${index}`}
                            width="10"
                            height="10"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M 10 0 L 0 0 0 10"
                              fill="none"
                              stroke="white"
                              strokeWidth="0.5"
                            />
                          </pattern>
                          <pattern
                            id={`grid${index}`}
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                          >
                            <rect
                              width="40"
                              height="40"
                              fill={`url(#smallGrid${index})`}
                            />
                            <path
                              d="M 40 0 L 0 0 0 40"
                              fill="none"
                              stroke="white"
                              strokeWidth="1"
                            />
                          </pattern>
                        </defs>
                        <rect
                          width="100%"
                          height="100%"
                          fill={`url(#grid${index})`}
                        />
                      </svg>
                    </div>

                    {/* NGO Name with enhanced styling */}
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <h2 className="text-2xl font-bold text-white text-center z-10 drop-shadow-md">
                        {ngo.name}
                      </h2>
                    </div>

                    {/* Verified Badge & Category Tag */}
                    <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium border border-white/10">
                        <FaShieldAlt className="mr-1 h-3 w-3" /> Verified
                        Partner
                      </span>

                      {ngo?.tags?.length > 0 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-400/90 text-white text-xs font-medium">
                          <FaCertificate className="mr-1 h-3 w-3" />{" "}
                          {ngo.tags[0]?.replace("-", " ")}
                        </span>
                      )}
                    </div>

                    {/* Decorative icon */}
                    <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm rounded-full p-2">
                      <FaSeedling className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Description with styled quote marks */}
                    <div className="relative mb-8">
                      <FaStar className="absolute -top-3 -left-3 text-green-100 h-8 w-8 rotate-12" />
                      <p className="text-gray-600 mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-500 pl-3 pt-1">
                        {ngo.description}
                      </p>
                    </div>

                    {/* Contact Info with enhanced styling */}
                    <div className="space-y-3 text-sm text-gray-600 mb-6 bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
                      <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-green-500 mt-1 flex-shrink-0" />
                        <span>{ngo.location}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaEnvelope className="text-green-500 mt-1 flex-shrink-0" />
                        <span>{ngo.email}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaPhone className="text-green-500 mt-1 flex-shrink-0" />
                        <span>{ngo.phone}</span>
                      </div>
                      {ngo.website && (
                        <div className="flex items-start gap-3">
                          <FaGlobe className="text-green-500 mt-1 flex-shrink-0" />
                          <a
                            href={`https://${ngo.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700 transition-colors hover:underline"
                          >
                            {ngo.website}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Category Tags with enhanced styling */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {ngo?.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium border border-green-100 hover:bg-green-100 transition-colors cursor-pointer"
                        >
                          {tag.replace("-", " ")}
                        </span>
                      ))}
                    </div>

                    {/* Button Row with more features */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-xs text-gray-500">
                        <FaRegClock className="mr-1" /> Active Partner
                      </div>

                      <motion.button
                        className="flex items-center gap-2 px-5 py-2.5 text-white rounded-md shadow-sm transition-all duration-300 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Learn More <FaChevronRight size={12} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section - Enhanced with more styles */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-100 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-50 rounded-full"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-50 rounded-full"></div>

        {/* Dotted pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-green-500 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.25,
              }}
            ></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.span
              className="inline-block px-4 py-1 mb-4 rounded-full bg-green-100 text-green-700 text-sm font-medium"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              For NGOs and Nonprofits
            </motion.span>

            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Why NGOs Partner With{" "}
              <span className="text-green-600">DonateSaathi</span>
            </motion.h2>

            <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full mb-6"></div>

            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              DonateSaathi provides powerful tools and a supportive platform to
              help NGOs reach more donors and maximize their impact in
              communities across India.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaUsers className="text-4xl text-green-600" />,
                title: "Wider Reach",
                description:
                  "Connect with thousands of potential donors who are passionate about your cause",
                bgColor: "bg-gradient-to-br from-green-50 to-teal-50",
                delay: 0,
              },
              {
                icon: <FaLightbulb className="text-4xl text-green-600" />,
                title: "Increased Visibility",
                description:
                  "Showcase your projects and impact to a community dedicated to making a difference",
                bgColor: "bg-gradient-to-br from-green-50 to-yellow-50",
                delay: 0.1,
              },
              {
                icon: <FaHeart className="text-4xl text-green-600" />,
                title: "Dedicated Support",
                description:
                  "Our team works closely with NGO partners to ensure their success on our platform",
                bgColor: "bg-gradient-to-br from-teal-50 to-green-50",
                delay: 0.2,
              },
              {
                icon: <FaHandshake className="text-4xl text-green-600" />,
                title: "Transparent Process",
                description:
                  "Build trust with donors through our transparent donation tracking system",
                bgColor: "bg-gradient-to-br from-yellow-50 to-green-50",
                delay: 0.3,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`${feature.bgColor} rounded-xl p-8 text-center border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay }}
                whileHover={{
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "245+", label: "NGO Partners" },
              { value: "₹12M+", label: "Donations Facilitated" },
              { value: "120k+", label: "Beneficiaries Reached" },
              { value: "18", label: "Indian States Covered" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA Section - Enhanced with more styles */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-gradient-to-r from-green-600 to-teal-700 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 right-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-10"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl opacity-10"></div>

          {/* Added floating elements */}
          <motion.div
            className="absolute right-1/3 top-1/4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          ></motion.div>

          <motion.div
            className="absolute left-1/4 bottom-1/3 w-20 h-20 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
            animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          ></motion.div>

          <motion.div
            className="absolute bottom-10 right-1/4 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-lg rotate-45 border border-white/20"
            animate={{ rotate: [45, 55, 45] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          ></motion.div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20 shadow-xl overflow-hidden">
            {/* Diagonal lines element */}
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-1 bg-white"
                  style={{
                    width: "150%",
                    top: `${i * 10}%`,
                    left: "-25%",
                    transform: "rotate(-45deg)",
                  }}
                ></div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3">
                <motion.span
                  className="inline-block px-4 py-1 mb-4 rounded-full bg-white/20 text-white text-sm font-medium"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Join Our Community
                </motion.span>

                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Ready to Expand Your Impact?
                </motion.h2>

                <motion.p
                  className="text-xl text-green-100 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  Join our platform and connect with thousands of donors who are
                  ready to support your cause. Together, we can create
                  meaningful change in communities across India.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    to="/register?type=ngo"
                    className="relative overflow-hidden px-8 py-3.5 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-md group"
                  >
                    <span className="relative z-10">Register as an NGO</span>
                    <span className="absolute inset-0 w-full scale-x-0 group-hover:scale-x-100 bg-green-50 origin-left transition-transform duration-300"></span>
                  </Link>
                  <Link
                    to="/about-us"
                    className="px-8 py-3.5 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
                  >
                    Learn More About Us
                  </Link>
                </motion.div>
              </div>

              <div className="lg:col-span-2">
                <motion.div
                  className="bg-white rounded-xl p-6 shadow-xl relative overflow-hidden"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  {/* Decorative green circle */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-green-100 rounded-full"></div>

                  <div className="relative">
                    <div className="flex items-center mb-4">
                      <FaSeedling className="text-green-500 mr-3 text-xl" />
                      <h3 className="text-xl font-bold text-gray-800">
                        Partnership Benefits
                      </h3>
                    </div>

                    <ul className="space-y-3">
                      {[
                        "Dedicated dashboard to manage donations",
                        "Customizable NGO profile",
                        "Direct communication with donors",
                        "Promotional opportunities on our platform",
                        "Access to fundraising tools and resources",
                        "Regular reporting and analytics",
                      ].map((benefit, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-3 text-gray-700"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * index }}
                        >
                          <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span>{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-8 bg-green-50 p-4 rounded-lg text-sm text-gray-700 border-l-4 border-green-500">
                      <div className="font-medium mb-1">Ready to join?</div>
                      <p>
                        Registration takes less than 5 minutes. We'll guide you
                        through the process.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
