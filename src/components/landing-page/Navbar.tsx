import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
// import Login from "../Login/Login";
//
// interface NavbarProps {}

const NAVS = [
  { title: "Discover NGOs", url: "discover-ngos", isDropdown: false },
  { title: "Find Donations", url: "find-donations", isDropdown: false },
  { title: "About us", url: "about-us", isDropdown: false },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  //   const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              {/* <img className="h-8 w-auto" src="/logo.png" alt="DonateSaathi" /> */}
              <span className="text-xl font-bold text-gray-800">
                DonateSaathi
              </span>
            </div>

            {/* Navigation Links */}

            {/* Buttons */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-8 mr-8">
                {/* <div className="relative group"> */}
                {NAVS.map((nav, idx) => (
                  <a
                    key={idx}
                    href={nav.url}
                    className="flex items-center text-gray-700 hover:text-gray-900"
                  >
                    {nav.title}
                    {nav.isDropdown && (
                      <FaChevronDown className="ml-1 h-3 w-3" />
                    )}
                  </a>
                ))}
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Donate Money
              </button>
              <Link
                to={"/login"}
                className="bg-transparent border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} /> */}
    </>
  );
}
