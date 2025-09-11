interface TabNavigationProps {
  activeTab: "cars" | "hotels" | "tours";
  onTabChange: (tab: "cars" | "hotels" | "tours") => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const tabs = [
    { id: "cars" as const, label: "Add Cars", icon: "🚗" },
    { id: "hotels" as const, label: "Add Hotels", icon: "🏨" },
    { id: "tours" as const, label: "Add Tours", icon: "🗺️" },
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 py-3 rounded-md font-medium transition-colors flex items-center space-x-2 ${
              activeTab === tab.id
                ? "bg-white text-blue-600 shadow-md"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
