import { useParams } from "react-router-dom";
import { translations } from "../translations";
import useLanguage from "../hooks/useLanguage";

const CarDetailsPage = () => {
  const { id } = useParams();
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">{t.carDetails}</h1>
      <p className="text-lg text-gray-700 mb-6">
        {t.detailsFor} {t.cars.toLowerCase()} {t.withId} {id}
      </p>
      <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-green-700 transition">
        {t.bookNow}
      </button>
    </div>
  );
};

export default CarDetailsPage;
