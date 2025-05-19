import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { HiOutlineSparkles } from "react-icons/hi";
import { useLanguage } from "@/context/languageContext";

const Pricing = () => {
  const { t, isRTL } = useLanguage();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [isClient, setIsClient] = useState(false);

  // Get pricing plans with translations
  const pricingPlans = [
    {
      id: "basic",
      name: t("pricing.plans.basic.name"),
      price: {
        monthly: t("pricing.plans.basic.price.monthly"),
        yearly: t("pricing.plans.basic.price.yearly"),
      },
      description: t("pricing.plans.basic.description"),
      features: [
        t("pricing.plans.basic.features.websites"),
        t("pricing.plans.basic.features.templates"),
        t("pricing.plans.basic.features.support"),
      ],
      limitations: [
        t("pricing.plans.basic.limitations.domain"),
        t("pricing.plans.basic.limitations.ads"),
        t("pricing.plans.basic.limitations.seo"),
      ],
      recommended: false,
      buttonText: t("pricing.plans.basic.buttonText"),
      accentColor: "from-blue-400 to-cyan-300",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      id: "pro",
      name: t("pricing.plans.pro.name"),
      price: {
        monthly: t("pricing.plans.pro.price.monthly"),
        yearly: t("pricing.plans.pro.price.yearly"),
      },
      description: t("pricing.plans.pro.description"),
      features: [
        t("pricing.plans.pro.features.websites"),
        t("pricing.plans.pro.features.templates"),
        t("pricing.plans.pro.features.support"),
        t("pricing.plans.pro.features.domain"),
        t("pricing.plans.pro.features.noAds"),
        t("pricing.plans.pro.features.seo"),
      ],
      limitations: [],
      recommended: true,
      buttonText: t("pricing.plans.pro.buttonText"),
      accentColor: "from-primary to-indigo-500",
      bgGradient: "from-primary/5 to-indigo-500/5",
      savePercent: 20,
    },
    {
      id: "enterprise",
      name: t("pricing.plans.enterprise.name"),
      price: {
        monthly: t("pricing.plans.enterprise.price.monthly"),
        yearly: t("pricing.plans.enterprise.price.yearly"),
      },
      description: t("pricing.plans.enterprise.description"),
      features: [
        t("pricing.plans.enterprise.features.websites"),
        t("pricing.plans.enterprise.features.templates"),
        t("pricing.plans.enterprise.features.support"),
        t("pricing.plans.enterprise.features.domain"),
        t("pricing.plans.enterprise.features.noAds"),
        t("pricing.plans.enterprise.features.seo"),
        t("pricing.plans.enterprise.features.analytics"),
        t("pricing.plans.enterprise.features.api"),
      ],
      limitations: [],
      recommended: false,
      buttonText: t("pricing.plans.enterprise.buttonText"),
      accentColor: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      savePercent: 20,
    },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const featureItem = {
    hidden: { opacity: 0, x: isRTL ? 10 : -10 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden font-vazir">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-5">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-indigo-500/10 text-black text-sm font-semibold">
              <span className="flex items-center gap-1.5">
                <HiOutlineSparkles className="text-yellow-500" />
                {t("pricing.badge")}
              </span>
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {t("pricing.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            {t("pricing.subtitle")}
          </p>

          {isClient && (
            <motion.div
              className="inline-flex p-1.5 bg-white rounded-xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <button
                className={`relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  billingPeriod === "monthly"
                    ? "text-black shadow-sm bg-gray-200"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setBillingPeriod("monthly")}
              >
                {billingPeriod === "monthly" && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-500 rounded-lg -z-10"
                    layoutId="billingTabBackground"
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                )}
                {t("pricing.billingToggle.monthly")}
              </button>
              <button
                className={`relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  billingPeriod === "yearly"
                    ? "text-black shadow-sm bg-gray-200"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setBillingPeriod("yearly")}
              >
                {billingPeriod === "yearly" && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-500 rounded-lg -z-10"
                    layoutId="billingTabBackground"
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                )}
                {t("pricing.billingToggle.yearly")}
               
              </button>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12 relative"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {pricingPlans.map((plan) => {
            const isHovered = hoveredPlan === plan.id;
            const isSelected = selectedPlan === plan.id;
            const isRecommended = plan.recommended;

            return (
              <motion.div
                key={plan.id}
                variants={item}
                className={`relative ${
                  isRecommended ? "md:-mt-6 md:mb-6 z-20" : "z-10"
                }`}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <AnimatePresence>
                  {(isHovered || isSelected || isRecommended) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`absolute -inset-[1px] bg-gradient-to-r ${plan.accentColor} rounded-2xl blur opacity-60 -z-10 group-hover:opacity-80 transition-all duration-300`}
                    />
                  )}
                </AnimatePresence>

                <div
                  className={`h-full relative rounded-2xl p-0.5 transition-all duration-500 ${
                    isHovered || isSelected || isRecommended
                      ? `bg-gradient-to-r ${plan.accentColor} shadow-lg`
                      : "bg-white/80 shadow border border-gray-100"
                  }`}
                >
                  <div
                    className={`h-full rounded-xl bg-white backdrop-blur-sm p-8 md:p-10 flex flex-col`}
                  >
                    {isRecommended && (
                      <div className="absolute -top-5 inset-x-0 mx-auto w-max">
                        <div className="flex items-center justify-center px-4 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-lg shadow-amber-200">
                          <FaStar
                            className={`text-white ${
                              isRTL ? "ml-1.5" : "mr-1.5"
                            } text-xs`}
                          />
                          <span className="text-white text-sm font-bold">
                            {t("pricing.recommended")}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="mb-6">
                      <h3
                        className={`text-xl font-bold mb-2 ${
                          isHovered || isSelected || isRecommended
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {plan.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span
                          className={`text-4xl font-extrabold ${
                            isHovered || isSelected || isRecommended
                              ? "text-gray-900"
                              : "text-gray-800"
                          }`}
                        >
                          {plan.price[billingPeriod]}
                        </span>
                        {plan.price[billingPeriod] !==
                          t("pricing.plans.basic.price.monthly") && (
                          <span
                            className={`${
                              isRTL ? "mr-2" : "ml-2"
                            } text-gray-500 text-sm`}
                          >
                            {t("pricing.currency")}
                          </span>
                        )}
                      </div>
                
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent my-6"></div>

                    <div className="space-y-5 mb-8">
                      <h4 className="font-semibold text-gray-900">
                        {t("pricing.includes")}:
                      </h4>
                      <motion.ul
                        className="space-y-3"
                        variants={container}
                        initial="hidden"
                        animate="show"
                      >
                        {plan.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center"
                            variants={featureItem}
                            transition={{
                              delay: index * 0.1,
                              duration: 0.3,
                            }}
                          >
                            <span
                              className={`${
                                isRTL ? "ml-2" : "mr-2"
                              } flex-shrink-0 h-5 w-5 bg-gradient-to-r ${
                                plan.accentColor
                              } rounded-full flex items-center justify-center`}
                            >
                              <FaCheck className="h-3 w-3 text-white" />
                            </span>
                            <span className="text-gray-600">{feature}</span>
                          </motion.li>
                        ))}

                        {plan.limitations.map((limitation, index) => (
                          <motion.li
                            key={`limitation-${index}`}
                            className="flex items-center text-gray-400"
                            variants={featureItem}
                            transition={{
                              delay: (plan.features.length + index) * 0.1,
                              duration: 0.3,
                            }}
                          >
                            <span
                              className={`${
                                isRTL ? "ml-2" : "mr-2"
                              } flex-shrink-0 h-5 w-5 border border-gray-200 rounded-full flex items-center justify-center`}
                            >
                              <FaCheck className="h-3 w-3 text-gray-200" />
                            </span>
                            <span>{limitation}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>

                    <div className="mt-auto">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                          isHovered || isSelected || isRecommended
                            ? `bg-gradient-to-r ${plan.accentColor} text-white shadow-md`
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {plan.buttonText}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* FAQ teaser */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <p className="text-gray-600">
            {t("pricing.questions")}{" "}
            <a href="#faq" className="text-primary font-medium hover:underline">
              {t("pricing.faqLink")}
            </a>
          </p>
        </motion.div>

        {/* Money-back guarantee */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <p className="text-sm text-gray-500 flex items-center justify-center">
            <svg
              className={`h-5 w-5 ${isRTL ? "ml-1" : "mr-1"} text-green-500`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {t("pricing.guarantee")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
