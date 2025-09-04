import { Link } from "react-router-dom";
import GearsLogo from "../assets/GearsLogo.png";
import GasLogo from "../assets/GasLogo.png";
import WheelLogo from "../assets/WheelLogo.png";

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
  return (
    <Link
      to={`/cars/${id}`}
      className="w-full max-w-sm bg-white rounded-2xl shadow-md 
             hover:shadow-xl transform transition-transform duration-300 hover:scale-105
             p-4 flex flex-col items-center cursor-pointer text-left"
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
            src={GasLogo}
            alt="Fuel"
            className="w-5 h-5 md:w-8 md:h-8 rounded-full"
          />
          <span className="text-xs md:text-sm">{fuel}</span>
        </div>
        <div className="flex items-center gap-1">
          <img
            src={GearsLogo}
            alt="Gears"
            className="w-5 h-5 md:w-8 md:h-8 rounded-full"
          />
          <span className="text-xs md:text-sm">{gearsType}</span>
        </div>
        <div className="flex items-center gap-1">
          <img
            src={WheelLogo}
            alt="Steering"
            className="w-5 h-5 md:w-8 md:h-8 rounded-full"
          />
          <span className="text-xs md:text-sm">{steeringWheelSide}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm md:text-base text-red-500 line-through">
          {prevPrice}
        </span>
        <span className="text-sm md:text-base text-green-600 font-bold">
          {newPrice}
        </span>
      </div>
    </Link>
  );
};

export default CarCard;
