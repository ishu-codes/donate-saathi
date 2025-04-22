import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const FloatingDonate = () => {
  return (
    <Link
      to="/new-donation"
      className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 flex items-center gap-2 px-4 py-3 sm:px-8 sm:py-4 bg-green-600 text-white border-none rounded-full font-semibold cursor-pointer shadow-lg shadow-green-600/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-600/60 hover:bg-green-700 z-50"
    >
      <FaHeart className="text-lg animate-pulse" />
      <span className="text-sm sm:text-base">Donate Now</span>
    </Link>
  );
};

export default FloatingDonate;
