import { useState, useEffect } from "react";
import { translations } from "../translations";
import NavigationButton from "../components/navigationButton";
import CarIcon from "../assets/Car.svg";
import HomeIcon from "../assets/Home.svg";
import MapPinIcon from "../assets/MapPin.svg";
import useLanguage from "../hooks/useLanguage";
import TermsModal from "../components/termsModal";

const HomePage = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const hasSeenTerms = sessionStorage.getItem("hasSeenTerms");

    if (!hasSeenTerms) {
      setIsTermsOpen(true);
    }
  }, []);

  const handleCloseTerms = () => {
    setIsTermsOpen(false);
    // Mark that user has seen terms in this session
    sessionStorage.setItem("hasSeenTerms", "true");
  };

  return (
    <>
      <div className="flex flex-col items-center h-screen w-full bg-gradient-to-b from-blue-50 to-white p-4 sm:p-6 md:p-8">
        <div className="text-center mt-3 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 mt-20">
            {t.discover}
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            {t.discoverDescription}
          </p>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-8 mt-10">
          <NavigationButton name={t.cars} path="/cars" icon={CarIcon} />
          <NavigationButton name={t.hotels} path="/hotels" icon={HomeIcon} />
          <NavigationButton name={t.tours} path="/tours" icon={MapPinIcon} />
        </div>

        <div className="mt-auto mb-6">
          <button
            onClick={() => setIsTermsOpen(true)}
            className="text-blue-600 hover:text-blue-800 underline text-sm transition-colors"
          >
            {t.termsAndConditions}
          </button>
        </div>
      </div>

      <TermsModal isOpen={isTermsOpen} onClose={handleCloseTerms} />
    </>
  );
};

export default HomePage;
