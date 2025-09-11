import type { ReactElement, SVGProps } from "react";
import { translations } from "../translations";
import useLanguage from "../hooks/useLanguage";

interface ContactProps {
  logo: ReactElement<SVGProps<SVGSVGElement>>;
  url: string;
  user: string;
  isMobile?: boolean;
}

const SocialsContact = ({
  logo,
  url,
  user,
  isMobile = false,
}: ContactProps) => {
  const { lang } = useLanguage();
  const t = translations[lang];

  const getContactTitle = () => {
    if (user.includes("Whatsapp") || user.includes("WhatsApp")) {
      return t.whatsappContact || "WhatsApp Contact";
    }
    if (user.includes("Telegram")) {
      return t.telegramContact || "Telegram Contact";
    }
    return user;
  };

  return (
    <button
      onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
      className={`cursor-pointer flex items-center gap-x-2 rounded-xl bg-blue-700 backdrop-blur-md border border-white/20 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ${
        isMobile ? "px-2 py-1" : "px-4 py-2"
      }`}
      title={getContactTitle()}
    >
      <span className="flex items-center">{logo}</span>
      <span
        className={`text-white font-semibold ${
          isMobile ? "text-xs" : "text-sm"
        }`}
      >
        {user}
      </span>
    </button>
  );
};

export default SocialsContact;
