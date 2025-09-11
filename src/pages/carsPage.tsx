import { useState, useEffect } from "react";
import CarCard from "../components/carCard";
import { translations } from "../translations";
import useLanguage from "../hooks/useLanguage";
import { carAPI, type Car } from "../API";

const CarsPage = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        {t.ourCars}
      </h1>
      <p className="text-gray-600 text-base md:text-lg mb-10 text-center max-w-2xl">
        {t.carsDescription}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {cars.map((car) => (
          <CarCard
            id={car._id!}
            key={car._id}
            photo={car.photo}
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
      {cars.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No cars available at the moment.
        </div>
      )}
    </div>
  );
};

export default CarsPage;
