import { motion, AnimatePresence } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/languageContext";

const Hero = () => {
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Initialize component
  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Get translated text from translations
  const titleText = t("hero.title");
  const subtitleText = t("hero.subtitle");

  // Website builder elements - simplified
  const builderElements = [
    { type: "header", color: "#F9FAFB" },
    { type: "text", color: "#E5E7EB" },
    { type: "image", color: "#D1D5DB" },
    { type: "button", color: "#9CA3AF" },
    { type: "section", color: "#6B7280" },
    { type: "footer", color: "#4B5563" },
  ];

  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center overflow-hidden font-vazir"
      style={{
        background:
          "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 60,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Floating UI elements */}
        {builderElements.map((element, i) => (
          <motion.div
            key={i}
            className="absolute rounded-lg backdrop-blur-md border border-white/20"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 80 + 40,
              backgroundColor: `${element.color}20`,
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              zIndex: 10 - i,
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 0.6,
              y: 0,
              rotate: Math.random() * 5 - 2.5,
            }}
            transition={{
              duration: 1,
              delay: i * 0.2,
            }}
            whileHover={{
              scale: 1.05,
              opacity: 0.8,
              boxShadow: "0 0 20px rgba(255,255,255,0.2)",
            }}
          >
            <div className="h-3 w-20 bg-white/30 rounded-full absolute top-3 left-3" />
            {element.type === "image" && (
              <motion.div
                className="absolute inset-0 m-3 rounded bg-gradient-to-br from-white/20 to-white/5"
                animate={{
                  background: [
                    "linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
                    "linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0.15))",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            )}
            {element.type === "button" && (
              <motion.div
                className="absolute bottom-3 left-3 h-6 w-24 rounded-full bg-white/30"
                animate={{ width: [80, 100, 80] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            )}
            {element.type === "text" && (
              <>
                <motion.div
                  className="absolute top-10 left-3 h-2 w-32 rounded-full bg-white/30"
                  animate={{ width: [120, 80, 120] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-16 left-3 h-2 w-24 rounded-full bg-white/30"
                  animate={{ width: [80, 100, 80] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                />
              </>
            )}
          </motion.div>
        ))}

        {/* Floating particles */}
        {isMounted &&
          [...Array(15)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
              }}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * -300 - 50],
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0.5],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
      </div>

      {/* 3D animated shapes in the background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -bottom-[40%] left-[50%] w-[800px] h-[800px] rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: ["-50%", "-48%", "-52%", "-50%"],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -top-[30%] right-[30%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-pink-600/20 to-purple-600/20 backdrop-blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, -20, 0],
            y: [0, -20, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 5,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <motion.h1 className="text-3xl md:text-6xl font-bold text-white mt-24 mb-6 overflow-hidden">
                {titleText}
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {subtitleText}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(255,255,255,0.5)",
              backgroundColor: "#ffffff",
              color: "#4F46E5",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-black/60 font-bold rounded-full shadow-lg transition-all duration-300 relative overflow-hidden group"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            {t("hero.cta.primary")}
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(255,255,255,0.3)",
              borderColor: "#ffffff",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full transition-all duration-300 relative overflow-hidden group"
          >
            <motion.span
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              initial={{ scale: 0, borderRadius: "100%" }}
              whileHover={{ scale: 1.5, borderRadius: "100%" }}
              transition={{ duration: 0.6 }}
              style={{ originX: 0.5, originY: 0.5 }}
            />
            {t("hero.cta.secondary")}
          </motion.button>
        </motion.div>

        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <motion.a
            href="#features"
            className="inline-block text-white hover:text-yellow-300 transition-colors duration-300 relative"
          >
            <motion.div className="absolute -inset-3 rounded-full bg-white/10 backdrop-blur-sm z-0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              className="relative z-10"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaArrowDown className="h-8 w-8" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
