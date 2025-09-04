import { useParams } from "react-router-dom";

const TourDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Tour Details</h1>
      <p className="text-lg text-gray-700 mb-6">
        Details for tour with ID: {id}
      </p>

      <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition">
        Book Now
      </button>
    </div>
  );
};

export default TourDetailsPage;
