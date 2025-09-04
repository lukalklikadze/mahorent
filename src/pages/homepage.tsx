import NavigationButton from "../components/navigationButton";
import CarLogo from "../assets/CarLogo.png";
import HouseLogo from "../assets/HouseLogo.png";
import ToursLogo from "../assets/ToursLogo.png";

const HomePage = () => {
  return (
    <div
      className="flex flex-col items-center 
                 h-screen w-full 
                 bg-gradient-to-b from-blue-50 to-white
                 p-4 sm:p-6 md:p-8"
    >
      {/* Title & Description */}
      <div className="text-center mt-10 mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Discover Georgia with Us
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Based in the heart of Kutaisi, we offer reliable car rentals,
          comfortable hotels, and unforgettable tours across Georgia. Whether
          you’re exploring vibrant cities or breathtaking mountains, we’ve got
          everything you need for your journey.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div
        className="flex flex-col md:flex-row lg:flex-row items-center justify-center 
                   gap-4 sm:gap-6 md:gap-8 lg:gap-8"
      >
        <NavigationButton name="Cars" path="/cars" photo={CarLogo} />
        <NavigationButton name="Hotels" path="/houses" photo={HouseLogo} />
        <NavigationButton name="Tours" path="/tours" photo={ToursLogo} />
      </div>
    </div>
  );
};

export default HomePage;
