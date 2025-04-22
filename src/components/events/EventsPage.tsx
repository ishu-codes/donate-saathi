import React from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaGraduationCap,
  FaUsers,
  FaLeaf,
  FaHandHoldingHeart,
} from "react-icons/fa";

// Sample event data
const events = [
  {
    id: 1,
    title: "Community Garden Planting Day",
    description:
      "Join us as we plant trees and flowers to beautify local community spaces and promote environmental sustainability.",
    image:
      "https://images.unsplash.com/photo-1552664688-cf412ec27db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "May 15, 2023",
    time: "9:00 AM - 2:00 PM",
    location: "Central Park, New Delhi",
    category: "Environmental Work",
    registeredCount: 56,
  },
  {
    id: 2,
    title: "Education Workshop for Children",
    description:
      "Volunteer to teach basic skills and engage in fun learning activities with children from underserved communities.",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "June 2, 2023",
    time: "10:00 AM - 1:00 PM",
    location: "Community Center, Mumbai",
    category: "Teach & Educate",
    registeredCount: 42,
  },
  {
    id: 3,
    title: "Elderly Support Program",
    description:
      "Spend time with elderly residents at local care homes, providing companionship and assistance with various activities.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "June 10, 2023",
    time: "2:00 PM - 5:00 PM",
    location: "Silver Living Care Home, Bangalore",
    category: "Direct Care",
    registeredCount: 28,
  },
  {
    id: 4,
    title: "Youth Mentorship Session",
    description:
      "Guide and inspire young adults through career counseling, skill development, and personal growth activities.",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "June 15, 2023",
    time: "4:00 PM - 6:30 PM",
    location: "Youth Development Center, Chennai",
    category: "Mentor Others",
    registeredCount: 35,
  },
  {
    id: 5,
    title: "Beach Cleanup Drive",
    description:
      "Join our effort to clean local beaches and raise awareness about plastic pollution and marine conservation.",
    image:
      "https://www.hrresolutions.com/wp-content/uploads/2017/06/volunteer.jpg",
    date: "June 24, 2023",
    time: "7:00 AM - 11:00 AM",
    location: "Juhu Beach, Mumbai",
    category: "Environmental Work",
    registeredCount: 64,
  },
  {
    id: 6,
    title: "Healthcare Awareness Camp",
    description:
      "Volunteer at our healthcare camp providing basic health checks and education on preventive healthcare.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "July 5, 2023",
    time: "9:00 AM - 4:00 PM",
    location: "Community Hall, Hyderabad",
    category: "Direct Care",
    registeredCount: 48,
  },
  {
    id: 7,
    title: "Coding Workshop for Teens",
    description:
      "Teach basic programming skills to teenagers and help them build their first web applications.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "July 12, 2023",
    time: "10:00 AM - 2:00 PM",
    location: "Tech Hub, Pune",
    category: "Teach & Educate",
    registeredCount: 30,
  },
  {
    id: 8,
    title: "Leadership Development Workshop",
    description:
      "Guide aspiring leaders through interactive sessions on leadership skills, team management, and effective communication.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "July 18, 2023",
    time: "1:00 PM - 5:00 PM",
    location: "Business Center, Gurugram",
    category: "Mentor Others",
    registeredCount: 25,
  },
  {
    id: 9,
    title: "Urban Farming Initiative",
    description:
      "Learn and participate in sustainable urban farming techniques to promote food security and environmental sustainability.",
    image:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "July 25, 2023",
    time: "9:00 AM - 1:00 PM",
    location: "Community Garden, Delhi",
    category: "Environmental Work",
    registeredCount: 38,
  },
  {
    id: 10,
    title: "Food Distribution Drive",
    description:
      "Help prepare and distribute meals to homeless and underprivileged communities in the city.",
    image:
      "https://childvikasfoundation.org/assets/images/food-distribution/2.jpg",
    date: "August 2, 2023",
    time: "7:00 AM - 12:00 PM",
    location: "Central Community Kitchen, Kolkata",
    category: "Direct Care",
    registeredCount: 52,
  },
  {
    id: 11,
    title: "Art Therapy Workshop",
    description:
      "Facilitate art activities for children with special needs to promote emotional expression and development.",
    image:
      "https://images.unsplash.com/photo-1607457561901-e6ec3a6d16cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "August 8, 2023",
    time: "3:00 PM - 5:30 PM",
    location: "Creative Space, Jaipur",
    category: "Teach & Educate",
    registeredCount: 22,
  },
  {
    id: 12,
    title: "Career Guidance Session",
    description:
      "Share your professional expertise with students and young professionals seeking career advice and guidance.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "August 15, 2023",
    time: "11:00 AM - 2:00 PM",
    location: "University Campus, Ahmedabad",
    category: "Mentor Others",
    registeredCount: 40,
  },
];

const categories = [
  {
    title: "Teach & Educate",
    description: "Share your knowledge with those eager to learn and grow",
    icon: <FaGraduationCap className="h-10 w-10 text-white" />,
    color: "bg-blue-500",
  },
  {
    title: "Mentor Others",
    description: "Guide and support others on their development journey",
    icon: <FaUsers className="h-10 w-10 text-white" />,
    color: "bg-yellow-500",
  },
  {
    title: "Environmental Work",
    description:
      "Contribute to projects that protect and restore our environment",
    icon: <FaLeaf className="h-10 w-10 text-white" />,
    color: "bg-green-500",
  },
  {
    title: "Direct Care",
    description: "Provide assistance and support to those in immediate need",
    icon: <FaHandHoldingHeart className="h-10 w-10 text-white" />,
    color: "bg-red-500",
  },
];

const EventsPage: React.FC = () => {
  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 to-green-700 py-20 px-6 md:px-10 lg:px-20">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -left-24 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Volunteer Events
            </h1>
            <p className="text-green-100 max-w-2xl mx-auto text-lg mb-8">
              Find opportunities to make a difference in your community through
              our organized events. Join fellow volunteers and contribute to
              meaningful causes.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Volunteer Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100"
              >
                <div
                  className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mb-4`}
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <a
                  href={`#${category.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-flex items-center text-green-600 font-medium hover:text-green-700"
                >
                  View Events <FaArrowRight className="ml-2 text-sm" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Listing */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Upcoming Events
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                    {event.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="flex flex-col gap-2 mb-5">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <FaCalendarAlt className="text-green-500" />
                      <span>
                        {event.date} • {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <FaMapMarkerAlt className="text-green-500" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {event.registeredCount} registered
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                    >
                      Register Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-green-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 -right-10 w-40 h-40 bg-green-100 rounded-full opacity-50"></div>
            <div className="absolute bottom-0 -left-10 w-40 h-40 bg-green-100 rounded-full opacity-50"></div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4 relative z-10">
              Want to Host Your Own Event?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto relative z-10">
              If you're an NGO or organization looking to host an event on our
              platform, we'd love to partner with you to amplify your impact.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors relative z-10"
            >
              Contact Us About Hosting
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
