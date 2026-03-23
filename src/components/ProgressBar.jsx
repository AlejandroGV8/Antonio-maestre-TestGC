const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="relative">
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-green-500 via-green-600 to-yellow-500 h-full transition-all duration-500 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
      <div className="absolute right-0 -top-6 text-xs font-bold text-green-600">
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

export default ProgressBar;