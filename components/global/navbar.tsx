"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaRocket,
  FaBars,
  FaTimes,
  FaHome,
  FaLightbulb,
  FaTag,
  FaComments,
  FaUserPlus,
  FaGlobe,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { Language, useLanguage } from "@/context/languageContext";

const Navbar = () => {
  const { language, setLanguage, direction, t, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langButtonRef = useRef<HTMLButtonElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Add this useEffect to handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ["home", "features", "pricing", "testimonials"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".menu-button")
      ) {
        setIsOpen(false);
      }

      if (
        langMenuOpen &&
        !target.closest(".lang-menu") &&
        !target.closest(".lang-button")
      ) {
        setLangMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, langMenuOpen]);

  // Prevent body scroll when mobile menu is open

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    {
      id: "home",
      label: t("nav.home"),
      icon: <FaHome className={direction === "rtl" ? "m-2" : "m-2"} />,
    },
    {
      id: "features",
      label: t("nav.features"),
      icon: <FaLightbulb className={direction === "rtl" ? "m-2" : "m-2"} />,
    },
    {
      id: "pricing",
      label: t("nav.pricing"),
      icon: <FaTag className={direction === "rtl" ? "m-2" : "m-2"} />,
    },
    {
      id: "testimonials",
      label: t("nav.testimonials"),
      icon: <FaComments className={direction === "rtl" ? "m-2" : "m-2"} />,
    },
  ];

  const languages = [
    { code: "fa", name: "فارسی", flag: "🇮🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
      >
        <div
          className={`${
            scrolled ? "backdrop-blur-lg bg-white/10" : ""
          } border-b border-white/20 transition-all duration-300`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <motion.div
                  className="flex-shrink-0 relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-primary/30 rounded-full blur-md"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                  <Link href="#" className="relative z-10 flex items-center">
                    <FaRocket className="h-8 w-8 text-pink-500" />
                    <span
                      className={`${
                        direction === "rtl" ? "mr-2" : "ml-2"
                      } font-bold text-lg text-black hidden sm:block`}
                    >
                      {t("brand.name")}
                    </span>
                  </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:block">
                  <div
                    className={`${
                      direction === "rtl" ? "mr-10" : "ml-10"
                    } text-black flex items-baseline space-x-1 rtl:space-x-reverse`}
                  >
                    {navItems.map((item) => (
                      <motion.div
                        key={item.id}
                        onHoverStart={() => setHoveredItem(item.id)}
                        onHoverEnd={() => setHoveredItem(null)}
                        className="relative"
                      >
                        <Link
                          href={`#${item.id}`}
                          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors relative z-10 ${
                            activeSection === item.id
                              ? "text-primary"
                              : "text-dark/80 hover:text-primary"
                          }`}
                          onClick={() => setActiveSection(item.id)}
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                        {/* Hover effect */}
                        <AnimatePresence>
                          {hoveredItem === item.id && (
                            <motion.span
                              className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </AnimatePresence>
                        {/* Active indicator */}
                        {activeSection === item.id && (
                          <motion.span
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                            layoutId="activeSection"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {/* Language Switcher */}
                <div className="relative group">
                  <motion.button
                    ref={langButtonRef}
                    className="lang-button flex items-center justify-center p-2.5 rounded-full bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-md text-primary hover:bg-primary/10 focus:outline-none transition-colors border border-primary/10 shadow-sm"
                    onClick={() => setLangMenuOpen(!langMenuOpen)}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 10px rgba(99, 102, 241, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Change language"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-indigo-100/50 to-purple-100/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                    <FaGlobe className="h-5 w-5 text-indigo-600 relative z-10" />
                    <span
                      className={`${
                        direction === "rtl" ? "mr-2" : "ml-2"
                      } hidden sm:inline-block font-medium text-gray-700 relative z-10`}
                    >
                      {languages.find((lang) => lang.code === language)?.flag}
                      <span className="ml-1 text-sm hidden md:inline-block">
                        {languages.find((lang) => lang.code === language)?.name}
                      </span>
                    </span>
                    <motion.span
                      className={`${
                        direction === "rtl" ? "mr-1" : "ml-1"
                      } text-xs text-gray-500 relative z-10`}
                      animate={{ rotate: langMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {langMenuOpen && (
                      <motion.div
                        className={`lang-menu bg-white/90 backdrop-blur-xl rounded-xl shadow-lg py-2 min-w-[220px] border border-indigo-100/50 z-50 overflow-hidden ${
                          isMobile
                            ? "fixed top-54 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            : "absolute top-full mt-2 right-0"
                        }`}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{
                          duration: 0.25,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 z-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />

                        <div className="relative z-10">
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-700 flex items-center">
                              <FaGlobe className="h-4 w-4 text-indigo-500 mr-2" />
                              {t("navbar.selectLanguage")}
                            </p>
                          </div>

                          <div className="py-2 max-h-[280px] overflow-y-auto custom-scrollbar">
                            {languages.map((lang) => (
                              <motion.button
                                key={lang.code}
                                className={`w-full text-left px-4 py-3 flex items-center justify-between group transition-all duration-200 ${
                                  language === lang.code
                                    ? "bg-indigo-50/80 text-indigo-600"
                                    : "hover:bg-gray-50/80 text-gray-700"
                                }`}
                                onClick={() =>
                                  handleLanguageChange(lang.code as Language)
                                }
                                whileHover={{
                                  backgroundColor:
                                    language === lang.code
                                      ? "rgba(99, 102, 241, 0.15)"
                                      : "rgba(243, 244, 246, 0.8)",
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 30,
                                }}
                              >
                                <div className="flex items-center">
                                  <motion.div
                                    className={`w-10 h-10 flex items-center justify-center rounded-full overflow-hidden mr-3 ${
                                      language === lang.code
                                        ? "bg-indigo-100"
                                        : "bg-gray-100"
                                    }`}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 400,
                                      damping: 10,
                                    }}
                                  >
                                    <span className="text-xl">{lang.flag}</span>
                                  </motion.div>

                                  <div>
                                    <span className="font-medium block text-sm">
                                      {lang.name}
                                    </span>
                                    <span className="text-xs text-gray-500 block">
                                      {lang.name}
                                    </span>
                                  </div>
                                </div>

                                {language === lang.code && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600"
                                  >
                                    <motion.svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="3"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      initial={{ pathLength: 0 }}
                                      animate={{ pathLength: 1 }}
                                      transition={{ duration: 0.3, delay: 0.1 }}
                                    >
                                      <polyline points="20 6 9 17 4 12"></polyline>
                                    </motion.svg>
                                  </motion.div>
                                )}
                              </motion.button>
                            ))}
                          </div>

                          <motion.div
                            className="px-4 py-3 mt-1 border-t border-gray-100 flex justify-between items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <button
                              onClick={() => setLangMenuOpen(false)}
                              className="text-xs text-gray-500 hover:text-indigo-600 transition-colors flex items-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-1"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                              {t("navbar.close")}
                            </button>

                            <a
                              href="#"
                              className="text-xs text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-1"
                              >
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                              {t("navbar.helpTranslate")}
                            </a>
                          </motion.div>
                        </div>

                        {/* Decorative elements */}
                        <motion.div
                          className="absolute top-2 right-2 w-16 h-16 rounded-full bg-indigo-100/50 blur-xl z-0"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        />
                        <motion.div
                          className="absolute bottom-2 left-2 w-14 h-14 rounded-full bg-purple-100/50 blur-xl z-0"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.4, 0.2],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 1,
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CTA Button */}
                <div className="hidden md:block">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      delay: 0.1,
                    }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-primary/20 rounded-full blur-md"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                    <button className="bg-gradient-to-r from-primary to-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center relative z-10 shadow-md group overflow-hidden">
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      />
                      <FaUserPlus
                        className={`${
                          direction === "rtl" ? "ml-2" : "mr-2"
                        } relative z-10`}
                      />
                      <span className="relative z-10">
                        {t("nav.getStarted")}
                      </span>
                    </button>
                  </motion.div>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <motion.button
                    className="menu-button inline-flex items-center justify-center p-2.5 rounded-full bg-white/80 backdrop-blur-md text-black hover:bg-primary hover:text-white focus:outline-none transition-colors shadow-sm"
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 10px rgba(99, 102, 241, 0.3)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      delay: 0.2,
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {isOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FaTimes className="h-5 w-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FaBars className="h-5 w-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop overlay */}
              <motion.div
                className="fixed inset-0 bg-black/5 backdrop-blur-sm z-30 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />

              {/* Mobile menu */}
              <motion.div
                className="mobile-menu md:hidden fixed inset-0 z-40 pt-20 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                dir={`${isRTL ? "rtl" : "ltr"}`}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-indigo-600/20 to-purple-700/20 backdrop-blur-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Decorative elements */}
                <motion.div
                  className="absolute top-20 left-10 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl"
                  animate={{
                    x: [0, 30, 0],
                    y: [0, 20, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <motion.div
                  className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"
                  animate={{
                    x: [0, -30, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1,
                  }}
                />

                <motion.div
                  className="relative z-10 h-full flex flex-col overflow-y-auto px-4 pt-2 pb-6"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.07, delayChildren: 0.1 },
                    },
                    closed: {
                      transition: {
                        staggerChildren: 0.05,
                        staggerDirection: -1,
                      },
                    },
                  }}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  {/* Navigation items */}
                  <div className="flex-1">
                    {navItems.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={{
                          open: { y: 0, opacity: 1 },
                          closed: { y: 30, opacity: 0 },
                        }}
                        transition={{
                          duration: 0.4,
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        }}
                        className="mb-3"
                      >
                        <Link
                          href={`#${item.id}`}
                          className={`flex items-center w-full px-5 py-4 rounded-xl text-base font-medium transition-all ${
                            activeSection === item.id
                              ? "bg-white/10 text-white border border-white/20"
                              : "text-white/80 hover:bg-white/5"
                          }`}
                          onClick={() => {
                            setActiveSection(item.id);
                            setIsOpen(false);
                          }}
                        >
                          <motion.div
                            className={`w-10 h-10 rounded-lg ${
                              activeSection === item.id
                                ? "bg-white/20"
                                : "bg-white/10"
                            } flex items-center justify-center ${
                              isRTL ? "ml-3" : "mr-3"
                            } `}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <span className="text-xl">{item.icon}</span>
                          </motion.div>
                          {item.label}

                          {activeSection === item.id && (
                            <motion.div
                              className={` ${
                                isRTL ? "mr-auto" : "ml-auto"
                              }   w-6 h-6 rounded-full bg-white/20 flex items-center justify-center`}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 15,
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </motion.div>
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom actions */}
                  <motion.div
                    variants={{
                      open: { y: 0, opacity: 1 },
                      closed: { y: 30, opacity: 0 },
                    }}
                    transition={{ duration: 0.4, type: "spring" }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full bg-white text-indigo-700 py-4 px-5 rounded-xl text-base font-medium flex items-center justify-center mb-4 shadow-lg"
                    >
                      <FaUserPlus
                        className={`${direction === "rtl" ? "ml-2" : "mr-2"}`}
                      />
                      {t("nav.getStarted")}
                    </motion.button>

                    {/* Language switcher for mobile */}
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                      {languages.map((lang) => (
                        <motion.button
                          key={lang.code}
                          onClick={() =>
                            handleLanguageChange(lang.code as Language)
                          }
                          className={`flex items-center px-3 py-2 rounded-lg ${
                            language === lang.code
                              ? "bg-white/20 text-white"
                              : "bg-white/10 text-white/80 hover:bg-white/15"
                          } transition-colors`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="text-lg mr-2">{lang.flag}</span>
                          <span className="text-sm font-medium">
                            {lang.name}
                          </span>
                          {language === lang.code && (
                            <motion.div
                              className="ml-2 w-4 h-4 rounded-full bg-white/30 flex items-center justify-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 15,
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>

                    {/* Social links */}
                    <motion.div
                      variants={{
                        open: { y: 0, opacity: 1 },
                        closed: { y: 30, opacity: 0 },
                      }}
                      transition={{ duration: 0.4, type: "spring", delay: 0.2 }}
                      className="flex justify-center gap-3 mt-6"
                    >
                      {[
                        { icon: <FaTwitter />, color: "bg-blue-500" },
                        { icon: <FaInstagram />, color: "bg-pink-600" },
                        { icon: <FaLinkedin />, color: "bg-blue-700" },
                        { icon: <FaGithub />, color: "bg-gray-800" },
                      ].map((item, index) => (
                        <motion.a
                          key={index}
                          href="#"
                          whileHover={{ y: -5 }}
                          whileTap={{ scale: 0.9 }}
                          className={`${item.color} text-white p-3 rounded-full`}
                        >
                          {item.icon}
                        </motion.a>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/5 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
