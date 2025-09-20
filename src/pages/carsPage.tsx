import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "../components/carCard";
import { translations } from "../translations";
import useLanguage from "../hooks/useLanguage";
import { carAPI, type Car } from "../API";
import BookingCalendar from "../components/bookingCalendar";
import { formatDateForDisplay } from "../utils";

const CarsPage = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const navigate = useNavigate();

  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilterDates, setSelectedFilterDates] = useState<Date[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const fetchedCars = await carAPI.getAll();
        setCars(fetchedCars);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch cars");
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    filterCarsByDates();
  }, [cars, selectedFilterDates]);

  const filterCarsByDates = () => {
    if (selectedFilterDates.length === 0) {
      setFilteredCars(cars);
      return;
    }

    const selectedDatesStrings = selectedFilterDates.map((date) =>
      formatDateForDisplay(date)
    );

    const availableCars = cars.filter((car) => {
      const bookedDates = car.bookedDates || [];
      return selectedDatesStrings.every(
        (selectedDate) => !bookedDates.includes(selectedDate)
      );
    });

    setFilteredCars(availableCars);
  };

  const handleClearFilter = () => {
    setSelectedFilterDates([]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading cars...</div>
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="w-full max-w-6xl mb-6">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition transform hover:scale-105 text-sm sm:text-base font-medium"
        >
          {t.back || "Back"}
        </button>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        {t.ourCars}
      </h1>
      <p className="text-gray-600 text-base md:text-lg mb-6 text-center max-w-2xl">
        {t.carsDescription}
      </p>

      <div className="w-full max-w-6xl mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="text-xl font-bold text-blue-800">
              {t.filterByDates || "Filter by Available Dates"}
            </h2>
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
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
                theme="blue"
              />
            </div>
          )}

          {selectedFilterDates.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-blue-800">
                  {t.selectedDates || "Selected Filter Dates"}:
                </h3>
                <button
                  onClick={handleClearFilter}
                  className="px-3 py-1 text-sm bg-blue-200 text-blue-800 rounded-md hover:bg-blue-300 transition font-medium"
                >
                  {t.clearFilter || "Clear Filter"}
                </button>
              </div>
              <div className="flex flex-wrap gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                {selectedFilterDates.map((date, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {formatDateForDisplay(date)}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="text-center text-sm text-gray-600">
            {selectedFilterDates.length === 0 ? (
              <p>{t.showingAllCars || `Showing all ${cars.length} cars`}</p>
            ) : (
              <p>
                {t.showingFilteredCars ||
                  `Showing ${filteredCars.length} available cars for selected dates`}
              </p>
            )}
          </div>
        </div>
      </div>

      {filteredCars.length === 0 && selectedFilterDates.length > 0 ? (
        <div className="text-center py-12 w-full max-w-6xl">
          <div className="text-6xl mb-4">🚗</div>
          <h3 className="text-2xl font-bold text-blue-800 mb-2">
            {t.noCarsAvailable || "No Cars Available"}
          </h3>
          <p className="text-gray-600 mb-6">
            {t.noCarsAvailableMessage ||
              "No cars are available for your selected dates. Try different dates or clear the filter."}
          </p>
          <button
            onClick={handleClearFilter}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {t.clearFilter || "Clear Filter"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {filteredCars.map((car) => (
            <CarCard
              id={car._id!}
              key={car._id}
              photo={car.photos[0]}
              name={car.name}
              location={car.location}
              gearsType={car.gearsType}
              steeringWheelSide={car.steeringWheelSide}
              fuel={car.fuel}
              prevPrice={car.prevPrice}
              newPrice={car.newPrice}
            />
          ))}
        </div>
      )}

      {cars.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No cars available at the moment.
        </div>
      )}
    </div>
  );
};

export default CarsPage;
