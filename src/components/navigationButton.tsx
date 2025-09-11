import { useNavigate } from "react-router-dom";

interface NavigationButtonProps {
  name: string;
  path: string;
  photo: string;
}

const NavigationButton = ({ name, path, photo }: NavigationButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className="flex flex-col items-center justify-center cursor-pointer bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl shadow-md hover:shadow-2xl transition-transform duration-300 hover:scale-105 p-4 sm:p-5 md:p-7 lg:p-8 w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[350px] h-[180px] sm:h-[220px] md:h-[280px] lg:h-[350px] group"
    >
      <img
        src={photo}
        alt={`${name} icon`}
        className="h-10 w-60 sm:h-14 sm:w-64 md:h-20 md:w-60 lg:h-24 lg:w-64 mb-3 sm:mb-4 md:mb-5 lg:mb-6 object-contain transition-transform duration-300 group-hover:scale-110"
      />

      <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 group-hover:text-blue-600 text-center">
        {name}
      </span>
    </button>
  );
};

export default NavigationButton;
