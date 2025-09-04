import TourCard from "../components/tourCard";
import TourPhoto from "../assets/TourSample.jpg";

const ToursPage = () => {
  const tours = [
    {
      photo: TourPhoto,
      name: "Tbilisi City Tour",
      prevPrice: "$100",
      newPrice: "$80",
    },
    {
      photo: TourPhoto,
      name: "Batumi Beach Adventure",
      prevPrice: "$150",
      newPrice: "$120",
    },
    {
      photo: TourPhoto,
      name: "Kazbegi Mountain Trip",
      prevPrice: "$200",
      newPrice: "$170",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-white p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        Our Tours
      </h1>

      <p className="text-gray-600 text-base md:text-lg mb-10 text-center max-w-2xl">
        Explore the best tours in Georgia. From city tours to mountain
        adventures, find the perfect experience for your trip.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {tours.map((tour, index) => (
          <TourCard id={`tour-${index}`} key={index} {...tour} />
        ))}
      </div>
    </div>
  );
};

export default ToursPage;
