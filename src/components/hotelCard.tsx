import { Link } from "react-router-dom";
import BathroomLogo from "../assets/BathroomLogo.png";
import BedroomLogo from "../assets/BedroomLogo.png";
import BedLogo from "../assets/BedLogo.png";
import { translations } from "../translations";
import useLanguage from "../hooks/useLanguage";

interface HotelCardProps {
  id: string;
  photo: string;
  name: string;
  location: string;
  bedrooms: string;
  beds: string;
  bathrooms: string;
  prevPrice: string;
  newPrice: string;
  tagline?: string;
}

const HotelCard = ({
  id,
  photo,
  name,
  location,
  bedrooms,
  beds,
  bathrooms,
  prevPrice,
  newPrice,
  tagline,
}: HotelCardProps) => {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <Link
      to={`/hotels/${id}`}
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
            src={BedroomLogo}
            alt="Bedrooms"
            className="w-7 h-7 md:w-8 md:h-8"
          />
          <span className="text-xs md:text-sm">
            {bedrooms} {t.bedrooms}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <img src={BedLogo} alt="Beds" className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-xs md:text-sm">
            {beds} {t.beds}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <img
            src={BathroomLogo}
            alt="Bathrooms"
            className="w-5 h-5 md:w-6 md:h-6"
          />
          <span className="text-xs md:text-sm">
            {bathrooms} {t.bathrooms}
          </span>
        </div>
      </div>
      {tagline && (
        <p className="text-xs md:text-sm lg:text-base font-medium text-center mb-2 text-yellow-600">
          ✨ {tagline} ✨
        </p>
      )}
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

export default HotelCard;
