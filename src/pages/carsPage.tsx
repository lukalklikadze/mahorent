import CarCard from "../components/carCard";
import Tesla from "../assets/Tesla.jpg";
const CarsPage = () => {
  // Example data (you can replace with API or DB later)
  const cars = [
    {
      photo: Tesla,
      name: "Toyota Prius",
      location: "Tbilisi",
      gearsType: "Automatic",
      steeringWheelSide: "Left",
      fuel: "Hybrid",
      prevPrice: "$40/day",
      newPrice: "$30/day",
    },
    {
      photo: Tesla,
      name: "Hyundai Tucson",
      location: "Batumi",
      gearsType: "Automatic",
      steeringWheelSide: "Left",
      fuel: "Petrol",
      prevPrice: "$60/day",
      newPrice: "$45/day",
    },
    {
      photo: Tesla,
      name: "Mercedes-Benz C-Class",
      location: "Kutaisi",
      gearsType: "Automatic",
      steeringWheelSide: "Left",
      fuel: "Diesel",
      prevPrice: "$90/day",
      newPrice: "$70/day",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        Our Cars
      </h1>

      <p className="text-gray-600 text-base md:text-lg mb-10 text-center max-w-2xl">
        Choose from a wide range of comfortable, reliable, and affordable cars
        for your journey across Georgia. Whether it’s for city rides or mountain
        trips, we’ve got you covered.
      </p>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {cars.map((car, index) => (
          <CarCard id={"tesla"} key={index} {...car} />
        ))}
      </div>
    </div>
  );
};

export default CarsPage;
