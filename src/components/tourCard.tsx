import { Link } from "react-router-dom";
import { translations } from "../translations";
import useLanguage from "../hooks/useLanguage";

interface TourCardProps {
  id: string;
  photo: string;
  name: string;
  prevPrice: string;
  newPrice: string;
}

const TourCard = ({ id, photo, name, prevPrice, newPrice }: TourCardProps) => {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <Link
      to={`/tours/${id}`}
      className="w-full max-w-sm bg-white rounded-2xl shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105 flex flex-col items-center cursor-pointer text-left"
    >
      <img
        src={photo}
        alt={name}
        className="w-full h-40 md:h-48 lg:h-56 object-cover rounded-t-xl mb-3"
      />
      <h2 className="text-base md:text-lg lg:text-xl font-semibold text-center mb-2 px-4">
        {name}
      </h2>
      <p className="text-lg text-gray-700 mb-6">{t.perPerson}</p>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm md:text-base text-red-500 line-through">
          {prevPrice}
        </span>
        <span className="text-sm md:text-base text-green-600 font-bold">
          {newPrice}
        </span>
      </div>
      <span className="px-4 py-2 bg-purple-600 text-white rounded-full font-medium text-sm hover:bg-purple-700 transition mb-3">
        {t.learnMore}
      </span>
    </Link>
  );
};

export default TourCard;
