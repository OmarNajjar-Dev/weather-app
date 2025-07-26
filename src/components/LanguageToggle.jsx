import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed bottom-4 right-4 bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
    >
      {language === "en" ? "AR" : "EN"}
    </button>
  );
}
