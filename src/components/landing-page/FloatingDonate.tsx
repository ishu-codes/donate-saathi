import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const FloatingDonate = () => {
  return (
    <Link
      to="/new-donation"
      className="fixed bottom-8 right-8 flex items-center gap-2 px-8 py-4 bg-green-600 text-white border-none rounded-full font-semibold cursor-pointer shadow-lg shadow-red-600/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-600/60 hover:bg-green-700 z-100 md:bottom-4 md:right-4 md:px-6 md:py-3"
    >
      <FaHeart className="text-lg animate-pulse" />
      <span>Donate Now</span>
    </Link>
  );
};

export default FloatingDonate;
