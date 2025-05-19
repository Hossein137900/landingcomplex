import { useLanguage } from "@/context/languageContext";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  FaRegLightbulb,
  FaRegEdit,
  FaRegCheckCircle,
  FaArrowRight,
  FaPlay,
} from "react-icons/fa";

const HowItWorks = () => {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [activeStep, setActiveStep] = useState<null | number>(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Handle window dimensions safely with useEffect
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

  // Get translated steps
  const steps = [
    {
      icon: <FaRegLightbulb />,
      title: t("howItWorks.step1.title"),
      description: t("howItWorks.step1.description"),
      color: "from-blue-400 to-indigo-500",
      lightColor: "from-blue-100 to-indigo-200",
      darkColor: "from-blue-600 to-indigo-700",
      number: isRTL ? "١" : "1",
    },
    {
      icon: <FaRegEdit />,
      title: t("howItWorks.step2.title"),
      description: t("howItWorks.step2.description"),
      color: "from-purple-400 to-indigo-500",
      lightColor: "from-purple-100 to-indigo-200",
      darkColor: "from-purple-600 to-indigo-700",
      number: isRTL ? "٢" : "2",
    },
    {
      icon: <FaRegCheckCircle />,
      title: t("howItWorks.step3.title"),
      description: t("howItWorks.step3.description"),
      color: "from-indigo-400 to-purple-500",
      lightColor: "from-indigo-100 to-purple-200",
      darkColor: "from-indigo-600 to-purple-700",
      number: isRTL ? "٣" : "3",
    },
  ];

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Connection line animation
  const pathRef = useRef(null);
  const isPathInView = useInView(pathRef, { once: false, amount: 0.5 });

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden font-vazir"
      style={{
        background:
          "linear-gradient(135deg, #f5f7ff 0%, #f0f4ff 50%, #eef2ff 100%)",
      }}
      dir={`${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(79, 70, 229, 0.05) 1px, transparent 0)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Floating shapes */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 300 + 200,
              height: Math.random() * 300 + 200,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, rgba(79, 70, 229, 0.05) 50%, transparent 70%)`,
              filter: "blur(50px)",
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              scale: [1, Math.random() * 0.1 + 0.95, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="text-center mb-20" style={{ y, opacity }}>
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            {t("howItWorks.title")}
          </motion.h2>
          <motion.div
            className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto my-6 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={
              isInView ? { width: 96, opacity: 1 } : { width: 0, opacity: 0 }
            }
            transition={{ duration: 0.7, delay: 0.2 }}
          />
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {t("howItWorks.subtitle")}
          </motion.p>
        </motion.div>

        {/* Process steps with connecting path */}
        <div className="relative">
          {/* SVG connection path */}
          <div
            ref={pathRef}
            className="absolute top-1/2 left-0 w-full h-0.5 hidden md:block"
            style={{ transform: "translateY(-50%)" }}
          >
            <svg width="100%" height="10" className="absolute top-0 left-0">
              <motion.path
                d={isRTL ? "M100,5 L0,5" : "M0,5 L100,5"}
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isPathInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Animated dots on the path */}
            <motion.div
              className="absolute top-0 left-0 w-3 h-3 rounded-full bg-indigo-500"
              style={{ marginTop: "-5px" }}
              animate={{
                left: isRTL ? ["100%", "0%"] : ["0%", "100%"],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            />
            <motion.div
              className="absolute top-0 left-0 w-2 h-2 rounded-full bg-purple-500"
              style={{ marginTop: "-3px" }}
              animate={{
                left: isRTL ? ["100%", "0%"] : ["0%", "100%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-16 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex-1 relative"
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.7, delay: index * 0.2 }}
                onHoverStart={() => setActiveStep(index)}
                onHoverEnd={() => setActiveStep(null)}
              >
                {/* Step number indicator */}
                <motion.div
                  className={`absolute -top-6 ${
                    isRTL ? "-left-6" : "-right-6"
                  } w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white z-10`}
                  style={{
                    background: `linear-gradient(135deg, ${step.color
                      .replace("from-", "")
                      .replace("to-", "")})`,
                    boxShadow: `0 10px 25px -5px ${
                      index === 0
                        ? "rgba(79, 70, 229, 0.3)"
                        : index === 1
                        ? "rgba(139, 92, 246, 0.3)"
                        : "rgba(168, 85, 247, 0.3)"
                    }`,
                  }}
                  animate={{
                    scale: activeStep === index ? 1.1 : 1,
                    boxShadow:
                      activeStep === index
                        ? `0 15px 30px -5px ${
                            index === 0
                              ? "rgba(79, 70, 229, 0.4)"
                              : index === 1
                              ? "rgba(139, 92, 246, 0.4)"
                              : "rgba(168, 85, 247, 0.4)"
                          }`
                        : `0 10px 25px -5px ${
                            index === 0
                              ? "rgba(79, 70, 229, 0.3)"
                              : index === 1
                              ? "rgba(139, 92, 246, 0.3)"
                              : "rgba(168, 85, 247, 0.3)"
                          }`,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {step.number}
                </motion.div>

                {/* Main card with glass effect */}
                <motion.div
                  className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 text-center relative overflow-hidden"
                  style={{
                    boxShadow:
                      activeStep === index
                        ? `0 20px 40px -10px ${
                            index === 0
                              ? "rgba(79, 70, 229, 0.2)"
                              : index === 1
                              ? "rgba(139, 92, 246, 0.2)"
                              : "rgba(168, 85, 247, 0.2)"
                          }, inset 0 0 0 1px rgba(255, 255, 255, 0.7)`
                        : `0 10px 30px -15px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5)`,
                  }}
                  animate={{
                    y: activeStep === index ? -8 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Background gradient that appears on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${step.lightColor} opacity-0`}
                    animate={{ opacity: activeStep === index ? 0.3 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon with animated container */}
                  <motion.div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl text-white mx-auto mb-6`}
                    animate={{
                      scale: activeStep === index ? 1.1 : 1,
                      rotate: activeStep === index ? 5 : 0,
                      boxShadow:
                        activeStep === index
                          ? `0 15px 30px -10px ${
                              index === 0
                                ? "rgba(79, 70, 229, 0.4)"
                                : index === 1
                                ? "rgba(139, 92, 246, 0.4)"
                                : "rgba(168, 85, 247, 0.4)"
                            }`
                          : `0 10px 20px -10px ${
                              index === 0
                                ? "rgba(79, 70, 229, 0.3)"
                                : index === 1
                                ? "rgba(139, 92, 246, 0.3)"
                                : "rgba(168, 85, 247, 0.3)"
                            }`,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                  >
                    {step.icon}

                    {/* Animated rings around icon */}
                    <AnimatePresence>
                      {activeStep === index && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-white/30"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Title with gradient on hover */}
                  <motion.h3
                    className="text-xl font-bold mb-3"
                    style={{
                      color: activeStep === index ? "transparent" : "#1F2937",
                      backgroundImage:
                        activeStep === index
                          ? `linear-gradient(to right, ${step.color
                              .replace("from-", "")
                              .replace("to-", "")})`
                          : "none",
                      backgroundClip:
                        activeStep === index ? "text" : "border-box",
                    }}
                  >
                    {step.title}
                  </motion.h3>

                  {/* Description with animated opacity */}
                  <motion.p
                    className="text-gray-600"
                    animate={{
                      color: activeStep === index ? "#4B5563" : "#6B7280",
                    }}
                  >
                    {step.description}
                  </motion.p>

                  {/* Learn more button that appears on hover */}
                  <AnimatePresence>
                    {activeStep === index && (
                      <motion.div
                        className="mt-6 flex items-center justify-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.button
                          className={`px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r ${step.color} flex items-center`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className={isRTL ? "ml-2" : "mr-2"}>
                            {t("howItWorks.viewSample")}
                          </span>
                          {isRTL ? (
                            <FaArrowRight className="text-xs rotate-180" />
                          ) : (
                            <FaArrowRight className="text-xs" />
                          )}
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Decorative corner elements */}
                  <motion.div
                    className={`absolute top-0 ${
                      isRTL ? "left-0" : "right-0"
                    } w-12 h-12 pointer-events-none`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeStep === index ? 0.1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ transform: isRTL ? "scaleX(-1)" : "none" }}
                  >
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 0L48 48V12C48 5.37258 42.6274 0 36 0H0Z"
                        className={`fill-current ${
                          index === 0
                            ? "text-blue-500"
                            : index === 1
                            ? "text-purple-500"
                            : "text-indigo-500"
                        }`}
                      />
                    </svg>
                  </motion.div>
                  <motion.div
                    className={`absolute bottom-0 ${
                      isRTL ? "right-0" : "left-0"
                    } w-12 h-12 pointer-events-none rotate-180`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeStep === index ? 0.1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      transform: isRTL
                        ? "scaleX(-1) rotate(180deg)"
                        : "rotate(180deg)",
                    }}
                  >
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 0L48 48V12C48 5.37258 42.6274 0 36 0H0Z"
                        className={`fill-current ${
                          index === 0
                            ? "text-blue-500"
                            : index === 1
                            ? "text-purple-500"
                            : "text-indigo-500"
                        }`}
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
                    background: `radial-gradient(circle, ${
                      index === 0
                        ? "rgba(79, 70, 229, 0.15)"
                        : index === 1
                        ? "rgba(139, 92, 246, 0.15)"
                        : "rgba(168, 85, 247, 0.15)"
                    } 0%, transparent 70%)`,
                    filter: "blur(20px)",
                  }}
                  animate={{
                    opacity: activeStep === index ? 1 : 0,
                    scale: activeStep === index ? [1, 1.2, 1] : 1,
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
              </motion.div>
            ))}
          </div>
        </div>

        {/* Demo video section */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <motion.div
            className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {/* Video thumbnail with play button */}
            <div
              className="relative aspect-video bg-gradient-to-br from-indigo-900 to-purple-900 cursor-pointer group"
              onClick={() => setVideoPlaying(!videoPlaying)}
            >
              {/* Placeholder image - replace with your actual thumbnail */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-70"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
                }}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent" />

              {/* Play button */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 1 }}
                animate={{ opacity: videoPlaying ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(99, 102, 241, 0)",
                        "0 0 0 15px rgba(99, 102, 241, 0)",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  >
                    <FaPlay
                      className={`text-xl ${
                        isRTL ? "rotate-180 mr-1" : "ml-1"
                      }`}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Video title */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-6 text-white ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                <h4 className="text-2xl font-bold mb-2">
                  {t("howItWorks.video.title")}
                </h4>
                <p className="text-white/80">
                  {t("howItWorks.video.description")}
                </p>
              </div>

              {/* Actual video - would be replaced with your video component */}
              {videoPlaying && (
                <motion.div
                  className="absolute inset-0 bg-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full flex items-center justify-center text-white">
                    {/* This would be your actual video player */}
                    <p>{t("howItWorks.video.playing")}</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Video controls */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: videoPlaying ? 1 : 0 }}
              transition={{ duration: videoPlaying ? 30 : 0, ease: "linear" }}
              style={{ transformOrigin: isRTL ? "right" : "left" }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                style={{ width: "100%" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-lg relative overflow-hidden group"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 30px -5px rgba(79, 70, 229, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              initial={{ x: isRTL ? "100%" : "-100%" }}
              whileHover={{ x: isRTL ? "-100%" : "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            {t("howItWorks.startNow")}
          </motion.button>
        </motion.div>
      </div>

      {/* Floating particles - Fixed to avoid window reference error */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
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
                y: [0, -Math.random() * 400 - 100],
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
      )}
    </section>
  );
};

export default HowItWorks;
