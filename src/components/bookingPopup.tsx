import { useState } from "react";
import emailjs from "emailjs-com";
import { carAPI, hotelAPI, tourAPI } from "../API";

type BookingPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedDates?: string[];
  itemName?: string;
  pricePerDay?: string;
  totalPrice?: string;
  itemId?: string;
  itemType?: "car" | "hotel" | "tour";
  numberOfPeople?: number;
  onBookingSuccess?: () => void;
};

const BookingPopup = ({
  isOpen,
  onClose,
  selectedDates = [],
  itemName = "",
  totalPrice = "",
  itemId = "",
  itemType,
  numberOfPeople = 1,
  onBookingSuccess,
}: BookingPopupProps) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const bookItemInDatabase = async () => {
    if (!itemId || !itemType || selectedDates.length === 0) {
      throw new Error("Missing booking information");
    }

    try {
      switch (itemType) {
        case "car":
          await carAPI.book(itemId, selectedDates);
          break;
        case "hotel":
          await hotelAPI.book(itemId, selectedDates);
          break;
        case "tour":
          await tourAPI.book(itemId, selectedDates);
          break;
        default:
          throw new Error("Invalid item type");
      }
    } catch (error) {
      console.error("Database booking error:", error);
      throw new Error("Failed to save booking to database");
    }
  };

  const sendEmailNotification = async () => {
    try {
      const emailData: Record<string, unknown> = {
        name: formData.name,
        surname: formData.surname,
        phone: formData.phone,
        email: formData.email,
        total_price: totalPrice,
        number_of_days: selectedDates.length,
        dates: selectedDates.join(", "),
        item: itemName,
        item_type: itemType,
        item_id: itemId,
        to_email: "lukaliko24@gmail.com",
      };

      if (itemType === "tour") {
        emailData.number_of_people = numberOfPeople;
      }

      await emailjs.send(
        "service_8wj3dfa",
        "template_k3aat9i",
        emailData,
        "wdouXTwDj_a0iRnlM"
      );
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Email sending error:", error);
      throw new Error("Failed to send email notification");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.surname ||
      !formData.phone ||
      !formData.email
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (!itemId || !itemType) {
      alert("Booking information is missing. Please try again.");
      return;
    }

    if (selectedDates.length === 0) {
      alert("Please select at least one date for booking.");
      return;
    }

    setLoading(true);

    try {
      await bookItemInDatabase();

      await sendEmailNotification();

      alert(
        "Booking confirmed successfully! You will receive a confirmation email shortly."
      );

      setFormData({ name: "", surname: "", phone: "", email: "" });

      if (onBookingSuccess) {
        onBookingSuccess();
      }

      onClose();
    } catch (error) {
      console.error("Booking error:", error);

      if (error instanceof Error) {
        if (error.message.includes("database")) {
          alert(
            "Failed to confirm booking in our system. Please try again or contact support."
          );
        } else if (error.message.includes("email")) {
          alert(
            "Booking saved but failed to send confirmation email. We'll contact you shortly."
          );
        } else {
          alert(error.message);
        }
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getItemTypeDisplay = () => {
    switch (itemType) {
      case "car":
        return "Car Rental";
      case "hotel":
        return "Hotel Booking";
      case "tour":
        return "Tour Booking";
      default:
        return "Booking";
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 p-4"
      onClick={handleBackdropClick}
      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-full max-w-md mx-auto transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-blue-800">
            Complete {getItemTypeDisplay()}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-blue-600 text-2xl leading-none transition-colors duration-200 w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-50"
            aria-label="Close popup"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="First Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="surname"
              placeholder="Last Name"
              value={formData.surname}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              required
            />
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              required
            />
          </div>

          {itemName && (
            <div className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between">
                <span className="font-medium">{getItemTypeDisplay()}:</span>
                <span>{itemName}</span>
              </div>
            </div>
          )}

          {itemType === "tour" && numberOfPeople > 1 && (
            <div className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between">
                <span className="font-medium">Number of People:</span>
                <span>
                  {numberOfPeople} {numberOfPeople === 1 ? "person" : "people"}
                </span>
              </div>
            </div>
          )}

          {selectedDates.length > 0 && (
            <div className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="font-medium mb-1">
                Selected Dates ({selectedDates.length} days):
              </div>
              <div className="text-xs max-h-16 overflow-y-auto">
                {selectedDates.join(", ")}
              </div>
            </div>
          )}

          {totalPrice && (
            <div className="text-sm p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Days:</span>
                <span className="font-medium text-blue-700">
                  {selectedDates.length}
                </span>
              </div>
              {itemType === "tour" && numberOfPeople > 1 && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">People:</span>
                  <span className="font-medium text-blue-700">
                    {numberOfPeople}
                  </span>
                </div>
              )}
              <hr className="my-2 border-blue-200" />
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-800">Total:</span>
                <span className="font-bold text-blue-600 text-lg">
                  {totalPrice}
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105"
              }`}
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPopup;
