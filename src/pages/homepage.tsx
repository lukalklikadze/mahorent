import NavigationButton from "../components/navigationButton";
import CarLogo from "../assets/CarLogo.png";
import HouseLogo from "../assets/HouseLogo.png";
import ToursLogo from "../assets/ToursLogo.png";
import KutaisiImage from "../assets/Kutaisi.png";

const HomePage = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen gap-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${KutaisiImage})` }}
    >
      <NavigationButton name="Cars" path="/cars" photo={CarLogo} />
      <NavigationButton name="Hotels" path="/houses" photo={HouseLogo} />
      <NavigationButton name="Tours" path="/tours" photo={ToursLogo} />
    </div>
  );
};

export default HomePage;
