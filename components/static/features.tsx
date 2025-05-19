import { useLanguage } from "@/context/languageContext";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FaRocket,
  FaPalette,
  FaMobileAlt,
  FaSearch,
  FaChartLine,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

// Define feature list with translations
const getFeaturesList = (t: (key: string) => string) => [
  {
    icon: <FaRocket />,
    title: t("features.speed.title"),
    description: t("features.speed.description"),
    color: "from-blue-500 to-indigo-600",
    shadowColor: "rgba(79, 70, 229, 0.3)",
    delay: 0,
  },
  {
    icon: <FaPalette />,
    title: t("features.design.title"),
    description: t("features.design.description"),
    color: "from-purple-500 to-indigo-600",
    shadowColor: "rgba(139, 92, 246, 0.3)",
    delay: 0.1,
  },
  {
    icon: <FaMobileAlt />,
    title: t("features.responsive.title"),
    description: t("features.responsive.description"),
    color: "from-pink-500 to-purple-600",
    shadowColor: "rgba(217, 70, 239, 0.3)",
    delay: 0.2,
  },
  {
    icon: <FaSearch />,
    title: t("features.seo.title"),
    description: t("features.seo.description"),
    color: "from-orange-500 to-pink-600",
    shadowColor: "rgba(244, 63, 94, 0.3)",
    delay: 0.3,
  },
  {
    icon: <FaChartLine />,
    title: t("features.analytics.title"),
    description: t("features.analytics.description"),
    color: "from-green-500 to-teal-600",
    shadowColor: "rgba(16, 185, 129, 0.3)",
    delay: 0.4,
  },
  {
    icon: <FaShieldAlt />,
    title: t("features.security.title"),
    description: t("features.security.description"),
    color: "from-red-500 to-orange-600",
    shadowColor: "rgba(249, 115, 22, 0.3)",
    delay: 0.5,
  },
];

