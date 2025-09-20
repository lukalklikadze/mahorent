import { useNavigate } from "react-router-dom";
import WhatsappLogo from "../assets/Whatsapp.svg";
import TelegramLogo from "../assets/Telegram.svg";
import SocialsContact from "./socialsContact";
import TranslationWidget from "./translationWidget";
import logoSrc from "../assets/ MahoTravel.svg";

const Header = () => {
  const navigate = useNavigate();
  const whatsappUrl = "https://wa.me/995597561305?text=Hello%20there";
  const telegramUrl = "https://t.me/Guido_Gallagher";
  const whatsappName = "(+995) 597 56 13 05";
  const telegramName = "@Maho_Travel";

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/30 backdrop-blur-md border-b border-white/20 flex flex-col md:flex-row items-center py-2 px-3 sm:px-4 md:px-6 lg:px-6 shadow-sm gap-2 md:gap-0">
      <div className="flex items-center justify-between w-full md:w-auto">
        <button
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
          className="cursor-pointer h-12 sm:h-16 md:h-20 lg:h-20 overflow-hidden transition-transform hover:scale-105"
        >
          <img
            src={logoSrc}
            className="h-20 sm:h-28 md:h-40 lg:h-40 -mt-4 sm:-mt-6 md:-mt-9 lg:-mt-9"
            alt="Logo"
          />
        </button>
        <div className="flex md:hidden items-center gap-x-2">
          <TranslationWidget />
          <SocialsContact
            logo={
              <img
                src={WhatsappLogo}
                className="h-4 w-4 sm:h-5 sm:w-5"
                alt="WhatsApp"
              />
            }
            url={whatsappUrl}
            user="Whatsapp"
            isMobile={true}
          />
          <SocialsContact
            logo={
              <img
                src={TelegramLogo}
                className="h-4 w-4 sm:h-5 sm:w-5"
                alt="Telegram"
              />
            }
            url={telegramUrl}
            user="Telegram"
            isMobile={true}
          />
        </div>
      </div>
      <div className="hidden md:flex ml-auto items-center gap-x-3">
        <TranslationWidget />
        <SocialsContact
          logo={<img src={WhatsappLogo} className="h-6 w-6" alt="WhatsApp" />}
          url={whatsappUrl}
          user={whatsappName}
        />
        <SocialsContact
          logo={<img src={TelegramLogo} className="h-6 w-6" alt="Telegram" />}
          url={telegramUrl}
          user={telegramName}
        />
      </div>
    </header>
  );
};

export default Header;
