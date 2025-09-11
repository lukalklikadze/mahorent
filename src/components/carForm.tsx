import { useState } from "react";
import { carAPI, type Car } from "../API";

interface CarFormProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const CarForm = ({ onSuccess, onError }: CarFormProps) => {
  const [loading, setLoading] = useState(false);
  const [carForm, setCarForm] = useState<Omit<Car, "_id">>({
    name: "",
    location: "",
    gearsType: "",
    steeringWheelSide: "",
    fuel: "",
    prevPrice: "",
    newPrice: "",
    photo: "",
  });

  const resetForm = () => {
    setCarForm({
      name: "",
      location: "",
      gearsType: "",
      steeringWheelSide: "",
      fuel: "",
      prevPrice: "",
      newPrice: "",
      photo: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await carAPI.create(carForm);
      resetForm();
      onSuccess("Car added successfully!");
    } catch (error) {
      onError("Error adding car: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof carForm, value: string) => {
    setCarForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Add New Car</h2>
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
            value={carForm.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Toyota Prius"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            required
            value={carForm.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Tbilisi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gears Type *
          </label>
          <select
            required
            value={carForm.gearsType}
            onChange={(e) => handleInputChange("gearsType", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select...</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Steering Wheel Side *
          </label>
          <select
            required
            value={carForm.steeringWheelSide}
            onChange={(e) =>
              handleInputChange("steeringWheelSide", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select...</option>
            <option value="Left">Left</option>
            <option value="Right">Right</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fuel Type *
          </label>
          <select
            required
            value={carForm.fuel}
            onChange={(e) => handleInputChange("fuel", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select...</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Previous Price *
          </label>
          <input
            type="text"
            required
            value={carForm.prevPrice}
            onChange={(e) => handleInputChange("prevPrice", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="$40/day"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Price *
          </label>
          <input
            type="text"
            required
            value={carForm.newPrice}
            onChange={(e) => handleInputChange("newPrice", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="$30/day"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photo URL *
          </label>
          <input
            type="url"
            required
            value={carForm.photo}
            onChange={(e) => handleInputChange("photo", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/car-image.jpg"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Car"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;
