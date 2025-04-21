// import React from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaHandHoldingHeart,
  FaLightbulb,
  FaChartLine,
  // FaGraduationCap,
  FaHandsHelping,
  FaGlobe,
  // FaHeart,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";

export default function AboutUs() {
  const teamMembers = [
    {
      id: "202352302",
      name: "ABHISHEK MISAL",
      role: "Team Member",
      image: "https://avatars.githubusercontent.com/u/1?v=4", // Placeholder image
    },
    {
      id: "202352310",
      name: "DHEERAJ",
      role: "Team Member",
      image: "https://avatars.githubusercontent.com/u/2?v=4",
    },
    {
      id: "202352316",
      name: "ISHU KUMAR",
      role: "Team Member",
      image: "https://avatars.githubusercontent.com/u/3?v=4",
    },
    {
      id: "202352325",
      name: "RAJAT DHOOT",
      role: "Team Member",
      image: "https://avatars.githubusercontent.com/u/4?v=4",
    },
    {
      id: "202352329",
      name: "SANGRAMJEET KUMAR",
      role: "Team Member",
      image: "https://avatars.githubusercontent.com/u/5?v=4",
    },
    {
      id: "202352332",
      name: "SHANTANU SANJAY SAWANT",
      role: "Team Member",
      image: "https://avatars.githubusercontent.com/u/6?v=4",
    },
    {
      id: "202352334",
      name: "SUDEEP GUPTA",
      role: "Team Member",
      image: "https://avatars.githubusercontent.com/u/7?v=4",
    },
    {
      id: "202352336",
      name: "VAGHASIYA HARSHIL GIRDHARBHAI",
      role: "Team Member",
      image: "https://avatars.githubusercontent.com/u/8?v=4",
    },
  ];

  const objectives = [
    {
      icon: <FaHandHoldingHeart className="text-3xl text-green-600" />,
      title: "Facilitate Easy Donations",
      description:
        "Create a seamless and secure platform for charitable giving",
    },
    {
      icon: <FaLightbulb className="text-3xl text-green-600" />,
      title: "Promote Transparency",
      description:
        "Ensure complete transparency in the donation process and fund allocation",
    },
    {
      icon: <FaUsers className="text-3xl text-green-600" />,
      title: "Build Community",
      description:
        "Connect donors directly with beneficiaries and create lasting relationships",
    },
    {
      icon: <FaChartLine className="text-3xl text-green-600" />,
      title: "Maximize Impact",
      description:
        "Optimize resource allocation to create the greatest possible impact",
    },
    {
      icon: <FaGlobe className="text-3xl text-green-600" />,
      title: "Global Reach",
      description: "Extend our platform's reach to help communities worldwide",
    },
    {
      icon: <FaHandsHelping className="text-3xl text-green-600" />,
      title: "Empower Change",
      description:
        "Enable individuals and organizations to make meaningful contributions",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-700 py-20 px-4">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center text-white">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About DonateSaathi
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Group 4 - Transforming lives through technology and compassion
          </motion.p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Mission
            </h2>
            <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              To create a transparent and efficient platform that connects
              donors with those in need, making the process of donation seamless
              and impactful while ensuring every contribution reaches its
              intended beneficiaries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Objectives
            </h2>
            <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {objective.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {objective.title}
                </h3>
                <p className="text-gray-600">{objective.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Team
            </h2>
            <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated individuals behind DonateSaathi who work
              tirelessly to make a difference in people's lives.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-48 bg-gradient-to-br from-green-400 to-green-600">
                  <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-20 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-4">ID: {member.id}</p>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="text-gray-400 hover:text-green-600 transition-colors"
                    >
                      <FaLinkedin size={20} />
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-green-600 transition-colors"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-green-600 transition-colors"
                    >
                      <FaEnvelope size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <section className="bg-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Join Us in Making a Difference
          </motion.h2>
          <motion.p
            className="text-xl text-green-100 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Together, we can create positive change and build a better future
            for all.
          </motion.p>
          <motion.button
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -3 }}
          >
            Get Involved
          </motion.button>
        </div>
      </section>
    </div>
  );
}
