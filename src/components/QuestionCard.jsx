const QuestionCard = ({ pregunta, opciones, selectedAnswer, onSelect, correctAnswer, feedbackMode }) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
      {/* Header de la pregunta */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 p-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="flex-1 text-xl text-white font-medium leading-relaxed">
            {pregunta}
          </h3>
        </div>
      </div>
      
      {/* Opciones */}
      <div className="p-6 space-y-3">
        {opciones.map((opcion, index) => {
          const letra = opcion.charAt(0);
          const isSelected = selectedAnswer === letra;
          const isCorrect = letra === correctAnswer;
          const showFeedback = feedbackMode && selectedAnswer;
          const isLocked = feedbackMode !== undefined && feedbackMode !== null;
          
          return (
            <button
              key={index}
              onClick={() => {
                // Permitir cambiar respuesta mientras no haya feedback visible
                if (!isLocked) {
                  onSelect(letra);
                }
              }}
              disabled={isLocked}
              className={`group w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                showFeedback
                  ? isSelected && !isCorrect
                    ? 'border-red-500 bg-red-100 shadow-lg'
                    : isCorrect
                    ? 'border-green-500 bg-green-100 shadow-lg'
                    : 'border-gray-200 bg-gray-50'
                  : isSelected
                  ? 'border-green-600 bg-gradient-to-r from-green-50 to-yellow-50 shadow-lg transform scale-[1.02]'
                  : 'border-gray-200 hover:border-green-300 hover:bg-gray-50 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg transition-all ${
                  showFeedback
                    ? isSelected && !isCorrect
                      ? 'bg-red-500 text-white'
                      : isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                    : isSelected
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 group-hover:bg-green-100 group-hover:text-green-600'
                }`}>
                  {letra.toUpperCase()}
                </div>
                <span className={`flex-1 font-medium transition-colors ${
                  showFeedback
                    ? isSelected && !isCorrect
                      ? 'text-red-700'
                      : isCorrect
                      ? 'text-green-700'
                      : 'text-gray-700'
                    : isSelected ? 'text-green-700' : 'text-gray-700 group-hover:text-gray-900'
                }`}>
                  {opcion.substring(3)}
                </span>
                {showFeedback ? (
                  isSelected && !isCorrect ? (
                    <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : isCorrect ? (
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : null
                ) : isSelected ? (
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;