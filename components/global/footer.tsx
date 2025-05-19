"use client";
import { useLanguage } from "@/context/languageContext";
import Link from "next/link";
import { FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Footer = () => {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  console.log(mounted)

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Animation variants
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };





  const socialLinks = [
    {
      icon: <FaTwitter />,
      href: "#",
      label: "Twitter",
      color: "from-blue-400 to-blue-500",
    },
    {
      icon: <FaInstagram />,
      href: "#",
      label: "Instagram",
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: <FaLinkedinIn />,
      href: "#",
      label: "LinkedIn",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: <FaGithub />,
      href: "#",
      label: "GitHub",
      color: "from-gray-700 to-gray-800",
    },
  ];

  return (
    <footer className="relative overflow-hidden">

      {/* Footer Content */}
      <div className="relative z-10 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Brand Section */}
            <motion.div
              variants={itemVariants}
              className="col-span-1 lg:col-span-2"
            >
              <div className="flex items-center mb-4">
              
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  {t("footer.brandName")}
                </h2>
              </div>
              <p className="text-gray-800  max-w-md mb-6">
                {t("footer.description")}
              </p>
            </motion.div>

            {/* Links Section */}
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-semibold text-gray-800  uppercase tracking-wider mb-4">
                {t("footer.linksTitle")}
              </h3>
              <ul className="space-y-3">
                {["Home", "Features", "Pricing", "About", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                      >
                        {t(`footer.links.${item.toLowerCase()}`)}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </motion.div>

            {/* Contact Section */}
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-semibold text-gray-800  uppercase tracking-wider mb-4">
                {t("footer.contactTitle")}
              </h3>
              <div className="space-y-3">
                <p className="text-gray-600  flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {t("footer.email")}
                </p>
                <p className="text-gray-600 dark:text-gray-400 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {t("footer.phone")}
                </p>
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
                  {t("footer.socialTitle")}
                </h3>
                <div className="flex space-x-3">
                  {socialLinks.map((social, i) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      custom={i}
                      className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${social.color} text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent my-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />

          {/* Copyright */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} {t("footer.copyright")}
            </p>
            <div className="flex space-x-6">
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-400 text-sm hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
              >
                {t("footer.privacyPolicy")}
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-400 text-sm hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
              >
                {t("footer.termsOfService")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl z-50"
        whileHover={{
          y: -5,
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        aria-label={t("footer.backToTop")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </footer>
  );
};

export default Footer;
