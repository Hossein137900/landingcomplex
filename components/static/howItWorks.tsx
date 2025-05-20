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
  const [activeStep, setActiveStep] = useState<null | number>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle window dimensions safely with useEffect
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
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
      accentColor: "#6366F1",
    },
    {
      icon: <FaRegEdit />,
      title: t("howItWorks.step2.title"),
      description: t("howItWorks.step2.description"),
      color: "from-purple-400 to-indigo-500",
      lightColor: "from-purple-100 to-indigo-200",
      darkColor: "from-purple-600 to-indigo-700",
      number: isRTL ? "٢" : "2",
      accentColor: "#8B5CF6",
    },
    {
      icon: <FaRegCheckCircle />,
      title: t("howItWorks.step3.title"),
      description: t("howItWorks.step3.description"),
      color: "from-indigo-400 to-purple-500",
      lightColor: "from-indigo-100 to-purple-200",
      darkColor: "from-indigo-600 to-purple-700",
      number: isRTL ? "٣" : "3",
      accentColor: "#A855F7",
    },
  ];

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Connection line animation
  const pathRef = useRef(null);
  const isPathInView = useInView(pathRef, { once: false, amount: 0.5 });

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden font-vazir"
      style={{
        background: "linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)",
      }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(79, 70, 229, 0.05) 1px, transparent 0)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="text-center mb-20" style={{ y, opacity }}>
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            {t("howItWorks.title")}
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto my-6 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={
              isInView ? { width: 80, opacity: 1 } : { width: 0, opacity: 0 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
                strokeWidth="2"
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

            {/* Animated dots on the path - optimized to use CSS where possible */}
            <motion.div
              className="absolute top-0 left-0 w-2 h-2 rounded-full bg-indigo-500"
              style={{ marginTop: "-4px" }}
              animate={{
                left: isRTL ? ["100%", "0%"] : ["0%", "100%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex-1 relative">
                {/* This wrapper div prevents layout shifts */}
                <div className="relative pt-4 pb-8">
                  {/* Step number indicator - no animation on hover */}
                  <div
                    className={`absolute -top-4 ${
                      isRTL ? "-right-4" : "-left-4"
                    } w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-blue-400 z-10`}
                    style={{
                      background: `linear-gradient(135deg, ${step.color
                        .replace("from-", "")
                        .replace("to-", "")})`,
                      boxShadow: `0 8px 20px -5px rgba(${parseInt(
                        step.accentColor.slice(1, 3),
                        16
                      )}, ${parseInt(
                        step.accentColor.slice(3, 5),
                        16
                      )}, ${parseInt(step.accentColor.slice(5, 7), 16)}, 0.3)`,
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Main card with isolated hover effects */}
                  <motion.div
                    className="bg-white rounded-xl p-6 text-center relative overflow-hidden"
                    style={{
                      boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)",
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                    }
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{
                      y: -8,
                      boxShadow: `0 20px 40px -15px rgba(${parseInt(
                        step.accentColor.slice(1, 3),
                        16
                      )}, ${parseInt(
                        step.accentColor.slice(3, 5),
                        16
                      )}, ${parseInt(step.accentColor.slice(5, 7), 16)}, 0.2)`,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                    onHoverStart={() => setActiveStep(index)}
                    onHoverEnd={() => setActiveStep(null)}
                  >
                    {/* Subtle background gradient */}
                    {activeStep === index && (
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${step.lightColor}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    {/* Icon with animated container */}
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl text-white mx-auto mb-5`}
                      style={{
                        boxShadow: `0 8px 20px -5px rgba(${parseInt(
                          step.accentColor.slice(1, 3),
                          16
                        )}, ${parseInt(
                          step.accentColor.slice(3, 5),
                          16
                        )}, ${parseInt(
                          step.accentColor.slice(5, 7),
                          16
                        )}, 0.2)`,
                      }}
                    >
                      {step.icon}
                    </div>

                    {/* Title with gradient on hover */}
                    <h3
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
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600">{step.description}</p>

                    {/* Learn more button that appears on hover */}
                    <AnimatePresence>
                      {activeStep === index && (
                        <motion.div
                          className="mt-5 flex items-center justify-center"
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

                    {/* Accent line at bottom */}
                    <AnimatePresence>
                      {activeStep === index && (
                        <motion.div
                          className={`h-0.5 bg-gradient-to-r ${
                            step.color
                          } absolute bottom-0 ${
                            isRTL ? "right-0" : "left-0"
                          } rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          exit={{ width: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo video section - improved design */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div
            className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg"
            whileHover={{ scale: 1.01 }}
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
                  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(99, 102, 241, 0)",
                        "0 0 0 10px rgba(99, 102, 241, 0)",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  >
                    <FaPlay
                      className={`text-lg ${
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

            {/* Video progress bar - simplified for better performance */}
            {videoPlaying && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 30, ease: "linear" }}
                style={{ transformOrigin: isRTL ? "right" : "left" }}
              >
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" />
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Call to action - simplified and optimized */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-md relative overflow-hidden group"
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">{t("howItWorks.startNow")}</span>
            <motion.span
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              initial={{ x: isRTL ? "100%" : "-100%" }}
              whileHover={{ x: isRTL ? "-100%" : "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Optimized floating particles - only render when component is mounted */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-indigo-500"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.2 + 0.1,
              }}
              animate={{
                y: [0, -Math.random() * 200 - 50],
                opacity: [0, 0.2, 0],
                scale: [0, 1, 0.5],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
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
