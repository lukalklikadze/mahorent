import { useEffect, useState } from "react";

interface GoogleTranslateElement {
  new (options: GoogleTranslateOptions, elementId: string): void;
  InlineLayout: {
    SIMPLE: number;
  };
}

interface GoogleTranslateOptions {
  pageLanguage: string;
  includedLanguages: string;
  layout: number;
  autoDisplay: boolean;
  multilanguagePage: boolean;
}

interface GoogleTranslate {
  TranslateElement: GoogleTranslateElement;
}

interface GoogleAPI {
  translate: GoogleTranslate;
}

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: GoogleAPI;
  }
}

const TranslationWidget = () => {
  const getCurrentLanguageFromCookie = (): string => {
    const cookies = document.cookie.split(";");
    const googtransCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("googtrans=")
    );

    if (googtransCookie) {
      const value = googtransCookie.split("=")[1];
      const match = value.match(/\/en\/(.+)/);
      if (match) {
        return match[1];
      }
    }

    return "en";
  };

  const [currentLanguage, setCurrentLanguage] = useState(() =>
    getCurrentLanguageFromCookie()
  );
  const [isLoaded, setIsLoaded] = useState(false);

  const languages = [
    { code: "en", name: "EN", flag: "🇺🇸", fullName: "English" },
    { code: "ka", name: "ქარ", flag: "🇬🇪", fullName: "ქართული" },
    { code: "ru", name: "РУ", flag: "🇷🇺", fullName: "Русский" },
  ];

  useEffect(() => {
    setCurrentLanguage(getCurrentLanguageFromCookie());

    const addScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.head.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,ka,ru",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true,
          },
          "google_translate_element"
        );
        setIsLoaded(true);
        setTimeout(() => {
          setCurrentLanguage(getCurrentLanguageFromCookie());
        }, 500);
      }
    };

    if (!window.google?.translate) {
      addScript();
    } else if (window.googleTranslateElementInit) {
      window.googleTranslateElementInit();
    }

    const style = document.createElement("style");
    style.innerHTML = `
    /* Hide ALL Google Translate elements */
    .goog-te-banner-frame,
    .goog-te-banner-frame.skiptranslate,
    #goog-gt-,
    .goog-gt-,
    .goog-te-balloon-frame,
    .goog-te-ftab,
    .goog-tooltip,
    .goog-te-spinner-pos,
    .goog-te-combo,
    div[id^="goog-gt-"],
    iframe[id^="goog-gt-"],
    .skiptranslate iframe,
    body > div[style*="position: absolute"][style*="z-index"],
    body > iframe[name^="goog_te"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        max-height: 0 !important;
        overflow: hidden !important;
        position: absolute !important;
        top: -9999px !important;
        left: -9999px !important;
        z-index: -1 !important;
    }

    /* Specifically target the top notification bar */
    body > .skiptranslate,
    body > div.skiptranslate,
    .goog-te-banner-frame.skiptranslate {
        display: none !important;
    }

    /* Reset body positioning */
    body {
        top: 0 !important;
        position: static !important;
        margin-top: 0 !important;
        padding-top: 0 !important;
    }

    /* Hide original element */
    #google_translate_element,
    #google_translate_element * {
        display: none !important;
        height: 0 !important;
        overflow: hidden !important;
    }

    /* Remove any Google Translate related margins/padding */
    html, body {
        margin-top: 0 !important;
        padding-top: 0 !important;
    }

    /* Hide any dynamically created Google elements */
    div[style*="background-color: rgb(255, 255, 255)"][style*="position: absolute"],
    div[style*="border: 1px solid rgb(187, 187, 187)"][style*="position: absolute"] {
        display: none !important;
    }
    `;
    document.head.appendChild(style);

    const hideGoogleElements = () => {
      const bannerFrames = document.querySelectorAll(
        ".goog-te-banner-frame, .skiptranslate"
      );
      bannerFrames.forEach((frame) => {
        (frame as HTMLElement).style.display = "none";
        (frame as HTMLElement).style.visibility = "hidden";
      });

      const gtIframes = document.querySelectorAll('iframe[name^="goog_te"]');
      gtIframes.forEach((iframe) => {
        (iframe as HTMLElement).style.display = "none";
      });

      if (document.body.style.top !== "0px" && document.body.style.top !== "") {
        document.body.style.top = "0px";
      }

      const suspiciousDivs = document.querySelectorAll(
        'body > div[style*="position: absolute"][style*="z-index"]'
      );
      suspiciousDivs.forEach((div) => {
        const style = (div as HTMLElement).style;
        if (
          style.backgroundColor === "rgb(255, 255, 255, 0.2)" ||
          style.border?.includes("187, 187, 187") ||
          style.zIndex === "1000000000"
        ) {
          (div as HTMLElement).style.display = "none";
        }
      });
    };

    hideGoogleElements();
    const hideInterval = setInterval(hideGoogleElements, 100);

    const interval = setInterval(() => {
      const cookieLanguage = getCurrentLanguageFromCookie();
      if (cookieLanguage !== currentLanguage) {
        setCurrentLanguage(cookieLanguage);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(hideInterval);
      const translateElement = document.getElementById(
        "google_translate_element"
      );
      if (translateElement) {
        translateElement.innerHTML = "";
      }
    };
  }, [currentLanguage]);

  const changeLanguage = (langCode: string) => {
    if (!isLoaded && langCode !== "en") return;

    setCurrentLanguage(langCode);

    if (langCode === "en") {
      document.cookie =
        "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      const domain = window.location.hostname;
      document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      const mainDomain = domain.split(".").slice(-2).join(".");
      if (mainDomain !== domain) {
        document.cookie = `googtrans=; path=/; domain=.${mainDomain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
      window.location.reload();
      return;
    }

    const selectElement = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement | null;
    if (selectElement) {
      selectElement.value = langCode;
      selectElement.dispatchEvent(new Event("change"));
      return;
    }

    const domain = window.location.hostname;
    const cookieValue = `/en/${langCode}`;

    document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain}`;

    const mainDomain = domain.split(".").slice(-2).join(".");
    if (mainDomain !== domain) {
      document.cookie = `googtrans=${cookieValue}; path=/; domain=.${mainDomain}`;
    }

    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div id="google_translate_element" className="hidden"></div>

      <div className="flex flex-col gap-2 translation-buttons notranslate">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`
              w-12 h-12 rounded-full text-sm font-medium transition-all duration-200
              flex flex-col items-center justify-center
              touch-manipulation cursor-pointer
              bg-white/90 backdrop-blur-sm border border-white/40 shadow-lg
              hover:scale-105 hover:shadow-xl
              ${
                currentLanguage === lang.code
                  ? " text-blue-600 shadow-xl scale-105 border-blue-400"
                  : "text-gray-700 hover:bg-white hover:text-gray-800 active:bg-gray-50"
              }
            `}
            style={{
              WebkitTapHighlightColor: "transparent",
              userSelect: "none",
              touchAction: "manipulation",
            }}
            title={lang.fullName}
            type="button"
          >
            <span className="text-base pointer-events-none block leading-none mb-0.5">
              {lang.flag}
            </span>
            <span className="text-xs pointer-events-none leading-none font-semibold">
              {lang.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TranslationWidget;
