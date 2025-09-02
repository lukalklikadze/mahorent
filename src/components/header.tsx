import { useNavigate } from "react-router-dom";
import WhatsappLogo from "../assets/Whatsapp.svg";
import TelegramLogo from "../assets/Telegram.svg";
import SocialsContact from "./socialsContact";
import logoSrc from "../assets/MahorentLogo.png";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const whatsappUrl = "https://wa.me/995597561305?text=Hello%20there";
  const telegramUrl = "https://t.me/Guido_Gallagher";
  const whatsappName = "(+995) 597 56 13 05";
  const telegramName = "@Maho_Travel";
  const [typedText, setTypedText] = useState("");
  const fullText = "Weelcome to Maho Travel!";
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length - 1) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, []);
  return (
    <header className="w-full bg-white flex justify-start items-center py-0.5 px-4 shadow-md">
      <button
        onClick={() => {
          navigate("/");
          window.location.reload();
        }}
        className="cursor-pointer h-20 overflow-hidden"
      >
        <img src={logoSrc} className="h-40 -mt-9" alt="Logo" />
      </button>
      <span className="text-2xl font-bold text-gray-700">{typedText}</span>
      <div className="ml-auto flex gap-x-2">
        <SocialsContact
          logo={<img src={WhatsappLogo} className="h-8 w-8" />}
          url={whatsappUrl}
          user={whatsappName}
        />
        <SocialsContact
          logo={<img src={TelegramLogo} className="h-8 w-8" />}
          url={telegramUrl}
          user={telegramName}
        />
      </div>
    </header>
  );
};

export default Header;
