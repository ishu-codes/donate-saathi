import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { FaSeedling } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { Menu, X } from "lucide-react";

const NAVS = [
  { title: "Home", url: "/", isDropdown: false },
  { title: "Discover NGOs", url: "/discover-ngos", isDropdown: false },
  {
    title: "Donation Campaigns",
    url: "/donation-campaigns",
    isDropdown: false,
  },
  { title: "Events", url: "/events", isDropdown: false },
  { title: "Find Donations", url: "/find-donations", isDropdown: false },
  { title: "About us", url: "/about-us", isDropdown: false },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full ${
          location.pathname === "/" ? "" : "bg-background"
        } z-50 transition-all duration-300 ${
          isScrolled ? "bg-background shadow-md" : ""
        }`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-20">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              {/* <img className="h-8 w-auto" src="/logo.png" alt="DonateSaathi" /> */}

              <FaSeedling className="text-2xl sm:text-3xl text-green-600" />
              <span className="text-xl sm:text-3xl font-bold text-green-600">
                DonateSaathi
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 mr-8">
              {NAVS.map((nav, idx) => (
                <Link
                  key={idx}
                  to={nav.url}
                  className={`flex items-center ${
                    location.pathname === nav.url
                      ? "text-green-600"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {nav.title}
                  {nav.isDropdown && <FaChevronDown className="ml-1 h-3 w-3" />}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-700 p-2 -mr-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Authentication Button */}
              <div className="hidden sm:block">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {NAVS.map((nav, idx) => (
                <Link
                  key={idx}
                  to={nav.url}
                  className={`block py-3 ${
                    location.pathname === nav.url
                      ? "text-green-600"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {nav.title}
                </Link>
              ))}
              <div className="py-3">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="block w-full text-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="block w-full text-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} /> */}
    </>
  );
}
