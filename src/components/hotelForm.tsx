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
    photos: [],
    tagline: "",
  });

  const [currentPhotoUrl, setCurrentPhotoUrl] = useState("");

  const resetForm = () => {
    setHotelForm({
      name: "",
      location: "",
      bedrooms: "",
      beds: "",
      bathrooms: "",
      prevPrice: "",
      newPrice: "",
      photos: [],
      tagline: "",
    });
    setCurrentPhotoUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hotelForm.photos.length === 0) {
      onError("Please add at least one photo");
      return;
    }

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

  const addPhoto = () => {
    if (!currentPhotoUrl.trim()) {
      onError("Please enter a valid photo URL");
      return;
    }

    if (hotelForm.photos.includes(currentPhotoUrl.trim())) {
      onError("This photo URL is already added");
      return;
    }

    setHotelForm((prev) => ({
      ...prev,
      photos: [...prev.photos, currentPhotoUrl.trim()],
    }));
    setCurrentPhotoUrl("");
  };

  const removePhoto = (indexToRemove: number) => {
    setHotelForm((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, index) => index !== indexToRemove),
    }));
  };

  const movePhotoUp = (index: number) => {
    if (index === 0) return;
    const newPhotos = [...hotelForm.photos];
    [newPhotos[index], newPhotos[index - 1]] = [
      newPhotos[index - 1],
      newPhotos[index],
    ];
    setHotelForm((prev) => ({ ...prev, photos: newPhotos }));
  };

  const movePhotoDown = (index: number) => {
    if (index === hotelForm.photos.length - 1) return;
    const newPhotos = [...hotelForm.photos];
    [newPhotos[index], newPhotos[index + 1]] = [
      newPhotos[index + 1],
      newPhotos[index],
    ];
    setHotelForm((prev) => ({ ...prev, photos: newPhotos }));
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
            Photos * (At least 1 required)
          </label>

          <div className="flex gap-2 mb-4">
            <input
              type="url"
              value={currentPhotoUrl}
              onChange={(e) => setCurrentPhotoUrl(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              placeholder="https://example.com/hotel-image.jpg"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addPhoto();
                }
              }}
            />
            <button
              type="button"
              onClick={addPhoto}
              className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              Add Photo
            </button>
          </div>

          {hotelForm.photos.length > 0 && (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              <h3 className="font-medium text-gray-700">
                Added Photos ({hotelForm.photos.length}):
              </h3>
              {hotelForm.photos.map((photo, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <img
                    src={photo}
                    alt={`Hotel photo ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMSAyMUg0M1Y0M0gyMVYyMVoiIGZpbGw9IiNEMUQ1REIiLz4KPHBhdGggZD0iTTI4IDI4TDM2IDM2SDE0TDI4IDI4WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K";
                    }}
                  />

                  <div className="flex-1">
                    <p className="text-sm text-gray-600 truncate font-mono">
                      {photo}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Photo {index + 1}
                      {index === 0 && (
                        <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">
                          Main Photo
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => movePhotoUp(index)}
                      disabled={index === 0}
                      className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => movePhotoDown(index)}
                      disabled={index === hotelForm.photos.length - 1}
                      className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                    title="Remove photo"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {hotelForm.photos.length === 0 && (
            <p className="text-sm text-gray-500 mt-2">
              No photos added yet. Please add at least one photo.
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading || hotelForm.photos.length === 0}
            className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add Hotel"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelForm;
