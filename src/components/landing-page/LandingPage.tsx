import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaRegClock,
  FaHandsHelping,
  FaHeartbeat,
  FaUsers,
  FaCheck,
  FaGraduationCap,
  FaLeaf,
  FaBookReader,
  FaHandHoldingHeart,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaQuoteRight,
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaPaperPlane,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt as FaMapMarker,
  FaFacebook,
  FaYoutube,
  FaHeart,
} from "react-icons/fa";

const NewLandingPage: React.FC = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-green-50 via-green-50 to-yellow-50 py-24 px-6 md:px-10 lg:px-20 min-h-[90vh] flex items-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-70">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute top-1/3 -left-24 w-80 h-80 bg-yellow-200 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute -bottom-32 right-1/3 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6 border border-green-200 shadow-sm">
                Empowering Communities Together
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
                Lend a Helping Hand to{" "}
                <span className="text-green-600 relative inline-block">
                  Those in Need
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-1 bg-green-300 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  ></motion.span>
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
                Join our community of donors making a difference in the lives of
                people around the world through impactful and transparent
                giving.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/new-donation">
                  <motion.button
                    className="group px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2 relative overflow-hidden"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Donate Now</span>
                    <FaArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                    <span className="absolute inset-0 bg-green-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </motion.button>
                </Link>
                <a href="#explore">
                  <motion.button
                    className="group px-8 py-3 border-2 border-green-600 text-green-600 font-medium rounded-md hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md flex items-center gap-2"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Explore</span>
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaArrowRight className="text-green-600" />
                    </motion.span>
                  </motion.button>
                </a>
              </div>
              <div className="flex items-center gap-4 mt-12">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-12 h-12 rounded-full border-2 border-white bg-gradient-to-br from-gray-100 to-gray-300 overflow-hidden shadow-md flex items-center justify-center text-green-600 font-semibold"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                      }}
                    >
                      {i}
                    </motion.div>
                  ))}
                </div>
                <motion.p
                  className="text-sm font-medium text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  Trusted by 2,500+ donors worldwide
                </motion.p>
              </div>
            </motion.div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl transform lg:rotate-2 group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-green-600/20 to-yellow-400/20 z-10 mix-blend-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              ></motion.div>
              <motion.img
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="People helping each other"
                className="w-full h-auto rounded-lg transform transition-all duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-yellow-200 rounded-full z-0 blur-sm opacity-80" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-200 rounded-full z-0 blur-sm opacity-80" />

            {/* Floating Elements */}
            <motion.div
              className="absolute top-10 right-10 z-20 w-20 h-20 bg-white rounded-lg shadow-xl flex items-center justify-center p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            >
              <img
                src="https://img.icons8.com/fluency/96/null/hand-heart.png"
                alt="Care"
                className="w-full h-auto"
              />
            </motion.div>

            <motion.div
              className="absolute bottom-10 left-0 z-20 bg-white px-4 py-2 rounded-lg shadow-xl text-sm font-medium text-green-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-2">
                <FaHeartbeat className="text-red-500" />
                <span>350+ lives changed</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p className="text-gray-500 text-sm mb-2">Scroll to explore</p>
          <motion.div
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Help Section - Enhanced */}
      <section
        id="explore"
        className="py-24 px-6 md:px-10 lg:px-20 bg-white relative"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-green-200 to-transparent"></div>
          <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-t from-yellow-100 to-transparent"></div>
          <div className="grid grid-cols-10 h-full w-full">
            {[...Array(100)].map((_, i) => (
              <div key={i} className="border-b border-r border-gray-200"></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6 border border-green-200 shadow-sm">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              We Are Here to <span className="text-green-600">Help Them</span>
            </h2>
            <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our mission is to connect donors with the causes they care about,
              providing transparent and impactful ways to make a difference.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto relative z-10">
          {[
            {
              icon: <FaHandsHelping className="text-green-600 text-3xl" />,
              title: "Help & Support",
              description:
                "We provide support to those in need through our global network of partners and volunteers.",
              color: "from-green-500 to-green-600",
              borderColor: "border-green-200",
              hoverBg: "group-hover:bg-green-50",
            },
            {
              icon: <FaHeartbeat className="text-red-600 text-3xl" />,
              title: "Health Programs",
              description:
                "Our health initiatives deliver vital care and resources to underserved communities worldwide.",
              color: "from-red-500 to-red-600",
              borderColor: "border-red-200",
              hoverBg: "group-hover:bg-red-50",
            },
            {
              icon: <FaUsers className="text-blue-600 text-3xl" />,
              title: "Community Building",
              description:
                "We strengthen communities through education, infrastructure, and sustainable development.",
              color: "from-blue-500 to-blue-600",
              borderColor: "border-blue-200",
              hoverBg: "group-hover:bg-blue-50",
            },
            {
              icon: <FaRegClock className="text-yellow-600 text-3xl" />,
              title: "Regular Assistance",
              description:
                "Our ongoing programs ensure continuous support for long-term positive impact.",
              color: "from-yellow-500 to-yellow-600",
              borderColor: "border-yellow-200",
              hoverBg: "group-hover:bg-yellow-50",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
              whileHover={{ y: -10 }}
            >
              <div
                className={`absolute right-0 top-0 w-24 h-24 rounded-bl-full bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>
              <div
                className={`w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-md border ${item.borderColor} group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-2 relative z-10`}
              >
                <div
                  className={`w-16 h-16 rounded-full ${item.hoverBg} flex items-center justify-center transition-colors duration-300`}
                >
                  {item.icon}
                </div>
              </div>
              <motion.h3
                className="text-xl font-semibold text-gray-800 mb-3 relative"
                whileHover={{ scale: 1.05 }}
              >
                {item.title}
                <div className="w-0 h-0.5 bg-green-600 absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:w-1/2 group-hover:opacity-100 transition-all duration-300"></div>
              </motion.h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Join Section - Enhanced */}
      <section className="py-24 px-6 md:px-10 lg:px-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-96 h-96 bg-yellow-200 rounded-full opacity-20 blur-3xl transform -translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="relative">
            <div className="absolute z-0 -top-5 -left-5 w-32 h-32 bg-green-600 rounded-lg opacity-10 transform rotate-12"></div>
            <div className="absolute z-0 -bottom-5 -right-5 w-32 h-32 bg-yellow-400 rounded-lg opacity-10 transform -rotate-12"></div>

            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <motion.img
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                src="https://images.unsplash.com/photo-1509099652299-30938b0aeb63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="People helping each other"
                className="w-full h-auto rounded-lg transform transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-green-600 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <FaUsers size={12} />
                <span>Join 5,000+ volunteers</span>
              </div>
            </div>

            {/* Stats floating element */}
            <motion.div
              className="absolute -bottom-6 -right-6 z-20 bg-white rounded-lg p-4 shadow-xl flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="bg-green-50 rounded-full p-3 text-green-600">
                <FaHandsHelping size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Communities Helped
                </p>
                <p className="text-2xl font-bold text-gray-800">750+</p>
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6 border border-green-200 shadow-sm">
                Join Our Community
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Join Your Hands With Us for a{" "}
                <span className="text-green-600">Better Life and Future</span>
              </h2>
              <p className="text-gray-600 mb-8">
                By joining our community, you become part of a global movement
                working to create meaningful change in the lives of those who
                need it most.
              </p>

              <div className="space-y-5 mb-8">
                {[
                  "Support communities in need",
                  "Make a real difference in people's lives",
                  "Be part of our global community",
                  "See the impact of your contribution",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-sm group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                      <FaCheck className="text-sm" />
                    </div>
                    <p className="text-gray-700 font-medium group-hover:text-green-700 transition-colors duration-300">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>

              <Link to="/register">
                <motion.button
                  className="group px-8 py-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2 relative overflow-hidden"
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
                >
                  <span className="relative z-10">Join Now</span>
                  <FaArrowRight className="relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" />
                  <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Causes Section - Enhanced */}
      <section
        id="popular-causes"
        className="py-24 px-6 md:px-10 lg:px-20 bg-white relative"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-t from-green-100 to-transparent"></div>
          <div className="absolute left-0 top-0 w-1/3 h-1/2 bg-gradient-to-r from-yellow-100 to-transparent"></div>
        </div>

        <div className="container mx-auto text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6 border border-green-200 shadow-sm">
              Make an Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Find The Popular <span className="text-green-600">Cause</span> and
              Donate Them
            </h2>
            <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Support these high-impact causes that are making a meaningful
              difference in communities around the world.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto relative z-10">
          {[
            {
              title: "Education for Children",
              description:
                "Support education initiatives that help children from underserved communities access quality education and resources.",
              image:
                "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              raised: 12500,
              goal: 20000,
              daysLeft: 15,
              category: "Education",
              color: "bg-blue-600",
              gradient: "from-blue-600 to-blue-700",
            },
            {
              title: "Clean Water Initiative",
              description:
                "Help provide clean and safe drinking water to communities facing water scarcity and quality issues.",
              image:
                "https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              raised: 8300,
              goal: 15000,
              daysLeft: 22,
              category: "Water",
              color: "bg-cyan-600",
              gradient: "from-cyan-600 to-cyan-700",
            },
            {
              title: "Food for Every Child",
              description:
                "Support our program to provide nutritious meals to children in poverty-stricken areas around the world.",
              image:
                "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              raised: 15800,
              goal: 25000,
              daysLeft: 18,
              category: "Food",
              color: "bg-yellow-600",
              gradient: "from-yellow-600 to-yellow-700",
            },
          ].map((cause, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={cause.image}
                  alt={cause.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`px-4 py-1.5 rounded-full text-white text-xs font-semibold uppercase tracking-wider bg-gradient-to-r ${cause.gradient}`}
                  >
                    {cause.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-between items-center z-10">
                  <span className="text-white text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <FaHeartbeat className="inline mr-1" /> {cause.raised}{" "}
                    donors
                  </span>
                  <span className="text-white text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <FaRegClock className="inline mr-1" /> {cause.daysLeft} days
                    left
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300">
                  {cause.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                  {cause.description}
                </p>
                <div className="mb-6">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${cause.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${(cause.raised / cause.goal) * 100}%`,
                      }}
                      transition={{ duration: 1, delay: 0.2 }}
                      viewport={{ once: true }}
                    ></motion.div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-800 font-semibold">
                      ₹{cause.raised.toLocaleString()}
                    </span>
                    <span className="text-gray-500">
                      of ₹{cause.goal.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Link to="/new-donation" className="flex justify-end">
                  <motion.button
                    className={`flex items-center gap-2 px-6 py-2.5 text-white rounded-md shadow-sm transition-all duration-300 bg-gradient-to-r ${cause.gradient} hover:shadow-lg transform hover:-translate-y-1`}
                    whileTap={{ scale: 0.98 }}
                  >
                    Donate Now <FaArrowRight size={12} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/donation-campaigns">
            <motion.button
              className="relative overflow-hidden px-10 py-4 border-2 border-green-600 text-green-600 font-semibold rounded-md hover:text-white transition-colors duration-500 group"
              whileHover={{ boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (window.location.href = "/donation-campaigns")}
            >
              <span className="relative z-10">View All Causes</span>
              <span className="absolute inset-0 bg-green-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Skills Section - Enhanced */}
      <section className="py-24 px-6 md:px-10 lg:px-20 relative overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-700 to-green-900 z-0"></div>

        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute left-0 bottom-0 w-full h-96 bg-gradient-to-t from-black to-transparent"></div>
          <div className="h-full w-full grid grid-cols-12">
            {[...Array(120)].map((_, i) => (
              <div key={i} className="border-b border-r border-white/10"></div>
            ))}
          </div>
        </div>

        {/* Floating shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-green-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-64 h-64 bg-yellow-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 left-40 w-64 h-64 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-green-600 text-white text-sm font-medium mb-6 border border-green-500 shadow-lg backdrop-blur-sm">
              Volunteer with Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Use Your Skills to Give A{" "}
              <span className="text-yellow-300">Better Life and Future</span>
            </h2>
            <div className="w-20 h-1 bg-yellow-400 rounded-full mb-8"></div>
            <p className="mb-10 text-green-50 text-lg">
              Your skills and expertise can make a meaningful difference in the
              lives of others. Join our volunteer network and contribute your
              talents to our mission.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {[
                {
                  icon: <FaGraduationCap className="text-3xl" />,
                  title: "Teach & Educate",
                  description:
                    "Share your knowledge with those eager to learn and grow",
                  color: "from-blue-500 to-blue-600",
                  shadowColor: "shadow-blue-600/20",
                  delay: 0,
                },
                {
                  icon: <FaBookReader className="text-3xl" />,
                  title: "Mentor Others",
                  description:
                    "Guide and support others on their development journey",
                  color: "from-yellow-500 to-yellow-600",
                  shadowColor: "shadow-yellow-600/20",
                  delay: 0.1,
                },
                {
                  icon: <FaLeaf className="text-3xl" />,
                  title: "Environmental Work",
                  description:
                    "Contribute to projects that protect and restore our environment",
                  color: "from-green-500 to-green-600",
                  shadowColor: "shadow-green-600/20",
                  delay: 0.2,
                },
                {
                  icon: <FaHandHoldingHeart className="text-3xl" />,
                  title: "Direct Care",
                  description:
                    "Provide assistance and support to those in immediate need",
                  color: "from-red-500 to-red-600",
                  shadowColor: "shadow-red-600/20",
                  delay: 0.3,
                },
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: skill.delay + 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div className="relative p-6 bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:bg-white/20 transition-colors duration-300 h-full z-10 flex flex-col">
                    <div
                      className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-gradient-to-bl ${skill.color} opacity-20`}
                    ></div>
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${skill.color} text-white shadow-lg ${skill.shadowColor} mb-5`}
                    >
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                      {skill.title}
                    </h3>
                    <p className="text-green-50/90 text-sm">
                      {skill.description}
                    </p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <a
                        href="#"
                        className="inline-flex items-center text-yellow-300 hover:text-yellow-200 transition-colors"
                      >
                        Learn More <FaArrowRight className="ml-2" size={12} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link to="/register">
              <motion.button
                className="group px-8 py-4 bg-white text-green-700 font-medium rounded-lg hover:bg-yellow-300 hover:text-green-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center gap-2 relative overflow-hidden"
                whileTap={{ scale: 0.98 }}
                whileHover={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
              >
                <span className="relative z-10">Join As Volunteer</span>
                <FaArrowRight className="relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-12 gap-4 relative">
            <motion.div
              className="col-span-7 row-span-1"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="relative h-60 lg:h-72 overflow-hidden rounded-2xl shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1560252829-804f1aedf1be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Volunteers teaching"
                  className="w-full h-full object-cover transition-transform duration-10000 hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <p className="text-white text-lg font-semibold">
                    Teaching Programs
                  </p>
                  <p className="text-gray-300 text-sm">
                    Help children learn and grow
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-span-5 row-span-1"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative h-60 lg:h-72 overflow-hidden rounded-2xl shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Community building"
                  className="w-full h-full object-cover transition-transform duration-10000 hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <p className="text-white text-lg font-semibold">
                    Community Support
                  </p>
                  <p className="text-gray-300 text-sm">
                    Building stronger connections
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-span-4 row-span-1"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="relative h-60 lg:h-72 overflow-hidden rounded-2xl shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Environmental work"
                  className="w-full h-full object-cover transition-transform duration-10000 hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <p className="text-white text-lg font-semibold">
                    Nature Restoration
                  </p>
                  <p className="text-gray-300 text-sm">
                    Healing our environment
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-span-8 row-span-1"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="relative h-60 lg:h-72 overflow-hidden rounded-2xl shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1469571486292-b53601010376?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Healthcare volunteers"
                  className="w-full h-full object-cover transition-transform duration-10000 hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <p className="text-white text-lg font-semibold">
                    Healthcare Support
                  </p>
                  <p className="text-gray-300 text-sm">
                    Providing essential care services
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Skills counter */}
            <motion.div
              className="absolute -bottom-10 -right-10 z-30 bg-white rounded-xl p-4 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center px-3">
                  <motion.h4
                    className="text-3xl font-bold text-green-600"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    1.2K+
                  </motion.h4>
                  <p className="text-xs text-gray-500">Volunteers</p>
                </div>
                <div className="text-center px-3 border-l border-gray-200">
                  <motion.h4
                    className="text-3xl font-bold text-green-600"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    42+
                  </motion.h4>
                  <p className="text-xs text-gray-500">Countries</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Events Section - Enhanced */}
      <section className="py-24 px-6 md:px-10 lg:px-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute inset-0 grid grid-cols-10 gap-2">
            {[...Array(100)].map((_, i) => (
              <div key={i} className="border-b border-r border-gray-200"></div>
            ))}
          </div>
          <div className="absolute left-0 top-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
          <div className="absolute left-0 bottom-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-40 left-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-40 right-10 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

        <div className="container mx-auto text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6 border border-green-200 shadow-sm">
              Upcoming Events
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ready to Join Our Latest{" "}
              <span className="text-green-600">Upcoming Events</span>
            </h2>
            <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Participate in our events to connect with fellow volunteers,
              contribute to worthwhile causes, and make a direct impact on
              communities in need.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto relative z-10">
          {[
            {
              title: "Community Garden Planting Day",
              description:
                "Join us as we plant trees and flowers to beautify local community spaces and promote environmental sustainability.",
              image:
                "https://images.unsplash.com/photo-1552664688-cf412ec27db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              date: "May 15, 2023",
              time: "9:00 AM - 2:00 PM",
              location: "Central Park, New Delhi",
              color: "green",
              participants: 56,
            },
            {
              title: "Education Workshop for Children",
              description:
                "Volunteer to teach basic skills and engage in fun learning activities with children from underserved communities.",
              image:
                "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              date: "June 2, 2023",
              time: "10:00 AM - 1:00 PM",
              location: "Community Center, Mumbai",
              color: "blue",
              participants: 42,
            },
          ].map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row"
            >
              <div className="md:w-2/5 h-60 md:h-auto overflow-hidden relative">
                <div
                  className={`absolute inset-0 bg-${event.color}-600 mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10`}
                ></div>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`bg-${event.color}-100 text-${event.color}-800 text-xs font-medium px-2.5 py-1 rounded-md`}
                  >
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>
                  <span
                    className={`block mt-1 bg-white text-gray-800 text-2xl font-bold px-2.5 py-1 rounded-md shadow-sm`}
                  >
                    {new Date(event.date).toLocaleDateString("en-US", {
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                  <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      ></path>
                    </svg>
                    {event.participants} joined
                  </span>
                  <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    {event.time}
                  </span>
                </div>
              </div>
              <div className="p-6 md:w-3/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 md:line-clamp-none">
                    {event.description}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <FaCalendarAlt className="text-green-600" size={14} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold block">
                        Date & Time
                      </span>
                      <span className="text-xs">
                        {event.date} • {event.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <FaMapMarkerAlt className="text-green-600" size={14} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold block">
                        Location
                      </span>
                      <span className="text-xs">{event.location}</span>
                    </div>
                  </div>
                  <motion.button
                    className={`group flex items-center gap-2 w-full justify-center px-6 py-3 bg-${event.color}-600 hover:bg-${event.color}-700 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-lg`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Register Now
                    <FaArrowRight
                      size={12}
                      className="transform transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16 relative z-10">
          <motion.button
            className="group relative overflow-hidden px-8 py-4 bg-white text-green-600 font-semibold rounded-lg border-2 border-green-600 hover:text-white transition-colors duration-500"
            whileHover={{ boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View All Events
              <FaArrowRight
                size={14}
                className="transform transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
            <span className="absolute inset-0 bg-green-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </motion.button>
        </div>
      </section>

      {/* Team Section - Enhanced */}
      {/* <section className="py-24 px-6 md:px-10 lg:px-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-green-50 to-transparent"></div>
          <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </div>

        <div className="container mx-auto text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6 border border-green-200 shadow-sm">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Meet The <span className="text-green-600">Team</span> Behind This
              Initiative
            </h2>
            <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our dedicated team of professionals is committed to creating
              meaningful change through innovative fundraising and volunteer
              coordination.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto relative z-10">
          {[
            {
              name: "Priya Sharma",
              role: "Executive Director",
              description:
                "Leading our strategic initiatives with over 10 years in non-profit management.",
              image:
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              socialLinks: {
                linkedin: "#",
                twitter: "#",
                instagram: "#",
              },
              color: "from-blue-500 to-purple-600",
            },
            {
              name: "Rahul Mehta",
              role: "Operations Manager",
              description:
                "Overseeing our day-to-day operations and program implementation.",
              image:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              socialLinks: {
                linkedin: "#",
                twitter: "#",
                instagram: "#",
              },
              color: "from-green-500 to-teal-600",
            },
            {
              name: "Anjali Desai",
              role: "Volunteer Coordinator",
              description:
                "Connecting passionate volunteers with meaningful opportunities to serve.",
              image:
                "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              socialLinks: {
                linkedin: "#",
                twitter: "#",
                instagram: "#",
              },
              color: "from-amber-500 to-orange-600",
            },
            {
              name: "Vikram Singh",
              role: "Fund Development",
              description:
                "Building partnerships and securing resources to support our mission.",
              image:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              socialLinks: {
                linkedin: "#",
                twitter: "#",
                instagram: "#",
              },
              color: "from-red-500 to-pink-600",
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
            >
              <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-transparent to-black/70 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div
                className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${member.color} rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500`}
              ></div>

              <div className="relative h-72 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="relative z-20 p-6 bg-white">
                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-green-600 transition-colors duration-300">
                  {member.name}
                </h3>
                <p
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 bg-gradient-to-r ${member.color} text-white`}
                >
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm mb-4 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500">
                  {member.description}
                </p>

                <div className="flex justify-center gap-4 items-center mt-3 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {Object.keys(member.socialLinks).map((platform, i) => {
                    const Icon =
                      platform === "linkedin"
                        ? FaLinkedin
                        : platform === "twitter"
                        ? FaTwitter
                        : FaInstagram;
                    return (
                      <motion.a
                        key={i}
                        href={
                          member.socialLinks[
                            platform as keyof typeof member.socialLinks
                          ]
                        }
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-600 hover:text-white transition-colors duration-300"
                        whileHover={{ y: -3, rotate: 5 }}
                      >
                        <Icon size={14} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              <motion.div
                className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <div className="w-10 h-10 rounded-full shadow-lg bg-white/80 backdrop-blur-sm flex items-center justify-center text-green-600">
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 max-w-5xl mx-auto bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-10 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 -right-10 w-40 h-40 bg-gradient-to-br from-green-300 to-green-400 rounded-full opacity-20"></div>
          <div className="absolute bottom-0 -left-10 w-40 h-40 bg-gradient-to-tr from-emerald-300 to-green-300 rounded-full opacity-20"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
            <div>
              <motion.h3
                className="text-2xl md:text-3xl font-bold text-gray-800 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Want to Join Our Team?
              </motion.h3>
              <motion.p
                className="text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                We're always looking for passionate individuals who want to make
                a difference. Check out our current openings and join our
                mission.
              </motion.p>
              <motion.button
                className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center gap-2"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                View Openings <FaArrowRight size={12} />
              </motion.button>
            </div>

            <div className="relative">
              <motion.img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                className="rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              />
              <motion.div
                className="absolute -bottom-5 -right-5 bg-white rounded-lg p-4 shadow-lg flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                }}
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Join today
                  </p>
                  <p className="text-xs text-gray-500">20+ open positions</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-20 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our platform, donation
              process, and volunteer opportunities.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How do I make a donation?",
                answer:
                  "Making a donation is simple! Select a cause that resonates with you, choose your donation amount, and complete the secure payment process. You'll receive a confirmation email and tax receipt immediately.",
              },
              {
                question: "Is my donation tax-deductible?",
                answer:
                  "Yes, all donations made through our platform are tax-deductible. You will receive an official receipt for your tax records immediately after your donation is processed.",
              },
              {
                question: "How can I volunteer with DonateSaathi?",
                answer:
                  "You can join our volunteer network by registering on our platform, selecting your areas of interest and skills, and browsing available opportunities. We have both in-person and remote volunteering options available.",
              },
              {
                question: "How does DonateSaathi ensure transparency?",
                answer:
                  "We maintain complete transparency by providing detailed reports on fund allocation, sharing impact metrics, and maintaining open communication with donors. You can track exactly how your donation is being used through your donor dashboard.",
              },
              {
                question: "Can I start my own fundraising campaign?",
                answer:
                  "Absolutely! Our platform allows you to create personalized fundraising campaigns for causes you care about. You can easily share your campaign with friends and family and track your fundraising progress.",
              },
            ].map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 md:px-10 lg:px-20 bg-white overflow-hidden">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Trusted by Thousands of People & Companies
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See what our donors, volunteers, and partners have to say about
            their experience with DonateSaathi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {[
            {
              name: "Arun Patel",
              role: "Regular Donor",
              image:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              rating: 5,
              testimonial:
                "DonateSaathi has made giving back so seamless. I appreciate the transparency and being able to see the direct impact of my contributions.",
            },
            {
              name: "Meera Krishnan",
              role: "Corporate Partner",
              image:
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              rating: 5,
              testimonial:
                "Our partnership with DonateSaathi has transformed our corporate social responsibility efforts. Their team is professional, responsive, and truly committed to making a difference.",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 border border-gray-100 shadow-md relative"
            >
              <div className="absolute right-8 top-8 text-green-100">
                <FaQuoteRight size={60} />
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 relative z-10">
                {testimonial.testimonial}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-5 gap-8 max-w-5xl mx-auto mt-16">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
            >
              <div className="h-12 w-32 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Directly From The Latest News and Articles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed about our initiatives, impact stories, and updates
            from the field.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              title: "Bringing Clean Water to Rural Communities",
              excerpt:
                "Our newest initiative has successfully provided clean water access to 15 rural villages, impacting over 5,000 lives.",
              image:
                "https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              date: "May 8, 2023",
              category: "Water Initiative",
            },
            {
              title: "Education Programs Reach New Milestone",
              excerpt:
                "Thanks to our donors' support, we've provided educational resources to over 10,000 children in the past year.",
              image:
                "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              date: "April 22, 2023",
              category: "Education",
            },
            {
              title: "Corporate Partnership Spotlight",
              excerpt:
                "Our partnership with Tech Solutions Inc. has enabled us to expand our digital literacy programs to 50 new schools.",
              image:
                "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              date: "April 15, 2023",
              category: "Partnerships",
            },
          ].map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow group"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <FaCalendarAlt />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a
                  href="#"
                  className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors"
                >
                  Read More <FaArrowRight className="ml-2" size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-6 py-3 border border-green-600 text-green-600 font-medium rounded-md hover:bg-green-50 transition-colors">
            View All Articles
          </button>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6 md:px-10 lg:px-20 bg-white">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Photo Gallery
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See the impact of our work through these inspiring moments captured
            in the field.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="relative rounded-lg overflow-hidden group h-48 md:h-64"
            >
              <img
                src={`https://images.unsplash.com/photo-${
                  1550000000000 + index * 10000
                }?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-green-600 bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-300">
                <span className="w-10 h-10 rounded-full bg-white text-green-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
                  <FaArrowRight />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6 md:px-10 lg:px-20 bg-gray-800 text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Subscribe to Newsletter
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Stay updated on our projects, campaigns, and events. Join our
            community to receive regular updates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="px-6 py-4 rounded-lg w-full sm:w-auto sm:flex-1 max-w-md text-gray-200 ring-2 ring-white/40 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="px-6 py-4 bg-green-600 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto flex items-center justify-center gap-2 whitespace-nowrap">
              Subscribe Now <FaPaperPlane />
            </button>
          </div>

          <p className="text-gray-400 text-sm mt-4">
            We respect your privacy. Your information will not be shared.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 md:px-10 lg:px-20 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                We Love to Hear From You For Happy Connections
              </h2>
              <p className="text-gray-600 mb-8">
                Have questions or want to get involved? Reach out to our team,
                and we'll be happy to assist you.
              </p>

              <div className="space-y-6 mb-8">
                {[
                  {
                    icon: <FaPhone className="text-green-600" />,
                    title: "Call Us",
                    details: "+91 98765 43210",
                  },
                  {
                    icon: <FaEnvelope className="text-green-600" />,
                    title: "Email Us",
                    details: "info@donatesaathi.org",
                  },
                  {
                    icon: <FaMapMarker className="text-green-600" />,
                    title: "Visit Us",
                    details: "123 Charity Lane, Mumbai, India 400001",
                  },
                ].map((contact, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 rounded-full text-xl">
                      {contact.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {contact.title}
                      </h3>
                      <p className="text-gray-600">{contact.details}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                {[
                  FaFacebook,
                  FaTwitter,
                  FaInstagram,
                  FaLinkedin,
                  FaYoutube,
                ].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-green-600 hover:text-white transition-colors"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Send Us a Message
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Message subject"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div>
              <h3 className="text-2xl font-bold mb-6">DonateSaathi</h3>
              <p className="text-gray-400 mb-6">
                Making a difference through the power of collective giving. Join
                us in creating a better world through meaningful donations and
                volunteering.
              </p>
              <div className="flex items-center gap-4">
                {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map(
                  (Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="text-gray-400 hover:text-green-500 transition-colors"
                    >
                      <Icon />
                    </a>
                  )
                )}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  "About Us",
                  "Causes",
                  "Volunteer",
                  "Events",
                  "Blog",
                  "Contact Us",
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                    >
                      <FaArrowRight className="mr-2 text-xs" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Causes</h4>
              <ul className="space-y-3">
                {[
                  "Education",
                  "Water & Sanitation",
                  "Healthcare",
                  "Food & Hunger",
                  "Child Welfare",
                  "Environment",
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                    >
                      <FaArrowRight className="mr-2 text-xs" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
              <ul className="space-y-4">
                {[
                  {
                    icon: <FaMapMarker />,
                    text: "123 Charity Lane, Mumbai, India 400001",
                  },
                  {
                    icon: <FaPhone />,
                    text: "+91 98765 43210",
                  },
                  {
                    icon: <FaEnvelope />,
                    text: "info@donatesaathi.org",
                  },
                ].map((contact, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">{contact.icon}</span>
                    <span className="text-gray-400">{contact.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} DonateSaathi. All rights reserved |
              Made with{" "}
              <FaHeart className="inline text-red-500 mx-1" size={12} /> for a
              better world
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// FAQ Item Component
const FaqItem: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <button
        className="flex justify-between items-center w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold text-gray-800">{question}</h3>
        <span className="text-green-600">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default NewLandingPage;
