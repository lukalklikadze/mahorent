import { translations } from "../translations";
import NavigationButton from "../components/navigationButton";
import CarLogo from "../assets/CarLogo.png";
import HouseLogo from "../assets/HouseLogo.png";
import ToursLogo from "../assets/ToursLogo.png";
import useLanguage from "../hooks/useLanguage";

const HomePage = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <div className="flex flex-col items-center h-screen w-full bg-gradient-to-b from-blue-50 to-white p-4 sm:p-6 md:p-8">
      <div className="text-center mt-3 mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {t.discover}
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          {t.discoverDescription}
        </p>
      </div>

      <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-8 mt-20">
        <NavigationButton name={t.cars} path="/cars" photo={CarLogo} />
        <NavigationButton name={t.hotels} path="/hotels" photo={HouseLogo} />
        <NavigationButton name={t.tours} path="/tours" photo={ToursLogo} />
      </div>
    </div>
  );
};

export default HomePage;
