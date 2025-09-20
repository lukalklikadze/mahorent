import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HotelCard from "../components/hotelCard";
import { translations } from "../translations";
import useLanguage from "../hooks/useLanguage";
import { hotelAPI, type Hotel } from "../API";

const HotelsPage = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const fetchedHotels = await hotelAPI.getAll();
        setHotels(fetchedHotels);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch hotels");
        console.error("Error fetching hotels:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading hotels...</div>
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-50 to-white p-6">
      <div className="w-full max-w-6xl mb-6">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition transform hover:scale-105 text-sm sm:text-base font-medium"
        >
          {t.back || "Back"}
        </button>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        {t.ourHotels}
      </h1>
      <p className="text-gray-600 text-base md:text-lg mb-10 text-center max-w-2xl">
        {t.hotelsDescription}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {hotels.map((hotel) => (
          <HotelCard
            id={hotel._id!}
            key={hotel._id}
            photo={hotel.photos[0]}
            name={hotel.name}
            location={hotel.location}
            bedrooms={hotel.bedrooms}
            beds={hotel.beds}
            bathrooms={hotel.bathrooms}
            prevPrice={hotel.prevPrice}
            newPrice={hotel.newPrice}
            tagline={hotel.tagline}
          />
        ))}
      </div>
      {hotels.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No hotels available at the moment.
        </div>
      )}
    </div>
  );
};

export default HotelsPage;
