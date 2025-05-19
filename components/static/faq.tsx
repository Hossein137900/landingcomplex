import { useLanguage } from "@/context/languageContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const FAQ = () => {
  const { t, isRTL } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Get FAQ items with translations
  const faqs = [
    {
      question: t("faq.1.question"),
      answer: t("faq.1.answer"),
    },
    {
      question: t("faq.2.question"),
      answer: t("faq.2.answer"),
    },
    {
      question: t("faq.3.question"),
      answer: t("faq.3.answer"),
    },
    {
      question: t("faq.4.question"),
      answer: t("faq.4.answer"),
    },
    {
      question: t("faq.5.question"),
      answer: t("faq.5.answer"),
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className={`py-20 bg-gradient-to-b from-white to-indigo-50`}
      dir={`${isRTL ? "rtl" : "ltr"}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("faq.title")}
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-indigo-600 mx-auto mb-6"
          />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </motion.div>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <motion.div
                className={`bg-white rounded-xl overflow-hidden border border-blue-200 shadow-sm transition-all duration-300 ${
                  activeIndex === index ? "shadow-md" : "hover:shadow-md"
                }`}
                whileHover={{ scale: activeIndex === index ? 1 : 1.01 }}
              >
                <motion.button
                  className="flex flex-row-reverse justify-between items-center w-full p-6"
                  onClick={() => toggleFAQ(index)}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      activeIndex === index
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200"
                    }`}
                    animate={{
                      rotate: activeIndex === index ? 135 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <FaPlus className="text-sm" />
                  </motion.div>
                  <h3
                    className={`md:text-lg font-semibold  text-gray-900 flex-1 ${
                      isRTL ? "mr-4 text-right" : "ml-4 text-left"
                    }`}
                  >
                    {faq.question}
                  </h3>
                </motion.button>

                <AnimatePresence initial={false}>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.3 },
                          opacity: { duration: 0.3, delay: 0.1 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3 },
                          opacity: { duration: 0.2 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        exit={{ y: -10 }}
                        className={`p-6 pt-0 text-sm md:text-base text-gray-600 text-left ${
                          isRTL ? "text-right " : "text-left "
                        } border-t border-gray-100`}
                      >
                        <div className="bg-indigo-50 p-4 rounded-lg">
                          {faq.answer}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600">
            {t("faq.moreQuestions")}{" "}
            <Link
              href="#contact"
              className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
            >
              {t("faq.contactUs")}
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
