import { useParams } from "react-router-dom";

const CarDetailsPage = () => {
  const { id } = useParams();

  // Later, fetch car details from API/DB using id
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Car Details</h1>
      <p className="text-lg text-gray-700 amb-6">
        Details for car with ID: {id}
      </p>

      <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition">
        Book Now
      </button>
    </div>
  );
};

export default CarDetailsPage;
