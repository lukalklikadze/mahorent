import useLanguage from "../hooks/useLanguage";

const TranslationWidget = () => {
  const { lang, changeLanguage } = useLanguage();
  const languages = [
    { code: "en" as const, name: "EN", flag: "🇺🇸", fullName: "English" },
    { code: "ka" as const, name: "ქარ", flag: "🇬🇪", fullName: "ქართული" },
    { code: "ru" as const, name: "РУ", flag: "🇷🇺", fullName: "Русский" },
  ];

  const handleLanguageChange = (newLang: (typeof languages)[0]["code"]) => {
    changeLanguage(newLang);
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-1 sm:gap-2 translation-buttons">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex flex-col items-center justify-center touch-manipulation cursor-pointer bg-white/90 backdrop-blur-sm shadow-lg hover:scale-105 hover:shadow-xl ${
              lang === language.code
                ? "text-blue-600 shadow-xl scale-105 border-2 border-blue-600 bg-blue-50/90"
                : "text-gray-700 border border-gray-400 hover:border-gray-500 hover:bg-gray-50/80 active:bg-gray-100/60"
            }`}
            style={{
              WebkitTapHighlightColor: "transparent",
              userSelect: "none",
              touchAction: "manipulation",
            }}
            title={language.fullName}
            type="button"
          >
            <span className="text-[10px] sm:text-xs md:text-sm pointer-events-none block leading-none mb-0.5">
              {language.flag}
            </span>
            <span className="text-[7px] sm:text-[8px] md:text-[9px] pointer-events-none leading-none font-semibold">
              {language.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TranslationWidget;
