import { useState } from "react";
import CarForm from "../components/carForm";
import HotelForm from "../components/hotelForm";
import TourForm from "../components/tourForm";
import MessageDisplay from "../components/messageDisplay";
import TabNavigation from "../components/tabNavigation";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<"cars" | "hotels" | "tours">(
    "cars"
  );
  const [message, setMessage] = useState("");

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 5000);
  };

  const handleSuccess = (successMessage: string) => {
    showMessage(successMessage);
  };

  const handleError = (errorMessage: string) => {
    showMessage(errorMessage);
  };

  const closeMessage = () => {
    setMessage("");
  };

  const renderActiveForm = () => {
    switch (activeTab) {
      case "cars":
        return <CarForm onSuccess={handleSuccess} onError={handleError} />;
      case "hotels":
        return <HotelForm onSuccess={handleSuccess} onError={handleError} />;
      case "tours":
        return <TourForm onSuccess={handleSuccess} onError={handleError} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🔐 Admin Panel
          </h1>
          <p className="text-gray-600">
            Manage your cars, hotels, and tours easily
          </p>
        </div>

        <MessageDisplay message={message} onClose={closeMessage} />

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="transition-all duration-300">{renderActiveForm()}</div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>💡 Tip: All required fields are marked with *</p>
          <p>
            🖼️ For photos, use direct image URLs (e.g., from Imgur, Cloudinary)
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
