// import React from "react";
import { motion } from "framer-motion";
import {
  //   FaHandHoldingHeart,
  //   FaUsers,
  //   FaDonate,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaQuoteLeft,
  FaArrowRight,
  FaRegClock,
  FaUser,
  //   FaSearch,
  FaStar,
} from "react-icons/fa";
import Slider from "./Slider";

import { TESTIMONIALS, categories, steps, partners } from "./data";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden pt-20">
      <Slider />

      {/* Categories Section */}
      <section className="py-16 px-8 bg-gradient-to-b from-slate-50 to-white">
        <h2 className="text-4xl font-bold text-slate-800 text-center mb-12 relative inline-block left-1/2 -translate-x-1/2 after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-transparent after:via-red-600 after:to-transparent">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto p-4">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer min-h-[220px] flex flex-col justify-end bg-cover bg-center group"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/campaign-bg.jpg')`,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative z-10 p-10 text-white">
                <span className="text-sm italic text-white/90 mb-4 inline-block border-b border-white/30 pb-0.5">
                  {category.mission}
                </span>
                <h3 className="text-3xl font-bold mb-4 text-white leading-tight shadow-text">
                  {category.name}
                </h3>
                <p className="text-lg text-white/95 mb-3 leading-relaxed">
                  {category.count}
                </p>
                <p className="text-base text-white/85">{category.donations}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-20 px-8 bg-slate-50">
        <h2 className="text-4xl text-center mb-12 text-slate-800 font-bold">
          Featured Campaigns
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[1, 2, 3].map((campaign) => (
            <motion.div
              key={campaign}
              className="bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -10 }}
            >
              <div className="h-48 bg-slate-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-slate-800">
                  Help Children Get Education
                </h3>
                <p className="text-slate-600 mb-6">
                  Support underprivileged children with quality education and
                  learning materials.
                </p>
                <div className="mb-6">
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-red-600 rounded-full"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-slate-500">
                    <span>₹75,000 raised</span>
                    <span>of ₹100,000</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center text-slate-500 text-sm">
                    <FaRegClock className="mr-2" /> 15 days left
                  </span>
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                    Donate Now <FaArrowRight />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-8 bg-slate-50 text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800 group-hover:text-red-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-8 bg-slate-50">
        <h2 className="text-4xl font-bold text-slate-800 text-center mb-12">
          What People Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-slate-50 p-10 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FaQuoteLeft className="text-red-600/20 text-4xl mb-6" />
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                  {/* <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  /> */}
                  <FaUser size={30} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">
                    {testimonial.author}
                  </h4>
                  <span className="text-slate-500 text-sm">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NGO Partners */}
      <section className="py-20 px-8 bg-white text-center overflow-hidden">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">
          Our trusted NGO partners
        </h2>
        <p className="text-lg text-slate-600 mb-12">
          We have been raising funds for credible nonprofits for 20+ years
        </p>
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex flex-nowrap">
                {partners.map((partner, index) => (
                  <div
                    key={`${setIndex}-${index}`}
                    className="flex-none w-[180px] h-[120px] mx-3 relative group"
                  >
                    <div className="absolute inset-0 border-2 border-slate-200 rounded-2xl bg-white transition-all duration-300 group-hover:border-red-600 group-hover:shadow-lg group-hover:scale-105" />
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-auto max-h-[70px] max-w-[140px] object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 z-10"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-50 pt-16 pb-4">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">DonateSaathi</h3>
              <p className="text-slate-300 mb-6">
                Making a difference in lives through the power of giving.
              </p>
              <div className="flex gap-4">
                {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="text-slate-300 hover:text-blue-500 transition-colors"
                      aria-label={`Social link ${i + 1}`}
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
                  "How It Works",
                  "Campaigns",
                  "Success Stories",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                {[
                  "Contact Us",
                  "FAQ",
                  "Privacy Policy",
                  "Terms of Service",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
              <p className="text-slate-300 mb-4">
                Subscribe to our newsletter for updates
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-slate-800">
            <p className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} DonateSaathi. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
