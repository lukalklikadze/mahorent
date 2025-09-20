import FbLogo from "../assets/FacebookLogo.svg";
import InstaLogo from "../assets/InstagramLogo.svg";
import { translations } from "../translations";
import useLanguage from "../hooks/useLanguage";
import { Link } from "react-router-dom";

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

          <Link
            to="/faq"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            {t.faq}
          </Link>

          <div className="flex gap-3 mt-4">
            <a
              href="https://www.instagram.com/maho__travel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 transition-colors duration-200"
            >
              <img src={InstaLogo} alt="Instagram" className="w-8.5 h-8.5" />
            </a>
            <a
              href="https://www.facebook.com/vanya.holdik.35"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 transition-colors duration-200"
            >
              <img src={FbLogo} alt="Facebook" className="w-9 h-9 -mt-0.5" />
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-48 md:h-40 rounded-lg overflow-hidden">
          <iframe
            title={t.ourLocation}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23622.116972439562!2d42.658116383897045!3d42.26219885903183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x405c8d7249ea41df%3A0x1372b0fd62d19253!2sold%20kutaisi!5e0!3m2!1sen!2sge!4v1758225847059!5m2!1sen!2sge"
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
