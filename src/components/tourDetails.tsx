import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { translations } from "../translations";
import useLanguage from "../hooks/useLanguage";
import { tourAPI, type Tour } from "../API";
import BookingCalendar from "./bookingCalendar";

const TourDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = translations[lang];

  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    fetchTourDetails();
  }, [id]);

  useEffect(() => {
    if (!tour?.photos || tour.photos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % tour.photos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [tour?.photos]);

  const fetchTourDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const tourData = await tourAPI.getById(id!);
      setTour(tourData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch tour details"
      );
      console.error("Error fetching tour details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPhoto = () => {
    if (!tour?.photos || tour.photos.length <= 1) return;
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? tour.photos.length - 1 : prevIndex - 1
    );
  };

  const handleNextPhoto = () => {
    if (!tour?.photos || tour.photos.length <= 1) return;
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % tour.photos.length);
  };

  const handleBooking = async () => {
    if (!tour?._id || !selectedDate) return;

    try {
      setBooking(true);
      const dateString = selectedDate.toISOString().split("T")[0];
      const updatedTour = await tourAPI.book(tour._id, [dateString]);
      setTour(updatedTour);
      setSelectedDate(null);
      alert(t.bookingSuccess || "Booking successful!");
    } catch (err) {
      console.error(err);
      alert(t.bookingError || "Failed to book. Please try again.");
    } finally {
      setBooking(false);
    }
  };

  const handleClearSelectedDate = () => {
    setSelectedDate(null);
  };

  const handleDateChange = (dates: Date[]) => {
    if (dates.length > 0) {
      setSelectedDate(dates[dates.length - 1]); // Take the most recently selected date
    } else {
      setSelectedDate(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="text-xl text-purple-800">
          {t.loading || "Loading..."}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="text-xl text-red-600">
          {t.error || "Error"}: {error}
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="text-xl text-red-600">
          {t.tourNotFound || "Tour not found"}
        </div>
      </div>
    );
  }

  const currentPhoto = tour.photos[currentPhotoIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-6 py-3 bg-purple-800 text-white rounded-lg hover:bg-purple-900 transition transform hover:scale-105 text-sm sm:text-base font-medium mt-3"
        >
          {t.back || "Back"}
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">
            {tour.name}
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            {t.tourDetailsDescription ||
              "Select your preferred date and book this amazing tour to explore Georgia's best destinations."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit border-2 border-purple-100">
            <div className="relative mb-6 group">
              <img
                src={currentPhoto}
                alt={`${tour.name} - Image ${currentPhotoIndex + 1}`}
                className="w-full h-48 sm:h-64 md:h-72 object-cover rounded-xl transition-opacity duration-300"
              />

              {tour.photos && tour.photos.length > 1 && (
                <>
                  <button
                    onClick={handlePreviousPhoto}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-purple-800 bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
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
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-800 bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
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
                    {tour.photos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPhotoIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentPhotoIndex
                            ? "bg-purple-400"
                            : "bg-white bg-opacity-50 hover:bg-opacity-70"
                        }`}
                        aria-label={`Go to photo ${index + 1}`}
                      />
                    ))}
                  </div>

                  <div className="absolute top-4 right-4 bg-purple-800 bg-opacity-70 text-white text-sm px-3 py-1 rounded-full">
                    {currentPhotoIndex + 1} / {tour.photos.length}
                  </div>
                </>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-purple-800">
                {tour.name}
              </h2>

              {tour.destinations && tour.destinations.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-3 text-purple-700">
                    {t.destinations || "Destinations"}:
                  </h3>
                  <ul className="space-y-2 ml-4">
                    {tour.destinations.map((destination, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold mt-1">
                          •
                        </span>
                        <span className="text-gray-700">{destination}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-500 mt-3 italic">
                    {t.ticketsNotIncluded ||
                      "* Tickets to attractions are not included"}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200">
              <span className="text-base sm:text-lg text-red-500 line-through">
                {tour.prevPrice}
              </span>
              <span className="text-xl sm:text-2xl text-purple-600 font-bold">
                {tour.newPrice}
              </span>
              <span className="text-sm text-gray-600">
                / {t.person || "person"}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-100">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-purple-800 text-center">
              {t.selectDate || "Select Date"}
            </h2>

            <BookingCalendar
              bookedDates={tour.bookedDates || []}
              selectedDates={selectedDate ? [selectedDate] : []}
              onDatesChange={handleDateChange}
              singleDateMode={true}
            />

            {selectedDate && (
              <div className="mb-6 mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm sm:text-base text-purple-800">
                    {t.selectedDate || "Selected Date"}:
                  </h3>
                  <button
                    onClick={handleClearSelectedDate}
                    className="px-3 py-1 text-xs sm:text-sm bg-purple-200 text-purple-800 rounded-md hover:bg-purple-300 transition font-medium"
                  >
                    {t.clear || "Clear"}
                  </button>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <span className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-xs sm:text-sm font-medium">
                    {selectedDate.toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}

            <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold mb-3 text-sm text-purple-800">
                {t.legend || "Legend"}:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-gray-700">{t.booked || "Booked"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
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
              disabled={!selectedDate || booking}
              className={`w-full py-4 px-6 font-bold rounded-xl transition text-sm sm:text-base ${
                selectedDate && !booking
                  ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700 transform hover:scale-105 shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {booking ? t.booking || "Booking..." : t.bookNow || "Book Now"}
            </button>

            {!selectedDate && (
              <p className="text-center text-gray-500 text-xs sm:text-sm mt-3">
                {t.selectDatePrompt || "Please select a date to book"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailsPage;
