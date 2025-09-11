import { useState, useEffect } from "react";

type Language = "en" | "ka" | "ru";

const useLanguage = () => {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLanguage") as Language;
    if (savedLang && ["en", "ka", "ru"].includes(savedLang)) {
      setLang(savedLang);
    }
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("selectedLanguage", newLang);
  };

  return { lang, changeLanguage };
};

export default useLanguage;
