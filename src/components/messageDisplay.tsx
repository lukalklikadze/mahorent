interface MessageDisplayProps {
  message: string;
  onClose: () => void;
}

const MessageDisplay = ({ message, onClose }: MessageDisplayProps) => {
  if (!message) return null;

  const isError = message.toLowerCase().includes("error");

  return (
    <div
      className={`mb-6 p-4 rounded-lg flex items-center justify-between ${
        isError
          ? "bg-red-100 text-red-700 border border-red-300"
          : "bg-green-100 text-green-700 border border-green-300"
      }`}
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg">{isError ? "❌" : "✅"}</span>
        <span className="font-medium">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 text-xl leading-none"
        aria-label="Close message"
      >
        ×
      </button>
    </div>
  );
};

export default MessageDisplay;
