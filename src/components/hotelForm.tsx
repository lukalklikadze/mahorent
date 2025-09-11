import { useState } from "react";
import { hotelAPI, type Hotel } from "../API";

interface HotelFormProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const HotelForm = ({ onSuccess, onError }: HotelFormProps) => {
  const [loading, setLoading] = useState(false);
  const [hotelForm, setHotelForm] = useState<Omit<Hotel, "_id">>({
    name: "",
    location: "",
    bedrooms: "",
    beds: "",
    bathrooms: "",
    prevPrice: "",
    newPrice: "",
    photo: "",
    tagline: "",
  });

  const resetForm = () => {
    setHotelForm({
      name: "",
      location: "",
      bedrooms: "",
      beds: "",
      bathrooms: "",
      prevPrice: "",
      newPrice: "",
      photo: "",
      tagline: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await hotelAPI.create(hotelForm);
      resetForm();
      onSuccess("Hotel added successfully!");
    } catch (error) {
      onError("Error adding hotel: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof hotelForm, value: string) => {
    setHotelForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-yellow-600">Add New Hotel</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            required
            value={hotelForm.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            placeholder="Grand Tbilisi Hotel"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            required
            value={hotelForm.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            placeholder="Tbilisi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bedrooms *
          </label>
          <input
            type="text"
            required
            value={hotelForm.bedrooms}
            onChange={(e) => handleInputChange("bedrooms", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            placeholder="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Beds *
          </label>
          <input
            type="text"
            required
            value={hotelForm.beds}
            onChange={(e) => handleInputChange("beds", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            placeholder="4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bathrooms *
          </label>
          <input
            type="text"
            required
            value={hotelForm.bathrooms}
            onChange={(e) => handleInputChange("bathrooms", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            placeholder="2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Previous Price *
          </label>
          <input
            type="text"
            required
            value={hotelForm.prevPrice}
            onChange={(e) => handleInputChange("prevPrice", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            placeholder="$150"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Price *
          </label>
          <input
            type="text"
            required
            value={hotelForm.newPrice}
            onChange={(e) => handleInputChange("newPrice", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            placeholder="$120"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tagline
          </label>
          <input
            type="text"
            value={hotelForm.tagline}
            onChange={(e) => handleInputChange("tagline", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            placeholder="Center of the City"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photo URL *
          </label>
          <input
            type="url"
            required
            value={hotelForm.photo}
            onChange={(e) => handleInputChange("photo", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            placeholder="https://example.com/hotel-image.jpg"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-yellow-700 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Hotel"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelForm;
