import { useNavigate } from "react-router-dom";

interface NavigationButtonProps {
  name: string;
  path: string;
  icon: string;
}

const NavigationButton = ({ name, path, icon }: NavigationButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className="flex flex-col items-center justify-center cursor-pointer bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl shadow-md hover:shadow-2xl transition-transform duration-300 hover:scale-105 p-6 sm:p-8 md:p-10 lg:p-12 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] group"
    >
      <img
        src={icon}
        alt={name}
        className="h-10 w-10 sm:h-14 sm:w-14 md:h-20 md:w-20 lg:h-24 lg:w-24 mb-3 sm:mb-4 md:mb-5 lg:mb-6 transition-transform duration-300 group-hover:scale-110"
        style={{ filter: "hue-rotate(240deg) saturate(1.5) brightness(0.8)" }} // Blue tint
      />
      <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 group-hover:text-blue-600 text-center">
        {name}
      </span>
    </button>
  );
};

export default NavigationButton;
