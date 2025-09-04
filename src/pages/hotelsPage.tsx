import HotelCard from "../components/hotelCard";
import HotelPhoto from "../assets/HotelSample.jpg";

const HotelsPage = () => {
  const hotels = [
    {
      photo: HotelPhoto,
      name: "Grand Tbilisi Hotel",
      location: "Tbilisi",
      bedrooms: "3",
      beds: "4",
      bathrooms: "2",
      prevPrice: "$150",
      newPrice: "$120",
      tagline: "In the very center of the city",
    },
    {
      photo: HotelPhoto,
      name: "Batumi Beach Resort",
      location: "Batumi",
      bedrooms: "2",
      beds: "3",
      bathrooms: "1",
      prevPrice: "$200",
      newPrice: "$170",
      tagline: "Steps away from the beach",
    },
    {
      photo: HotelPhoto,
      name: "Kutaisi Grand Palace",
      location: "Kutaisi",
      bedrooms: "4",
      beds: "5",
      bathrooms: "3",
      prevPrice: "$180",
      newPrice: "$150",
      tagline: "Luxury stay in the heart of the city",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-50 to-white p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        Our Hotels
      </h1>

      <p className="text-gray-600 text-base md:text-lg mb-10 text-center max-w-2xl">
        Discover the best hotels for your stay in Georgia. From luxury resorts
        to cozy city hotels, find the perfect accommodation for your trip.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {hotels.map((hotel, index) => (
          <HotelCard id={`hotel-${index}`} key={index} {...hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelsPage;
