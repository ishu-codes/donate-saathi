import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNgos } from "@/hooks/db";
import { NGOsInterface } from "@/interface";

export function Discover() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNGOs, setFilteredNGOs] = useState<NGOsInterface[]>([]);
  const [categories, setCategories] = useState<string[]>();

  const { data: ngos, isLoading, error } = useNgos();

  useEffect(() => {
    let cates: string[] = [];
    const newNGOS = ngos?.filter((ngo) => {
      cates = cates.concat(ngo.tags);
      const matchesCategory = selectedCategory
        ? ngo.tags.includes(selectedCategory)
        : true;
      const matchesSearch =
        ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ngo.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    console.log(cates);
    setFilteredNGOs(newNGOS ?? []);
    setCategories(Array.from(new Set(cates)) ?? []);
  }, [selectedCategory, ngos, searchTerm]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Discover NGOs
        </h1>

        <div className="mb-8 space-y-4">
          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <motion.input
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              type="text"
              placeholder="Search NGOs..."
              className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-wrap gap-2"
            >
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm ${
                  !selectedCategory
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All
              </button>
              {categories?.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category.replace("-", " ").toUpperCase()}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredNGOs?.map((ngo, index) => (
            <motion.div
              key={ngo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                {ngo.name}
              </h2>
              <p className="text-gray-600 mb-4">{ngo.description}</p>
              <div className="space-y-2 text-sm text-gray-500">
                <p className="flex items-center gap-2">
                  <span className="text-purple-500">📍</span> {ngo.location}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-purple-500">📧</span> {ngo.email}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-purple-500">📞</span> {ngo.phone}
                </p>
                {ngo.website && (
                  <a
                    href={`https://${ngo.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    <span>🌐</span> {ngo.website}
                  </a>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {ngo.tags.map((cat) => (
                  <span
                    key={cat}
                    className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs"
                  >
                    {cat.replace("-", " ")}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
