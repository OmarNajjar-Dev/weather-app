import { useEffect, useState } from "react";

export function updateText(langData) {
  const elements = document.querySelectorAll("[data-key]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-key");
    const value = langData[key];
    if (!value) return;

    if (el.tagName === "INPUT" && "placeholder" in el) {
      el.placeholder = value;
    } else {
      el.textContent = value;
    }
  });
}

export default function LanguageToggle() {
  const [lang, setLang] = useState("en");
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    setLang(savedLang);
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";

    fetch("/lang.json")
      .then((res) => res.json())
      .then((data) => {
        setTranslations(data);
        updateText(data[savedLang]);
      })
      .catch((err) => console.error("Error loading translations:", err));
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ar" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";

    updateText(translations[newLang]);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed bottom-4 right-4 bg-blue-700 text-white px-4 py-2 rounded"
    >
      {lang === "en" ? "AR" : "EN"}
    </button>
  );
}
