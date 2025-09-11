import WhatsappLogo from "../assets/Whatsapp.svg";
import { translations } from "../translations";
import useLanguage from "../hooks/useLanguage";

const FloatingWhatsApp = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  const getWhatsAppMessage = () => {
    const messages = {
      en: "Hello%20there",
      ka: "გამარჯობა",
      ru: "Здравствуйте",
    };
    return messages[lang] || messages.en;
  };

  const whatsappUrl = `https://wa.me/995597561305?text=${getWhatsAppMessage()}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 transition-transform hover:scale-110"
      title={t.whatsappContact || "WhatsApp"}
    >
      <img
        src={WhatsappLogo}
        alt="WhatsApp"
        className="h-12 w-12 sm:h-14 sm:w-14 md:h-18 md:w-18 lg:h-20 lg:w-20 drop-shadow-lg hover:drop-shadow-xl"
      />
    </a>
  );
};

export default FloatingWhatsApp;
