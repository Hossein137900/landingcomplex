import { useLanguage } from "@/context/languageContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaPlay,
  FaPaperPlane,
} from "react-icons/fa";

const CTA = () => {
  const { t, isRTL } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHoveringPrimary, setIsHoveringPrimary] = useState(false);
  const [isHoveringDemo, setIsHoveringDemo] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  interface FormEvent {
    preventDefault: () => void;
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  // Choose the appropriate arrow icon based on language direction
  const ArrowIcon = isRTL ? FaArrowRight : FaArrowLeft;

  if (!isMounted) {
    // Return a simple loading state or placeholder
    return (
      <div className="py-24 bg-gradient-to-br from-indigo-600 to-purple-700"></div>
    );
  }

  return (
    <section
      className={`py-24 relative overflow-hidden ${isRTL ? "rtl" : "ltr"}`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 z-0"></div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        initial={{ x: -100, y: -100 }}
        animate={{
          x: [-100, 50, -100],
          y: [-100, 50, -100],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        initial={{ x: 100, y: 100 }}
        animate={{
          x: [100, -50, 100],
          y: [100, -50, 100],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block bg-white/10 backdrop-blur-lg px-6 py-2 rounded-full text-white/90 text-sm font-medium mb-6"
          >
            {t("cta.badge")} 🚀
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            {t("cta.title")}
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-white/30 mx-auto mb-8"
          />

          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
            {t("cta.subtitle")}
          </p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              onHoverStart={() => setIsHoveringPrimary(true)}
              onHoverEnd={() => setIsHoveringPrimary(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isHoveringPrimary
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                className="absolute inset-0 bg-white/20 rounded-full blur-md"
              />
              <button className="relative px-8 py-4 bg-white text-indigo-700 font-bold rounded-full shadow-lg flex items-center justify-center gap-2 group z-10">
                <span>{t("cta.buttons.primary")}</span>
                <motion.span
                  animate={isHoveringPrimary ? { x: isRTL ? 5 : -5 } : { x: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowIcon className="text-sm opacity-70" />
                </motion.span>
              </button>
            </motion.div>

            <motion.div
              onHoverStart={() => setIsHoveringDemo(true)}
              onHoverEnd={() => setIsHoveringDemo(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isHoveringDemo
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                className="absolute inset-0 bg-indigo-500/20 rounded-full blur-md"
              />
              <button className="relative px-8 py-4 bg-transparent border-2 border-white/70 text-white font-bold rounded-full flex items-center justify-center gap-2 group z-10">
                <span>{t("cta.buttons.secondary")}</span>
                <motion.div
                  animate={
                    isHoveringDemo
                      ? {
                          scale: 1.2,
                          backgroundColor: "rgba(255, 255, 255, 0.01)",
                        }
                      : {
                          scale: 1,
                          backgroundColor: "rgba(255, 255, 255, 0.01)",
                        }
                  }
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                >
                  <FaPlay
                    className={`text-xs ${isRTL ? "ml-0.5" : "mr-0.5"}`}
                  />
                </motion.div>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-20 backdrop-blur-xl bg-white/10 rounded-2xl p-8 md:p-10 max-w-4xl mx-auto border border-white/20 shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h3 className="text-2xl font-bold mb-3 text-white">
              {t("cta.newsletter.title")}
            </h3>
            <p className="mb-8 text-white/80">{t("cta.newsletter.subtitle")}</p>

            <form onSubmit={handleSubmit} className="relative">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("cta.newsletter.placeholder")}
                    className={`w-full px-5 py-4 rounded-xl text-gray-100 placeholder:text-white/60 focus:outline-none border border-white/40 focus:ring-2 focus:ring-indigo-500/50 ${
                      isRTL ? "text-right pr-12" : "text-left pl-12"
                    }`}
                    required
                  />
                  <div
                    className={`absolute ${
                      isRTL ? "right-4" : "left-4"
                    } top-1/2 transform -translate-y-1/2 text-gray-300`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
                  type="submit"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-green-100"
                      >
                        {t("cta.newsletter.success")}
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <span>{t("cta.newsletter.button")}</span>
                      <FaPaperPlane className="text-sm" />
                    </>
                  )}
                </motion.button>
              </div>

              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={
                  isSubmitted
                    ? { opacity: 1, height: "auto" }
                    : { opacity: 0, height: 0 }
                }
                className="text-green-300 mt-3 text-sm"
              >
                {t("cta.newsletter.successMessage")}
              </motion.p>
            </form>

            <p className="text-xs text-white/60 mt-6">
              {t("cta.newsletter.privacy")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
