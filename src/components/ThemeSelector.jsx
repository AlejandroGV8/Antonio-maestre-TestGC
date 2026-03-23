const ThemeSelector = ({ themes, selectedThemes, onToggle }) => {
  return (
    <div className="space-y-3">
      {themes.map((theme) => {
        const isSelected = selectedThemes.includes(theme.id);
        
        return (
          <button
            key={theme.id}
            onClick={() => onToggle(theme.id)}
            className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${
              isSelected
                ? 'border-green-600 bg-gradient-to-r from-green-50 to-yellow-50 shadow-md transform scale-[1.02]'
                : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                isSelected 
                  ? 'bg-green-600 border-green-600' 
                  : 'border-gray-300 bg-white'
              }`}>
                {isSelected && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${isSelected ? 'text-green-700' : 'text-gray-800'}`}>
                  {theme.nombre}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  {theme.preguntas.length} preguntas disponibles
                </p>
              </div>

              <div className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                isSelected 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {isSelected ? 'Activo' : 'Inactivo'}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSelector;