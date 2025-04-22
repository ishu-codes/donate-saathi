import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaSearch,
  FaSortAmountDown,
  FaChevronDown,
  FaChevronUp,
  FaTruck,
  FaHandHoldingHeart,
  FaPlus,
} from "react-icons/fa";
import { useFindDonations } from "@/hooks/db";
import { RequestDonationDialog } from "./RequestDonationDialog";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Core Type Definitions
interface DonationTag {
  id: number | string;
  name: string;
}

interface DonationDonor {
  id: string | number;
  email: string;
  created_at: string;
}

interface DonationImage {
  id: number | string;
  url?: string;
  media_url?: string;
  media_type?: string;
}

// Database representation of a donation from the API
interface ApiDonationItem {
  id: number | string;
  title: string;
  description: string;
  quantity: number;
  unit: string;
  location: string;
  created_at: string;
  status: string;
  donor_id?: string | number;
  tag?:
    | { id: number | string; name: string }
    | { id: number | string; name: string }[];
  donation_images: {
    id: number | string;
    media_url?: string;
    media_type?: string;
  }[];
  type?: number | string;
  user_profiles?: { location: string };
  user?: {
    id: string | number;
    email: string;
    name?: string;
    username?: string;
  };
}

// Normalized donation structure used in the component
interface Donation {
  id: number;
  title: string;
  description: string;
  quantity: number;
  unit: string;
  location: string;
  created_at: string;
  status: string;
  donation_id?: number;
  // In our component we always handle tag as an array for consistency
  tag: DonationTag[];
  donor?: DonationDonor;
  donor_id?: string | number;
  donation_images: DonationImage[];
}

const FindDonations: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOpen, setSortOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("Most Recent");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [locationOpen, setLocationOpen] = useState<boolean>(false);

  // Request dialog state
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const navigate = useNavigate();
  const {
    data: apiDonations,
    isLoading,
    error: fetchError,
  } = useFindDonations();
  const { user } = useAuth();
  console.log("Raw donations data:", apiDonations);
  console.log("Current user:", user);

  // Function to normalize donations from API
  const normalizeDonations = (
    apiData: ApiDonationItem[] | undefined
  ): Donation[] => {
    if (!apiData) return [];

    return apiData.map((donation) => ({
      id:
        typeof donation.id === "string"
          ? parseInt(donation.id, 10)
          : (donation.id as number),
      title: donation.title,
      description: donation.description,
      quantity: donation.quantity || 0,
      unit: donation.unit || "",
      location: donation.location || "",
      created_at: donation.created_at,
      status: donation.status || "AVAILABLE",
      donation_id: undefined,
      tag: donation.tag
        ? Array.isArray(donation.tag)
          ? donation.tag.map((t) => ({
              id: typeof t.id === "string" ? parseInt(t.id, 10) : t.id,
              name: t.name,
            }))
          : [
              {
                id:
                  typeof donation.tag.id === "string"
                    ? parseInt(donation.tag.id, 10)
                    : donation.tag.id,
                name: donation.tag.name,
              },
            ]
        : donation.type !== undefined
        ? [
            {
              id:
                typeof donation.type === "string"
                  ? parseInt(donation.type, 10)
                  : donation.type,
              name: getTagNameById(
                typeof donation.type === "string"
                  ? parseInt(donation.type, 10)
                  : (donation.type as number)
              ),
            },
          ]
        : [],
      donor_id: donation.donor_id,
      donation_images: donation.donation_images.map((img) => ({
        id: img.id,
        media_url: img.media_url,
        media_type: img.media_type,
      })),
    }));
  };

  // Normalize donations for use in the component
  const donations = normalizeDonations(apiDonations);

  const handleRequestItem = (donation: Donation) => {
    if (!user) {
      toast.error("Authentication required", {
        description: "Please login to request donations.",
      });
      return;
    }

    setSelectedDonation({
      id: donation.id,
      title: donation.title,
    });
    setIsRequestDialogOpen(true);
  };

  const handleCreateDonation = () => {
    if (!user) {
      toast.error("Authentication required", {
        description: "Please login to offer donations.",
      });
      return;
    }

    navigate("/new-donation");
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Extract unique categories from donations
  const categories = ["All"];
  if (donations.length > 0) {
    const uniqueCategories = new Set<string>();
    donations.forEach((donation) => {
      if (donation.tag.length > 0) {
        donation.tag.forEach((tag) => {
          if (tag.name) uniqueCategories.add(tag.name);
        });
      }
    });
    categories.push(...Array.from(uniqueCategories));
  }

  // Helper function to get tag name by ID
  function getTagNameById(tagId: number): string {
    const tagMap: Record<number, string> = {
      1: "Food",
      2: "Clothes",
      3: "Medicine",
      4: "Books",
      5: "Funds",
      6: "Other",
    };
    return tagMap[tagId] || "Other";
  }

  // Extract unique locations from donations
  const locations = ["All Locations"];
  if (donations.length > 0) {
    const uniqueLocations = new Set<string>();
    donations.forEach((donation) => {
      if (donation.location) {
        uniqueLocations.add(donation.location);
      }
    });
    locations.push(...Array.from(uniqueLocations));
  }

  // Filter donations based on search, category, and location
  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = searchQuery
      ? donation.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donation.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Check if donation matches selected category
    const matchesCategory =
      activeFilter === "All" ||
      donation.tag.some((tag) => tag.name === activeFilter);

    // Check if donation matches selected location
    const matchesLocation =
      locationFilter === "" ||
      locationFilter === "All Locations" ||
      donation.location === locationFilter;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  // When rendering donation images
  const getImageUrl = (image: DonationImage) => {
    return image.url || image.media_url || "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 py-24 px-6 md:px-10 lg:px-20">
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
            Find Available Donations
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Browse available donations from our generous community members. All
            items are ready for distribution to those in need.
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
                placeholder="Search donations..."
                className="w-full py-3 px-5 pl-12 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
            </div>

            <div className="relative mr-2">
              <button
                onClick={() => {
                  setSortOpen(!sortOpen);
                  setLocationOpen(false);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              >
                <FaSortAmountDown />
                <span>Sort: {sortBy}</span>
                {sortOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {sortOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 overflow-hidden">
                  {["Most Recent", "Oldest First", "A-Z", "Z-A"].map(
                    (option, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSortBy(option);
                          setSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                          sortBy === option
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700"
                        }`}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setLocationOpen(!locationOpen);
                  setSortOpen(false);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              >
                <FaMapMarkerAlt />
                <span>{locationFilter || "All Locations"}</span>
                {locationOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {locationOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 overflow-hidden max-h-60 overflow-y-auto">
                  {locations.map((location, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setLocationFilter(
                          location === "All Locations" ? "" : location
                        );
                        setLocationOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        (location === "All Locations" &&
                          locationFilter === "") ||
                        locationFilter === location
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {location}
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
                    ? "bg-white text-blue-600"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Donations Grid Section */}
      <section className="py-16 px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeFilter === "All"
                ? "All Donations"
                : activeFilter + " Donations"}
              <span className="ml-2 text-lg font-normal text-gray-500">
                ({filteredDonations?.length})
              </span>
            </h2>

            <Button
              onClick={handleCreateDonation}
              className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              <FaPlus size={14} />
              <span>Offer Donation</span>
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-16">
              <h3 className="text-xl text-gray-600 mb-4">
                Loading donations...
              </h3>
            </div>
          ) : fetchError ? (
            <div className="text-center py-16">
              <h3 className="text-xl text-gray-600 mb-4">
                Error loading donations
              </h3>
              <p className="text-gray-500 mb-6">
                {fetchError.message || "An unknown error occurred"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : filteredDonations?.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl text-gray-600 mb-4">No donations found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("All");
                  setLocationFilter("");
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDonations
                ?.map((donation: Donation) => {
                  // Skip if essential properties are missing
                  if (!donation.title || !donation.description) {
                    console.warn(
                      "Skipping donation with missing data:",
                      donation
                    );
                    return null;
                  }

                  return (
                    <motion.div
                      key={donation.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                    >
                      <div className="relative h-56 overflow-hidden">
                        {donation.donation_images &&
                        donation.donation_images.length > 0 ? (
                          <img
                            src={getImageUrl(donation.donation_images[0])}
                            alt={donation.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">
                              No image available
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-4 py-1.5 rounded-full text-white text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-blue-700">
                            {donation.tag && donation.tag.length > 0
                              ? donation.tag[0].name
                              : "Miscellaneous"}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-between items-center z-10">
                          <span className="text-white text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                            <FaMapMarkerAlt size={12} />{" "}
                            {donation.location || "No location"}
                          </span>
                          <span className="text-white text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                            <FaCalendarAlt size={12} /> Posted{" "}
                            {formatDate(donation.created_at)}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                          {donation.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Offered by{" "}
                          {donation.donor?.email?.split("@")[0] || "Anonymous"}
                        </p>
                        <p className="text-gray-600 mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                          {donation.description}
                        </p>

                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <FaBoxOpen className="text-blue-500" />
                            <span>
                              Quantity:{" "}
                              <strong>
                                {donation.quantity} {donation.unit}
                              </strong>
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <motion.button
                            className="flex items-center gap-2 px-4 py-2 text-white rounded-md shadow-sm transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg transform hover:-translate-y-1"
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleRequestItem(donation)}
                          >
                            Request Item <FaArrowRight size={12} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
                .filter(Boolean)}
            </div>
          )}

          {filteredDonations && filteredDonations?.length > 0 && (
            <div className="text-center mt-16">
              <motion.button
                className="relative overflow-hidden px-10 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-md hover:text-white transition-colors duration-500 group"
                whileHover={{ boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Load More Donations</span>
                <span className="absolute inset-0 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* Donation Process Section */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to find and request donations. Follow
              these simple steps to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaSearch className="text-3xl text-blue-600" />,
                title: "Find Donations",
                description:
                  "Browse through available donations and find items that match your needs or the needs of those you're helping.",
              },
              {
                icon: <FaHandHoldingHeart className="text-3xl text-blue-600" />,
                title: "Request Items",
                description:
                  "Submit a request for the items you need, providing information about who will benefit from these donations.",
              },
              {
                icon: <FaTruck className="text-3xl text-blue-600" />,
                title: "Coordinate Pickup",
                description:
                  "Once approved, coordinate with the donor for pickup or delivery of the items to those in need.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Request Dialog */}
      {selectedDonation && (
        <RequestDonationDialog
          isOpen={isRequestDialogOpen}
          onClose={() => setIsRequestDialogOpen(false)}
          donationId={selectedDonation.id}
          donationTitle={selectedDonation.title}
        />
      )}
    </div>
  );
};

export default FindDonations;
