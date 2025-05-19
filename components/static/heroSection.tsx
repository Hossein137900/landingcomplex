import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/languageContext";

const Hero = () => {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Create individual transform values for each builder element
  // Element 0
  const element0X = useTransform(mouseXSpring, (value) => value * -1 * 0.5);
  const element0Y = useTransform(mouseYSpring, (value) => value * 1 * 0.5);
  const element0RotateX = useTransform(mouseYSpring, (value) => value * 0.5);
  const element0RotateY = useTransform(mouseXSpring, (value) => -value * 0.5);

  // Element 1
  const element1X = useTransform(mouseXSpring, (value) => value * 1 * 1 * 0.5);
  const element1Y = useTransform(mouseYSpring, (value) => value * -1 * 1 * 0.5);
  const element1RotateX = useTransform(mouseYSpring, (value) => value * 0.5);
  const element1RotateY = useTransform(mouseXSpring, (value) => -value * 0.5);

  // Element 2
  const element2X = useTransform(mouseXSpring, (value) => value * -1 * 2 * 0.5);
  const element2Y = useTransform(mouseYSpring, (value) => value * 1 * 2 * 0.5);
  const element2RotateX = useTransform(mouseYSpring, (value) => value * 0.5);
  const element2RotateY = useTransform(mouseXSpring, (value) => -value * 0.5);

  // Element 3
  const element3X = useTransform(mouseXSpring, (value) => value * 1 * 3 * 0.5);
  const element3Y = useTransform(mouseYSpring, (value) => value * -1 * 3 * 0.5);
  const element3RotateX = useTransform(mouseYSpring, (value) => value * 0.5);
  const element3RotateY = useTransform(mouseXSpring, (value) => -value * 0.5);

  // Element 4
  const element4X = useTransform(mouseXSpring, (value) => value * -1 * 4 * 0.5);
  const element4Y = useTransform(mouseYSpring, (value) => value * 1 * 4 * 0.5);
  const element4RotateX = useTransform(mouseYSpring, (value) => value * 0.5);
  const element4RotateY = useTransform(mouseXSpring, (value) => -value * 0.5);

  // Element 5
  const element5X = useTransform(mouseXSpring, (value) => value * 1 * 5 * 0.5);
  const element5Y = useTransform(mouseYSpring, (value) => value * -1 * 5 * 0.5);
  const element5RotateX = useTransform(mouseYSpring, (value) => value * 0.5);
  const element5RotateY = useTransform(mouseXSpring, (value) => -value * 0.5);

  // Store all transforms in an array for easy access
  const builderElementTransforms = [
    {
      x: element0X,
      y: element0Y,
      rotateX: element0RotateX,
      rotateY: element0RotateY,
    },
    {
      x: element1X,
      y: element1Y,
      rotateX: element1RotateX,
      rotateY: element1RotateY,
    },
    {
      x: element2X,
      y: element2Y,
      rotateX: element2RotateX,
      rotateY: element2RotateY,
    },
    {
      x: element3X,
      y: element3Y,
      rotateX: element3RotateX,
      rotateY: element3RotateY,
    },
    {
      x: element4X,
      y: element4Y,
      rotateX: element4RotateX,
      rotateY: element4RotateY,
    },
    {
      x: element5X,
      y: element5Y,
      rotateX: element5RotateX,
      rotateY: element5RotateY,
    },
  ];

  // Grid pattern transform
  const gridPatternX = useTransform(mouseXSpring, (value) => value * -0.5);
  const gridPatternY = useTransform(mouseYSpring, (value) => value * -0.5);

  // Code block transform
  const codeBlockX = useTransform(mouseXSpring, (value) => value * -2);
  const codeBlockY = useTransform(mouseYSpring, (value) => value * -2);
  const codeBlockRotateY = useTransform(mouseXSpring, (value) => value * 0.5);
  const codeBlockRotateX = useTransform(mouseYSpring, (value) => -value * 0.5);

  // Website preview transform
  const websitePreviewX = useTransform(mouseXSpring, (value) => value * -1.5);
  const websitePreviewY = useTransform(mouseYSpring, (value) => value * -1.5);
  const websitePreviewRotateY = useTransform(
    mouseXSpring,
    (value) => value * 0.3
  );
  const websitePreviewRotateX = useTransform(
    mouseYSpring,
    (value) => -value * 0.3
  );

  // Background shapes transform
  const backgroundShape1X = useTransform(mouseXSpring, (value) => value * -1);
  const backgroundShape1Y = useTransform(mouseYSpring, (value) => value * -1);
  const backgroundShape2X = useTransform(mouseXSpring, (value) => value * -0.5);
  const backgroundShape2Y = useTransform(mouseYSpring, (value) => value * -0.5);

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate mouse position as values between -0.5 and 0.5
      const xPos = clientX / innerWidth - 0.5;
      const yPos = clientY / innerHeight - 0.5;

      mouseX.set(xPos * 30); // Adjust multiplier for more/less movement
      mouseY.set(yPos * 30);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Animated text with staggered letters
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Get translated text from translations
  const titleText = t("hero.title");
  const subtitleText = t("hero.subtitle");

  // Website builder elements
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
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden font-vazir"
      style={{
        opacity,
        scale,
        y,
        background:
          "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%)",
      }}
    >
      {/* Parallax background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
            x: gridPatternX,
            y: gridPatternY,
          }}
        />

        {/* Website builder elements floating in 3D space */}
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
              ...builderElementTransforms[i],
              zIndex: 10 - i,
              perspective: 1000,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.7, 0.5],
              scale: [0.8, 1.1, 1],
              rotate: [0, Math.random() * 5 - 2.5],
            }}
            transition={{
              duration: 2 + i * 0.5,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: Math.random() * 5 + 5,
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

        {/* Animated code blocks */}
        <motion.div
          className="absolute top-[15%] right-[10%] w-64 h-80 bg-black/20 backdrop-blur-xl rounded-lg border border-white/10 overflow-hidden"
          style={{
            x: codeBlockX,
            y: codeBlockY,
            rotateY: codeBlockRotateY,
            rotateX: codeBlockRotateX,
          }}
        >
          <div className="h-6 w-full bg-gray-800/50 flex items-center px-3">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="p-4">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="h-3 bg-white/20 rounded my-3"
                style={{ width: `${Math.random() * 50 + 50}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.random() * 50 + 50}%` }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 5,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Animated website preview */}
        <motion.div
          className="absolute bottom-[15%] left-[10%] w-64 h-80 bg-white/10 backdrop-blur-xl rounded-lg border border-white/10 overflow-hidden"
          style={{
            x: websitePreviewX,
            y: websitePreviewY,
            rotateY: websitePreviewRotateY,
            rotateX: websitePreviewRotateX,
          }}
        >
          <div className="h-6 w-full bg-indigo-500/30 flex items-center justify-center">
            <div className="w-20 h-2 rounded-full bg-white/30"></div>
          </div>
          <div className="h-12 w-full bg-indigo-600/20 flex items-center justify-between px-4">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="h-2 w-10 bg-white/30 rounded-full"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
          <div className="p-4">
            <motion.div
              className="h-24 w-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded mb-4"
              animate={{
                background: [
                  "linear-gradient(to right, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))",
                  "linear-gradient(to right, rgba(79, 70, 229, 0.2), rgba(147, 51, 234, 0.2))",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-3 bg-white/20 rounded"
                  style={{ width: `${90 - i * 15}%` }}
                  animate={{
                    width: [
                      `${90 - i * 15}%`,
                      `${80 - i * 10}%`,
                      `${90 - i * 15}%`,
                    ],
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.3,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Floating particles */}
        {isMounted &&
          [...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
                opacity: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                y: [0, -Math.random() * 500 - 100],
                opacity: [0, 0.5, 0],
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
                {titleText.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.03 * index,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {subtitleText.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block mx-1"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay:
              titleText.length * 0.03 +
              subtitleText.split(" ").length * 0.1 +
              0.5,
          }}
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
          transition={{
            delay:
              titleText.length * 0.03 +
              subtitleText.split(" ").length * 0.1 +
              1,
            duration: 1,
          }}
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

      {/* 3D animated shape in the background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -bottom-[40%] left-[50%] w-[800px] h-[800px] rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-3xl"
          style={{
            x: backgroundShape1X,
            y: backgroundShape1Y,
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -top-[30%] right-[30%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-pink-600/20 to-purple-600/20 backdrop-blur-3xl"
          style={{
            x: backgroundShape2X,
            y: backgroundShape2Y,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 5,
          }}
        />
      </div>
    </motion.div>
  );
};

export default Hero;
