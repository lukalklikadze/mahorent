import { Link } from "react-router-dom";
import SettingsIcon from "../assets/Settings.svg";
import FuelIcon from "../assets/Fuel.svg";
import ShipWheelIcon from "../assets/Wheel.svg";
import { translations } from "../translations";
import useLanguage from "../hooks/useLanguage";

interface CarCardProps {
  id: string;
  photo: string;
  name: string;
  location: string;
  gearsType: string;
  steeringWheelSide: string;
  fuel: string;
  prevPrice: string;
  newPrice: string;
}

const CarCard = ({
  id,
  photo,
  name,
  location,
  gearsType,
  steeringWheelSide,
  fuel,
  prevPrice,
  newPrice,
}: CarCardProps) => {
  const { lang } = useLanguage();
  const t = translations[lang];

  const getTranslatedFuel = (fuelType: string): string => {
    return t.fuel[fuelType as keyof typeof t.fuel] || fuelType;
  };

  const getTranslatedGears = (gearsType: string): string => {
    return t.gears[gearsType as keyof typeof t.gears] || gearsType;
  };

  const getTranslatedSteering = (steeringType: string): string => {
    return t.steering[steeringType as keyof typeof t.steering] || steeringType;
  };

  return (
    <Link
      to={`/cars/${id}`}
      className="w-full max-w-sm bg-white rounded-2xl shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105 p-4 flex flex-col items-center cursor-pointer text-left"
    >
      <h2 className="text-base md:text-lg lg:text-xl font-semibold text-center mb-2">
        {name}
      </h2>
      <img
        src={photo}
        alt={name}
        className="w-full h-40 md:h-48 lg:h-56 object-cover rounded-xl mb-3"
      />
      <p className="text-xs md:text-sm lg:text-base text-gray-500 mb-3 text-center">
        {location}
      </p>
      <div className="flex justify-around w-full mb-4">
        <div className="flex items-center gap-1">
          <img
            src={FuelIcon}
            alt="Fuel"
            className="w-5 h-5 md:w-5 md:h-5"
            style={{ filter: "hue-rotate(120deg) saturate(1.5)" }} // Green tint
          />
          <span className="text-xs md:text-sm">{getTranslatedFuel(fuel)}</span>
        </div>
        <div className="flex items-center gap-1">
          <img
            src={SettingsIcon}
            alt="Settings"
            className="w-5 h-5 md:w-5 md:h-5"
            style={{ filter: "hue-rotate(240deg) saturate(1.5)" }} // Blue tint
          />
          <span className="text-xs md:text-sm">
            {getTranslatedGears(gearsType)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <img
            src={ShipWheelIcon}
            alt="Steering Wheel"
            className="w-5 h-5 md:w-5 md:h-5"
            style={{ filter: "hue-rotate(30deg) saturate(1.5)" }} // Orange tint
          />
          <span className="text-xs md:text-sm">
            {getTranslatedSteering(steeringWheelSide)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm md:text-base text-red-500 line-through">
          {prevPrice}
        </span>
        <span className="text-sm md:text-base text-green-600 font-bold">
          {newPrice} / {t.day}
        </span>
      </div>
    </Link>
  );
};

export default CarCard;
