import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { slides } from "./data";

// interface Slide {
//   id: number;
//   url: string;
//   alt: string;
// }

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const getSlideClassName = (index: number) => {
    const baseClasses =
      "absolute top-0 left-0 w-full h-full opacity-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] scale-75 bg-white p-0 shadow-none rounded-[25px] overflow-hidden";

    if (index === currentSlide) {
      return `${baseClasses} opacity-100 scale-95 z-20`;
    }
    if (index === (currentSlide - 1 + slides.length) % slides.length) {
      return `${baseClasses} -translate-x-[95%] scale-85 opacity-70 z-10`;
    }
    if (index === (currentSlide + 1) % slides.length) {
      return `${baseClasses} translate-x-[95%] scale-85 opacity-70 z-10`;
    }
    return baseClasses;
  };

  return (
    <div className="relative w-[65%] h-[calc(50vh-4rem)] overflow-visible mx-auto my-[94px_auto_40px] rounded-[25px] md:w-[75%] sm:w-[90%] sm:h-[50vh] sm:overflow-hidden sm:my-[94px_auto_30px] sm:rounded-[20px] xs:my-[84px_auto_30px]">
      <div className="relative w-full h-full overflow-visible sm:overflow-hidden">
        {slides.map((slide, index) => (
          <div key={slide.id} className={getSlideClassName(index)}>
            <img
              src={slide.url}
              alt={slide.alt}
              className="w-full h-full object-cover rounded-[25px] bg-white sm:rounded-[20px]"
            />
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          className="absolute top-1/2 -translate-y-1/2 -left-[70px] bg-white text-red-600 border-none w-10 h-10 rounded-full cursor-pointer z-10 text-lg flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] sm:w-9 sm:h-9 sm:text-base sm:left-2.5"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <FaChevronLeft />
        </button>
        <button
          className="absolute top-1/2 -translate-y-1/2 -right-[70px] bg-white text-red-600 border-none w-10 h-10 rounded-full cursor-pointer z-10 text-lg flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] sm:w-9 sm:h-9 sm:text-base sm:right-2.5"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute -bottom-[25px] left-1/2 -translate-x-1/2 flex gap-3.5 py-2 px-4 bg-white rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] border-2 border-black/20 sm:py-1.5 sm:px-3 sm:border-[1.5px]">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full bg-gray-200 border-2 border-red-600 cursor-pointer transition-all duration-300 p-0 hover:bg-red-600 hover:scale-110 sm:w-2 sm:h-2 sm:border-[1.5px] ${
              index === currentSlide
                ? "bg-red-600 scale-120 border-red-600"
                : ""
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
