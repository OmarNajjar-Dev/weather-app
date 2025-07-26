import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem("lang") || "en";
    setLanguage(savedLang);

    // Set document direction for RTL support
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";

    // Load translations
    fetch("/lang.json")
      .then((res) => res.json())
      .then((data) => {
        setTranslations(data);
      })
      .catch((err) => console.error("Error loading translations:", err));
  }, []);

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  const translateWeatherDescription = (description) => {
    const key = description.toLowerCase();
    return translations[language]?.[key] || description;
  };

  const value = {
    language,
    changeLanguage,
    t,
    translateWeatherDescription,
    isRTL: language === "ar",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
