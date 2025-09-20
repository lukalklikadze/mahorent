import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { formatDateForDisplay } from "../utils";

type Value = Date | null;
type ValuePiece = Date | null;

type BookingCalendarProps = {
  bookedDates: string[];
  onDatesChange: (dates: Date[]) => void;
  selectedDates: Date[];
  singleDateMode?: boolean;
  theme?: "blue" | "yellow" | "purple";
};

const BookingCalendar = ({
  bookedDates,
  onDatesChange,
  selectedDates,
  singleDateMode = false,
  theme = "blue",
}: BookingCalendarProps) => {
  const [calendarKey, setCalendarKey] = useState(0);

  useEffect(() => {
    setCalendarKey((prev) => prev + 1);
    console.log("bababa", bookedDates);
  }, [bookedDates]);

  const normalizeDateString = (dateInput: string | Date): string => {
    try {
      let date: Date;

      if (typeof dateInput === "string") {
        const ddmmyyyyPattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        if (ddmmyyyyPattern.test(dateInput)) {
          const parts = dateInput.split("/");
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10);
          const year = parseInt(parts[2], 10);

          date = new Date(year, month - 1, day);
        } else {
          date = new Date(dateInput);
        }
      } else {
        date = dateInput;
      }

      if (isNaN(date.getTime())) {
        console.warn("Invalid date:", dateInput);
        return "";
      }

      return formatDateForDisplay(date);
    } catch (error) {
      console.warn("Error normalizing date:", dateInput, error);
      return "";
    }
  };

  const normalizedBookedDates = bookedDates
    .map(normalizeDateString)
    .filter((date) => date !== "");

  useEffect(() => {
    console.log("Unselectable (booked) dates:", normalizedBookedDates);
  }, [normalizedBookedDates]);

  const isDateBooked = (date: Date): boolean => {
    const dateString = normalizeDateString(date);
    const isBooked = normalizedBookedDates.includes(dateString);
    return isBooked;
  };

  const isDateSelected = (date: Date): boolean => {
    return selectedDates.some(
      (selectedDate) => selectedDate.toDateString() === date.toDateString()
    );
  };

  const handleDateChange = (value: Value | [ValuePiece, ValuePiece]) => {
    if (!value) return;

    if (value instanceof Date && !isDateBooked(value)) {
      if (singleDateMode) {
        onDatesChange([value]);
      } else {
        const isAlreadySelected = selectedDates.some(
          (date) => date.toDateString() === value.toDateString()
        );

        const newSelectedDates = isAlreadySelected
          ? selectedDates.filter(
              (date) => date.toDateString() !== value.toDateString()
            )
          : [...selectedDates, value];

        onDatesChange(newSelectedDates);
      }
    }
  };

  const tileClassName = ({ date }: { date: Date }) => {
    if (isDateBooked(date)) return "react-calendar__tile--booked";
    if (isDateSelected(date)) return "react-calendar__tile--selected";
    return "";
  };

  // Define theme colors
  const getThemeColors = () => {
    switch (theme) {
      case "yellow":
        return {
          selected: "#eab308",
          selectedHover: "#fef3c7",
        };
      case "purple":
        return {
          selected: "#8b5cf6",
          selectedHover: "#ddd6fe",
        };
      case "blue":
      default:
        return {
          selected: "#3b82f6",
          selectedHover: "#dbeafe",
        };
    }
  };

  const colors = getThemeColors();

  return (
    <div className="calendar-container">
      <Calendar
        key={calendarKey}
        onChange={handleDateChange}
        value={selectedDates[0] || new Date()}
        minDate={new Date()}
        tileClassName={tileClassName}
        tileDisabled={({ date }) => isDateBooked(date)}
        className="w-full"
      />
      <style>{`
        .react-calendar {
          width: 100% !important;
          border: none !important;
          font-family: inherit !important;
          background: white !important;
          border-radius: 0.75rem !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
        }

        .react-calendar__tile {
          position: relative;
          padding: 8px 6px !important;
          font-size: 12px !important;
          border-radius: 0.375rem !important;
          margin: 2px !important;
        }

        @media (min-width: 640px) {
          .react-calendar__tile {
            padding: 12px 8px !important;
            font-size: 14px !important;
          }
        }

        .react-calendar__tile--booked {
          background-color: #ef4444 !important;
          color: white !important;
          cursor: not-allowed !important;
          pointer-events: none !important;
        }

        .react-calendar__tile--selected {
          background-color: ${colors.selected} !important;
          color: white !important;
        }

        .react-calendar__tile:hover:not(.react-calendar__tile--booked) {
          background-color: ${colors.selectedHover} !important;
        }

        /* Remove default styling for today's date */
        .react-calendar__tile--now {
          background: inherit !important;
          color: inherit !important;
        }

        .react-calendar__tile--now:hover {
          background-color: ${colors.selectedHover} !important;
        }

        /* Only style today's date if it's selected */
        .react-calendar__tile--now.react-calendar__tile--selected {
          background-color: ${colors.selected} !important;
          color: white !important;
        }

        .react-calendar__navigation {
          margin-bottom: 1rem !important;
          display: flex !important;
          justify-content: space-between !important;
        }

        .react-calendar__navigation button {
          font-size: 14px !important;
          padding: 8px 12px !important;
          border-radius: 0.5rem !important;
          border: none !important;
          background-color: #f3f4f6 !important;
          color: #374151 !important;
          font-weight: 500 !important;
        }

        .react-calendar__month-view__days {
          display: grid !important;
          grid-template-columns: repeat(7, 1fr) !important;
          gap: 2px;
        }

        .react-calendar__tile--weekend {
          color: inherit !important;
        }

        .react-calendar__navigation button:hover {
          background-color: #e5e7eb !important;
        }

        @media (min-width: 640px) {
          .react-calendar__navigation button {
            font-size: 16px !important;
            padding: 10px 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingCalendar;
