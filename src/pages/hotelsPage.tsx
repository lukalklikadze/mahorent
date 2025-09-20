import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HotelCard from "../components/hotelCard";
import { translations } from "../translations";
import useLanguage from "../hooks/useLanguage";
import { hotelAPI, type Hotel } from "../API";
import BookingCalendar from "../components/bookingCalendar";
import { formatDateForDisplay } from "../utils";

const HotelsPage = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const navigate = useNavigate();

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilterDates, setSelectedFilterDates] = useState<Date[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);

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

  useEffect(() => {
    filterHotelsByDates();
  }, [hotels, selectedFilterDates]);

  const filterHotelsByDates = () => {
    if (selectedFilterDates.length === 0) {
      setFilteredHotels(hotels);
      return;
    }

    const selectedDatesStrings = selectedFilterDates.map((date) =>
      formatDateForDisplay(date)
    );

    const availableHotels = hotels.filter((hotel) => {
      const bookedDates = hotel.bookedDates || [];
      return selectedDatesStrings.every(
        (selectedDate) => !bookedDates.includes(selectedDate)
      );
    });

    setFilteredHotels(availableHotels);
  };

  const handleClearFilter = () => {
    setSelectedFilterDates([]);
  };

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
      <p className="text-gray-600 text-base md:text-lg mb-6 text-center max-w-2xl">
        {t.hotelsDescription}
      </p>

      <div className="w-full max-w-6xl mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-yellow-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="text-xl font-bold text-yellow-800">
              {t.filterByDates || "Filter by Available Dates"}
            </h2>
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
            >
              {showCalendar
                ? t.hideCalendar || "Hide Calendar"
                : t.showCalendar || "Show Calendar"}
            </button>
          </div>

          {showCalendar && (
            <div className="mb-6">
              <BookingCalendar
                bookedDates={[]}
                selectedDates={selectedFilterDates}
                onDatesChange={setSelectedFilterDates}
                theme="yellow"
              />
            </div>
          )}

          {selectedFilterDates.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-yellow-800">
                  {t.selectedDates || "Selected Filter Dates"}:
                </h3>
                <button
                  onClick={handleClearFilter}
                  className="px-3 py-1 text-sm bg-yellow-200 text-yellow-800 rounded-md hover:bg-yellow-300 transition font-medium"
                >
                  {t.clearFilter || "Clear Filter"}
                </button>
              </div>
              <div className="flex flex-wrap gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                {selectedFilterDates.map((date, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium"
                  >
                    {formatDateForDisplay(date)}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="text-center text-sm text-gray-600">
            {selectedFilterDates.length === 0 ? (
              <p>
                {t.showingAllHotels || `Showing all ${hotels.length} hotels`}
              </p>
            ) : (
              <p>
                {t.showingFilteredHotels ||
                  `Showing ${filteredHotels.length} available hotels for selected dates`}
              </p>
            )}
          </div>
        </div>
      </div>

      {filteredHotels.length === 0 && selectedFilterDates.length > 0 ? (
        <div className="text-center py-12 w-full max-w-6xl">
          <div className="text-6xl mb-4">🏨</div>
          <h3 className="text-2xl font-bold text-yellow-800 mb-2">
            {t.noHotelsAvailable || "No Hotels Available"}
          </h3>
          <p className="text-gray-600 mb-6">
            {t.noHotelsAvailableMessage ||
              "No hotels are available for your selected dates. Try different dates or clear the filter."}
          </p>
          <button
            onClick={handleClearFilter}
            className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
          >
            {t.clearFilter || "Clear Filter"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {filteredHotels.map((hotel) => (
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
      )}

      {hotels.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No hotels available at the moment.
        </div>
      )}
    </div>
  );
};

export default HotelsPage;