const Features = () => {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);
  console.log(isMounted)

  // Get translated features list
  const featuresList = getFeaturesList(t);

  // Add useEffect to handle window dimensions
  useEffect(() => {
    setIsMounted(true);
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Background animation
  const bgPatternRef = useRef(null);
  const { scrollYProgress: bgScrollProgress } = useScroll({
    target: bgPatternRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(bgScrollProgress, [0, 1], [0, -200]);
  const bgScale = useTransform(bgScrollProgress, [0, 0.5, 1], [1, 1.1, 1]);
  const bgRotate = useTransform(bgScrollProgress, [0, 1], [0, 5]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-24 relative overflow-hidden font-vazir"
    >
      {/* Animated background pattern */}
      <motion.div
        ref={bgPatternRef}
        className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"
        style={{ y: bgY, scale: bgScale, rotate: bgRotate }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(79, 70, 229, 0.07) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Gradient overlay */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-50/50 to-white/30 opacity-70"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Floating gradient blobs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              width: Math.random() * 400 + 200,
              height: Math.random() * 400 + 200,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                i % 2 === 0
                  ? "rgba(79, 70, 229, 0.1) 0%, rgba(79, 70, 229, 0.05) 50%, transparent 70%"
                  : "rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 70%"
              })`,
              filter: "blur(60px)",
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              scale: [1, Math.random() * 0.2 + 0.9, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="text-center mb-20" style={{ y, opacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {t("features.title")}
            </motion.h2>
            <motion.div
              className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto my-6 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={
                isInView ? { width: 96, opacity: 1 } : { width: 0, opacity: 0 }
              }
              transition={{ duration: 0.7, delay: 0.4 }}
            />
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              {t("features.subtitle")}
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.215, 0.61, 0.355, 1],
                    delay: feature.delay,
                  },
                },
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Glass neumorphism card */}
              <motion.div
                className="h-full rounded-2xl p-8 relative overflow-hidden z-10"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(10px)",
                  boxShadow:
                    hoveredIndex === index
                      ? `0 20px 40px -10px ${feature.shadowColor}, 
                       inset 0 0 0 1px rgba(255, 255, 255, 0.5), 
                       inset 0 0 20px rgba(255, 255, 255, 0.2)`
                      : `0 10px 30px -15px rgba(0, 0, 0, 0.1), 
                       inset 0 0 0 1px rgba(255, 255, 255, 0.5), 
                       inset 0 0 0 0 rgba(255, 255, 255, 0)`,
                }}
                transition={{ duration: 0.4 }}
              >
                {/* Gradient background that appears on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 rounded-2xl`}
                  animate={{ opacity: hoveredIndex === index ? 0.03 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Animated icon container with glass effect */}
                <motion.div
                  className={`relative mb-6 p-5 rounded-2xl flex items-center justify-center`}
                  style={{
                    background:
                      hoveredIndex === index
                        ? `linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4))`
                        : `linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2))`,
                    boxShadow:
                      hoveredIndex === index
                        ? `0 10px 20px -10px ${feature.shadowColor}, 
                         inset 0 0 0 1px rgba(255, 255, 255, 0.7)`
                        : `0 8px 16px -8px rgba(0, 0, 0, 0.1), 
                         inset 0 0 0 1px rgba(255, 255, 255, 0.5)`,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon with gradient background */}
                  <motion.div
                    className={`text-3xl rounded-xl bg-gradient-to-br ${feature.color} text-white w-14 h-14 flex items-center justify-center`}
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                      rotate: hoveredIndex === index ? 5 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                  >
                    {feature.icon}
                  </motion.div>

                  {/* Animated rings around icon */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-2xl border border-white/30"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.div
                          className={`absolute w-full h-full rounded-2xl bg-gradient-to-br ${feature.color} opacity-10`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 0.1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        />
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Title with gradient text on hover */}
                <motion.h3
                  className="text-xl font-bold mb-3 transition-colors duration-300"
                  style={{
                    color: hoveredIndex === index ? "transparent" : "#1F2937",
                    backgroundImage:
                      hoveredIndex === index
                        ? `linear-gradient(to right, ${feature.color
                            .replace("from-", "")
                            .replace("to-", "")})`
                        : "none",
                    backgroundClip:
                      hoveredIndex === index ? "text" : "border-box",
                  }}
                >
                  {feature.title}
                </motion.h3>

                {/* Description with animated opacity */}
                <motion.p
                  className="text-gray-600 transition-colors duration-300"
                  animate={{
                    color: hoveredIndex === index ? "#4B5563" : "#6B7280",
                  }}
                >
                  {feature.description}
                </motion.p>

                {/* Learn more link that appears on hover */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      className="mt-6 flex items-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.span
                        className={`text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r ${
                          feature.color
                        } ${isRTL ? "ml-2" : "mr-2"}`}
                      >
                        {t("features.learnMore")}
                      </motion.span>
                      <motion.div
                        animate={{
                          x: isRTL ? [0, -5, 0] : [0, 5, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "easeInOut",
                        }}
                      >
                        {isRTL ? (
                          <FaArrowRight
                            className={`text-sm bg-clip-text text-transparent bg-gradient-to-r ${feature.color} rotate-180`}
                          />
                        ) : (
                          <FaArrowRight
                            className={`text-sm bg-clip-text text-transparent bg-gradient-to-r ${feature.color}`}
                          />
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Animated border line */}
                <motion.div
                  className={`h-0.5 bg-gradient-to-r ${
                    feature.color
                  } absolute bottom-0 ${
                    isRTL ? "right-0" : "left-0"
                  } rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: hoveredIndex === index ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />

                {/* Subtle corner accents */}
                <motion.div
                  className={`absolute top-0 ${
                    isRTL ? "left-0" : "right-0"
                  } w-16 h-16 pointer-events-none`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: isRTL ? "scaleX(-1)" : "none" }}
                  >
                    <path
                      d="M0 0L64 64V16C64 7.16344 56.8366 0 48 0H0Z"
                      className={`fill-current opacity-5 text-indigo-500`}
                    />
                  </svg>
                </motion.div>
                <motion.div
                  className={`absolute bottom-0 ${
                    isRTL ? "right-0" : "left-0"
                  } w-16 h-16 pointer-events-none rotate-180`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    transform: isRTL
                      ? "scaleX(-1) rotate(180deg)"
                      : "rotate(180deg)",
                  }}
                >
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 0L64 64V16C64 7.16344 56.8366 0 48 0H0Z"
                      className={`fill-current opacity-5 text-indigo-500`}
                    />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className={`absolute -z-10 rounded-full w-24 h-24 -top-6 ${
                  isRTL ? "-left-6" : "-right-6"
                } opacity-0`}
                style={{
                  background: `radial-gradient(circle, ${feature.shadowColor.replace(
                    "0.3",
                    "0.15"
                  )} 0%, transparent 70%)`,
                  filter: "blur(20px)",
                }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  opacity: { duration: 0.3 },
                  scale: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
              />
              <motion.div
                className={`absolute -z-10 rounded-full w-20 h-20 -bottom-6 ${
                  isRTL ? "-right-6" : "-left-6"
                } opacity-0`}
                style={{
                  background: `radial-gradient(circle, ${feature.shadowColor.replace(
                    "0.3",
                    "0.15"
                  )} 0%, transparent 70%)`,
                  filter: "blur(20px)",
                }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? [1, 1.3, 1] : 1,
                }}
                transition={{
                  opacity: { duration: 0.3 },
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1,
                  },
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative elements at the bottom */}
        <motion.div
          className="mt-24 flex justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div className="relative h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-white opacity-30"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-indigo-500"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              y: [0, -Math.random() * 500 - 100],
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
