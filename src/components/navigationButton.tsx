import { useNavigate } from "react-router-dom";

interface navigationButtonProps {
  name: string;
  path: string;
  photo: string;
}

const NavigationButton = ({ name, path, photo }: navigationButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className="flex flex-col items-center justify-center cursor-pointer bg-white/30 
                 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl 
                 transition-all duration-300 hover:scale-105 p-8 min-w-[500px] min-h-[500px]"
    >
      <img src={photo} className="h-50 w-50 mb-4" alt={`${name} icon`} />
      <span className="text-2xl font-bold text-balck">{name}</span>
    </button>
  );
};

export default NavigationButton;
