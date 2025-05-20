import { useLanguage } from "@/context/languageContext";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaRocket,
  FaPalette,
  FaMobileAlt,
  FaSearch,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";

// Define feature list with translations
const getFeaturesList = (t: (key: string) => string) => [
  {
    icon: <FaRocket />,
    title: t("features.speed.title"),
    description: t("features.speed.description"),
    color: "from-blue-500 to-indigo-600",
    iconColor: "text-blue-500",
    accentColor: "#4F46E5",
    image: "/assets/images/speed.jpg",
  },
  {
    icon: <FaPalette />,
    title: t("features.design.title"),
    description: t("features.design.description"),
    color: "from-purple-500 to-indigo-600",
    iconColor: "text-purple-500",
    accentColor: "#8B5CF6",
    image: "/assets/images/design.jpg",
  },
  {
    icon: <FaMobileAlt />,
    title: t("features.responsive.title"),
    description: t("features.responsive.description"),
    color: "from-pink-500 to-purple-600",
    iconColor: "text-pink-500",
    accentColor: "#D946EF",
    image: "/assets/images/responsive.jpg",
  },
  {
    icon: <FaSearch />,
    title: t("features.seo.title"),
    description: t("features.seo.description"),
    color: "from-orange-500 to-pink-600",
    iconColor: "text-orange-500",
    accentColor: "#F43F5E",
    image: "/assets/images/seo.jpg",
  },
  {
    icon: <FaChartLine />,
    title: t("features.analytics.title"),
    description: t("features.analytics.description"),
    color: "from-green-500 to-teal-600",
    iconColor: "text-green-500",
    accentColor: "#10B981",
    image: "/assets/images/data.jpg",
  },
  {
    icon: <FaShieldAlt />,
    title: t("features.security.title"),
    description: t("features.security.description"),
    color: "from-red-500 to-orange-600",
    iconColor: "text-red-500",
    accentColor: "#F97316",
    image: "/assets/images/security.jpg",
  },
];

const Features = () => {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);
  const controls = useAnimation();

  // Get translated features list
  const featuresList = getFeaturesList(t);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Container variants for staggered children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Item variants for individual feature animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <section
      id="features"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(79, 70, 229, 0.05) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("features.title")}
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto my-6 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t("features.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="h-full"
            >
              <motion.div
                className="h-full rounded-xl overflow-hidden relative"
                whileHover={{
                  y: -8,
                  boxShadow: `0 15px 30px -10px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(${parseInt(
                    feature.accentColor.slice(1, 3),
                    16
                  )}, ${parseInt(
                    feature.accentColor.slice(3, 5),
                    16
                  )}, ${parseInt(feature.accentColor.slice(5, 7), 16)}, 0.1)`,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                style={{
                  boxShadow: "0 4px 20px -5px rgba(0, 0, 0, 0.05)",
                }}
              >
                {/* Background image with overlay */}
                <div className="absolute inset-0 w-full h-full">
                  <motion.div
                    className="absolute inset-0 w-full h-full"
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={2000}
                      height={2000}
                      objectFit="cover"
                      className="transition-all duration-500"
                    />
                  </motion.div>

                  {/* Gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color}`}
                    initial={{ opacity: 0.85 }}
                    animate={{
                      opacity: hoveredIndex === index ? 0.75 : 0.85,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* White overlay for content readability */}
                  <motion.div
                    className="absolute inset-0 bg-black/40"
                    initial={{ opacity: 0.5 }}
                    animate={{
                      opacity: hoveredIndex === index ? 0.75 : 0.85,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6">
                  {/* Icon container */}
                  <motion.div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${feature.iconColor} bg-white/10 shadow-sm`}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 5px 15px -5px rgba(${parseInt(
                        feature.accentColor.slice(1, 3),
                        16
                      )}, ${parseInt(
                        feature.accentColor.slice(3, 5),
                        16
                      )}, ${parseInt(
                        feature.accentColor.slice(5, 7),
                        16
                      )}, 0.3)`,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.div
                      className="text-xl"
                      animate={{
                        rotate: hoveredIndex === index ? [0, 5, 0, -5, 0] : 0,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-xl font-bold mb-3 text-white"
                    animate={{
                      color:
                        hoveredIndex === index
                          ? feature.accentColor
                          : "#ffffff",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p className="text-gray-300">
                    {feature.description}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Simple decorative element */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div
            className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            whileInView={{
              width: [64, 96, 64],
            }}
            viewport={{ once: true }}
            transition={{
              duration: 2,
              repeat: 3,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
