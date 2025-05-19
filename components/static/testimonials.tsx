import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { useLanguage } from "@/context/languageContext";
import Image from "next/image";

const Testimonials = () => {
  const { t, isRTL } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Get testimonials with translations
  const testimonials = [
    {
      id: 1,
      name: t("testimonials.1.name"),
      role: t("testimonials.1.role"),
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      content: t("testimonials.1.content"),
      rating: 5,
    },
    {
      id: 2,
      name: t("testimonials.2.name"),
      role: t("testimonials.2.role"),
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      content: t("testimonials.2.content"),
      rating: 5,
    },
    {
      id: 3,
      name: t("testimonials.3.name"),
      role: t("testimonials.3.role"),
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      content: t("testimonials.3.content"),
      rating: 4,
    },
    {
      id: 4,
      name: t("testimonials.4.name"),
      role: t("testimonials.4.role"),
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      content: t("testimonials.4.content"),
      rating: 5,
    },
    {
      id: 5,
      name: t("testimonials.5.name"),
      role: t("testimonials.5.role"),
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      content: t("testimonials.5.content"),
      rating: 5,
    },
  ];

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const handleNext = () => {
    setAutoplay(false);
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setAutoplay(false);
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleDotClick = (index: number) => {
    setAutoplay(false);
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // Adjust variants for RTL support
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? (isRTL ? -1000 : 1000) : isRTL ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? (isRTL ? 1000 : -1000) : isRTL ? -1000 : 1000,
      opacity: 0,
    }),
  };

  const currentTestimonial = testimonials[activeIndex];

  if (!isMounted) {
    // Return a simple loading state or placeholder
    return (
      <div className="py-20 bg-gradient-to-b from-white to-indigo-50"></div>
    );
  }

  return (
    <section
      id="testimonials"
      className={`py-20 bg-gradient-to-b from-white to-indigo-50`}
      dir={`${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("testimonials.title")}
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-indigo-600 mx-auto mb-6"
          />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="w-full"
              >
                <div className="bg-white rounded-xl p-8 md:p-10 shadow-xl">
                  <div
                    className={`flex flex-col md:flex-row items-center gap-6 mb-6 ${
                      isRTL ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <div
                        className={`absolute inset-0 bg-indigo-100 rounded-full blur-md transform ${
                          isRTL ? "-translate-x-1" : "translate-x-1"
                        } translate-y-1`}
                      ></div>
                      <Image
                        width={100}
                        height={100}
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white shadow-lg relative z-10"
                      />
                    </motion.div>

                    <div
                      className={`text-center ${
                        isRTL ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <h4 className="text-xl font-bold text-gray-900">
                        {currentTestimonial.name}
                      </h4>
                      <p className="text-indigo-600 font-medium">
                        {currentTestimonial.role}
                      </p>
                      <div
                        className={`flex justify-center ${
                          isRTL ? "md:justify-end" : "md:justify-start"
                        } mt-2`}
                      >
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`${
                              i < currentTestimonial.rating
                                ? "text-yellow-400"
                                : "text-gray-200"
                            } w-5 h-5`}
                          />
                        ))}
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, rotate: -10 }}
                      animate={{ opacity: 0.15, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className={`hidden md:block ${
                        isRTL ? "mr-auto" : "ml-auto"
                      }`}
                    >
                      <FaQuoteLeft className="text-5xl text-indigo-300" />
                    </motion.div>
                  </div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={`text-gray-700 text-lg leading-relaxed text-center ${
                      isRTL ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    {currentTestimonial.content}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-indigo-600 w-6"
                    : "bg-gray-300 hover:bg-indigo-400"
                }`}
                aria-label={t(`testimonials.aria.dot.${index + 1}`)}
              />
            ))}
          </div>

          <motion.button
            onClick={handlePrev}
            className={`absolute top-1/2 ${
              isRTL ? "-right-4 md:-right-12" : "-left-4 md:-left-12"
            } transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors z-10`}
            aria-label={t("testimonials.aria.previous")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          <motion.button
            onClick={handleNext}
            className={`absolute top-1/2 ${
              isRTL ? "-left-4 md:-left-12" : "-right-4 md:-right-12"
            } transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors z-10`}
            aria-label={t("testimonials.aria.next")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
