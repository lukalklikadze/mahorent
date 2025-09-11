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
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-col gap-2 translation-buttons">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`w-12 h-12 rounded-full text-sm font-medium transition-all duration-200 flex flex-col items-center justify-center touch-manipulation cursor-pointer bg-white/90 backdrop-blur-sm border border-white/40 shadow-lg hover:scale-105 hover:shadow-xl ${
              lang === language.code
                ? "text-blue-600 shadow-xl scale-105 border-blue-400"
                : "text-gray-700 hover:bg-white hover:text-gray-800 active:bg-gray-50"
            }`}
            style={{
              WebkitTapHighlightColor: "transparent",
              userSelect: "none",
              touchAction: "manipulation",
            }}
            title={language.fullName}
            type="button"
          >
            <span className="text-base pointer-events-none block leading-none mb-0.5">
              {language.flag}
            </span>
            <span className="text-xs pointer-events-none leading-none font-semibold">
              {language.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TranslationWidget;
