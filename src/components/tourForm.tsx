import { useState } from "react";
import { tourAPI, type Tour } from "../API";

interface TourFormProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const TourForm = ({ onSuccess, onError }: TourFormProps) => {
  const [loading, setLoading] = useState(false);
  const [tourForm, setTourForm] = useState<Omit<Tour, "_id">>({
    name: "",
    prevPrice: "",
    newPrice: "",
    photo: "",
  });

  const resetForm = () => {
    setTourForm({
      name: "",
      prevPrice: "",
      newPrice: "",
      photo: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await tourAPI.create(tourForm);
      resetForm();
      onSuccess("Tour added successfully!");
    } catch (error) {
      onError("Error adding tour: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof tourForm, value: string) => {
    setTourForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-purple-600">Add New Tour</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            required
            value={tourForm.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Tbilisi City Tour"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Previous Price *
          </label>
          <input
            type="text"
            required
            value={tourForm.prevPrice}
            onChange={(e) => handleInputChange("prevPrice", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="$100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Price *
          </label>
          <input
            type="text"
            required
            value={tourForm.newPrice}
            onChange={(e) => handleInputChange("newPrice", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="$80"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photo URL *
          </label>
          <input
            type="url"
            required
            value={tourForm.photo}
            onChange={(e) => handleInputChange("photo", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="https://example.com/tour-image.jpg"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Tour"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TourForm;
