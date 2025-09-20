import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TourCard from "../components/tourCard";
import { translations } from "../translations";
import useLanguage from "../hooks/useLanguage";
import { tourAPI, type Tour } from "../API";

const ToursPage = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const navigate = useNavigate();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const fetchedTours = await tourAPI.getAll();
        setTours(fetchedTours);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch tours");
        console.error("Error fetching tours:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading tours...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-white p-6">
      <div className="w-full max-w-6xl mb-6">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition transform hover:scale-105 text-sm sm:text-base font-medium"
        >
          {t.back || "Back"}
        </button>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        {t.ourTours}
      </h1>
      <p className="text-gray-600 text-base md:text-lg mb-10 text-center max-w-2xl">
        {t.toursDescription}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {tours.map((tour) => (
          <TourCard
            id={tour._id!}
            key={tour._id}
            photo={tour.photos[0]}
            name={tour.name}
            prevPrice={tour.prevPrice}
            newPrice={tour.newPrice}
          />
        ))}
      </div>
      {tours.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No tours available at the moment.
        </div>
      )}
    </div>
  );
};

export default ToursPage;
