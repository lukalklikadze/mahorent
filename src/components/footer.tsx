import FbLogo from "../assets/FacebookLogo.png";
import InstaLogo from "../assets/InstagramLogo.png";
import { translations } from "../translations";
import useLanguage from "../hooks/useLanguage";

const Footer = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <footer className="bg-black text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <h3 className="text-lg font-semibold mb-2">{t.howToFind}</h3>
          <p className="text-sm">+995 597 56 13 05</p>
          <p className="text-sm">MahoTravel@gmail.com</p>
          <p className="text-sm">Georgia, Kutaisi</p>
          <div className="flex gap-3 mt-4">
            <a
              href="https://www.instagram.com/guido__gallagher"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 transition-colors duration-200"
            >
              <img src={InstaLogo} alt="Instagram" className="w-8 h-8" />
            </a>
            <a
              href="https://www.facebook.com/vanya.holdik.35"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 transition-colors duration-200"
            >
              <img src={FbLogo} alt="Facebook" className="w-6 h-6 mt-1" />
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-48 md:h-40 rounded-lg overflow-hidden">
          <iframe
            title={t.ourLocation}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d738.1915413779114!2d42.675496969666135!3d42.26216589071876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x405c8dfcc86b0105%3A0xbc9465329de25aad!2sCar%20Rental%20Mahorent!5e0!3m2!1sen!2sge!4v1757006792192!5m2!1sen!2sge"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <p className="text-center text-gray-400 text-sm mt-6">
        © {new Date().getFullYear()} Maho Travel. {t.allRights}
      </p>
    </footer>
  );
};

export default Footer;
