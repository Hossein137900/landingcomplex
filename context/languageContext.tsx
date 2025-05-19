"use client";
import translations from "@/data/translations";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define available languages
export type Language = "fa" | "en" | "ar";

// Define language direction
export type Direction = "rtl" | "ltr";

// Define translations interface
export interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

// Context interface
interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "fa",
  direction: "rtl",
  setLanguage: () => {},
  t: () => "",
  isRTL: true,
});

// Language provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Get initial language from localStorage or default to Persian
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language") as Language;
      return savedLang || "fa";
    }
    return "fa";
  });

  // Determine direction based on language
  const isRTL = language === "ar" || language === "fa";
  const direction: Direction = isRTL ? "rtl" : "ltr";

  // Update language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  // Update document direction when language changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = direction;
      document.documentElement.lang = language;

      // Add appropriate class for RTL/LTR styling
      if (direction === "rtl") {
        document.documentElement.classList.add("rtl");
        document.documentElement.classList.remove("ltr");
      } else {
        document.documentElement.classList.add("ltr");
        document.documentElement.classList.remove("rtl");
      }
    }
  }, [direction, language]);

  return (
    <LanguageContext.Provider
      value={{ language, direction, setLanguage, t, isRTL }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
