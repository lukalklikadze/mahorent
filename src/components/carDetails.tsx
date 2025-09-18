import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GearsLogo from "../assets/GearsLogo.png";
import GasLogo from "../assets/GasLogo.png";
import WheelLogo from "../assets/WheelLogo.png";
import { translations } from "../translations";
import useLanguage from "../hooks/useLanguage";
import { carAPI, type Car } from "../API";
import BookingCalendar from "./bookingCalendar";
import BookingPopup from "./bookingPopup";
import { formatDateForDisplay } from "../utils";

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = translations[lang];

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showBookingPopup, setShowBookingPopup] = useState(false);

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  useEffect(() => {
    if (!car?.photos || car.photos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % car.photos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [car?.photos]);

  const fetchCarDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const carData = await carAPI.getById(id!);
      setCar(carData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch car details"
      );
      console.error("Error fetching car details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPhoto = () => {
    if (!car?.photos || car.photos.length <= 1) return;
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? car.photos.length - 1 : prevIndex - 1
    );
  };

  const handleNextPhoto = () => {
    if (!car?.photos || car.photos.length <= 1) return;
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % car.photos.length);
  };

  const getTranslatedFuel = (fuelType: string): string => {
    return t.fuel[fuelType as keyof typeof t.fuel] || fuelType;
  };

  const getTranslatedGears = (gearsType: string): string => {
    return t.gears[gearsType as keyof typeof t.gears] || gearsType;
  };

  const getTranslatedSteering = (steeringType: string): string => {
    return t.steering[steeringType as keyof typeof t.steering] || steeringType;
  };

  const extractNumericPrice = (priceString: string): number => {
    const match = priceString.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const calculateTotalPrice = (): string => {
    if (!car?.newPrice || selectedDates.length === 0) return "";
    const dailyPrice = extractNumericPrice(car.newPrice);
    const total = dailyPrice * selectedDates.length;
    return `${total}$`;
  };

  const handleBooking = () => {
    if (!car?._id || selectedDates.length === 0) return;
    setShowBookingPopup(true);
  };

  const handleClearSelectedDates = () => {
    setSelectedDates([]);
  };

  const handleClosePopup = () => {
    setShowBookingPopup(false);
  };

  const handleBookingSuccess = async () => {
    console.log("Car booked successfully!");
    setShowBookingPopup(false);
    setSelectedDates([]);
    await fetchCarDetails();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="text-xl text-blue-800">{t.loading || "Loading..."}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="text-xl text-red-600">
          {t.error || "Error"}: {error}
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="text-xl text-red-600">
          {t.carNotFound || "Car not found"}
        </div>
      </div>
    );
  }

  const currentPhoto = car.photos[currentPhotoIndex];

  const selectedDatesStrings = selectedDates.map((date) =>
    formatDateForDisplay(date)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-6 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition transform hover:scale-105 text-sm sm:text-base font-medium mt-3"
        >
          {t.back || "Back"}
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            {car.name}
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            {t.carDetailsDescription ||
              "Choose your dates and book this amazing car for your journey across Georgia."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit border-2 border-blue-100">
            <div className="relative mb-6 group">
              <img
                src={currentPhoto}
                alt={`${car.name} - Image ${currentPhotoIndex + 1}`}
                className="w-full h-48 sm:h-64 md:h-72 object-cover rounded-xl transition-opacity duration-300"
              />

              {car.photos && car.photos.length > 1 && (
                <>
                  <button
                    onClick={handlePreviousPhoto}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-800 bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                    aria-label="Previous photo"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={handleNextPhoto}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-800 bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                    aria-label="Next photo"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {car.photos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPhotoIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentPhotoIndex
                            ? "bg-blue-400"
                            : "bg-white bg-opacity-50 hover:bg-opacity-70"
                        }`}
                        aria-label={`Go to photo ${index + 1}`}
                      />
                    ))}
                  </div>

                  <div className="absolute top-4 right-4 bg-blue-800 bg-opacity-70 text-white text-sm px-3 py-1 rounded-full">
                    {currentPhotoIndex + 1} / {car.photos.length}
                  </div>
                </>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-blue-800">
                {car.name}
              </h2>
              <p className="text-gray-600 mb-4 text-sm sm:text-base flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                {car.location}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <img
                  src={GasLogo}
                  alt="Fuel"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
                <span className="text-sm sm:text-base font-medium text-blue-800">
                  {getTranslatedFuel(car.fuel)}
                </span>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <img
                  src={GearsLogo}
                  alt="Gears"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
                <span className="text-sm sm:text-base font-medium text-blue-800">
                  {getTranslatedGears(car.gearsType)}
                </span>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <img
                  src={WheelLogo}
                  alt="Steering"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
                <span className="text-sm sm:text-base font-medium text-blue-800">
                  {getTranslatedSteering(car.steeringWheelSide)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <span className="text-base sm:text-lg text-red-500 line-through">
                {car.prevPrice}
              </span>
              <span className="text-xl sm:text-2xl text-blue-600 font-bold">
                {car.newPrice}
              </span>
              <span className="text-sm text-gray-600">/ {t.day || "day"}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-blue-800 text-center">
              {t.selectDates || "Select Dates"}
            </h2>

            <BookingCalendar
              bookedDates={car.bookedDates || []}
              selectedDates={selectedDates}
              onDatesChange={setSelectedDates}
            />

            {selectedDates.length > 0 && (
              <div className="mb-6 mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm sm:text-base text-blue-800">
                    {t.selectedDates || "Selected Dates"}:
                  </h3>
                  <button
                    onClick={handleClearSelectedDates}
                    className="px-3 py-1 text-xs sm:text-sm bg-blue-200 text-blue-800 rounded-md hover:bg-blue-300 transition font-medium"
                  >
                    {t.clearAll || "Clear All"}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mb-4 max-h-32 overflow-y-auto p-3 bg-blue-50 rounded-lg border border-blue-200">
                  {selectedDates.map((date, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs sm:text-sm font-medium"
                    >
                      {formatDateForDisplay(date)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-3 text-sm text-blue-800">
                {t.legend || "Legend"}:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-gray-700">{t.booked || "Booked"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-gray-700">
                    {t.selected || "Selected"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded"></div>
                  <span className="text-gray-700">
                    {t.available || "Available"}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={selectedDates.length === 0}
              className={`w-full py-4 px-6 font-bold rounded-xl transition text-sm sm:text-base ${
                selectedDates.length > 0
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {t.bookNow || "Book Now"}
            </button>

            {selectedDates.length === 0 && (
              <p className="text-center text-gray-500 text-xs sm:text-sm mt-3">
                {t.selectDatesPrompt ||
                  "Please select at least one date to book"}
              </p>
            )}
          </div>
        </div>
      </div>

      <BookingPopup
        isOpen={showBookingPopup}
        onClose={handleClosePopup}
        selectedDates={selectedDatesStrings}
        itemName={car?.name}
        pricePerDay={car?.newPrice}
        totalPrice={calculateTotalPrice()}
        itemId={car?._id}
        itemType="car"
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
};

export default CarDetailsPage;
