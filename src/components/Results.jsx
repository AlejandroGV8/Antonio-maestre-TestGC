import { calculateResults } from '../utils/testHelpers';

const Results = ({ preguntas, respuestas, onNewTest, canDownloadAnswers = false }) => {
  const resultados = calculateResults(preguntas, respuestas);

  const handleDownloadResultsWithAnswers = () => {
    const lines = [
      'Resumen de examen - Academia Antonio',
      `Fecha: ${new Date().toLocaleDateString()}`,
      `Resultados: ${resultados.porcentaje}% - Aciertos: ${resultados.aciertos} - Fallos: ${resultados.fallos}`,
      '',
      'Preguntas y respuestas:'
    ];

    preguntas.forEach((pregunta, index) => {
      const tuResp = respuestas[index] ? respuestas[index].toUpperCase() : 'No respondida';
      const correcta = pregunta.respuesta ? pregunta.respuesta.toUpperCase() : 'N/A';
      lines.push(`${index + 1}. ${pregunta.pregunta}`);
      lines.push(`   Tu: ${tuResp}`);
      lines.push(`   Correcta: ${correcta}`);
      lines.push('');
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultados_con_respuestas.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const aprobado = resultados.porcentaje >= 50;

  // Devuelve la opción completa (ej. "b) Texto de la opción") dada la letra (a/b/c/d)
  const getOptionByLetter = (pregunta, letter) => {
    if (!letter || !pregunta?.opciones) return null;
    const l = String(letter).trim().toLowerCase();
    const opcion = pregunta.opciones.find(opt =>
      opt.trim().toLowerCase().startsWith(`${l})`)
    );
    return opcion ? opcion.trim() : null;
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* Header de resultados */}
          <div className={`rounded-2xl shadow-lg p-8 mb-8 ${
            aprobado 
              ? 'bg-gradient-to-r from-green-600 to-green-700' 
              : 'bg-gradient-to-r from-red-600 to-red-700'
          }`}>
            <div className="text-center text-white">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
                {aprobado ? (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <h1 className="text-4xl font-black mb-2">
                {aprobado ? '¡Felicidades!' : '¡Sigue Practicando!'}
              </h1>
              <p className="text-xl opacity-90">
                {aprobado 
                  ? 'Has superado el test con éxito' 
                  : 'Necesitas mejorar tu puntuación'}
              </p>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen de Resultados</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Aciertos */}
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-green-700 font-semibold">Aciertos</p>
                    <p className="text-4xl font-black text-green-700">{resultados.aciertos}</p>
                  </div>
                </div>
                <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-600 rounded-full transition-all duration-500" 
                    style={{ width: `${(resultados.aciertos / preguntas.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Fallos */}
              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-red-700 font-semibold">Fallos</p>
                    <p className="text-4xl font-black text-red-700">{resultados.fallos}</p>
                  </div>
                </div>
                <div className="h-2 bg-red-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-600 rounded-full transition-all duration-500" 
                    style={{ width: `${(resultados.fallos / preguntas.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Nota final */}
              <div className={`rounded-xl p-6 border-2 ${
                aprobado 
                  ? 'bg-yellow-50 border-yellow-300' 
                  : 'bg-gray-50 border-gray-300'
              }`}>
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    aprobado ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${aprobado ? 'text-yellow-700' : 'text-gray-700'}`}>
                      Nota Final
                    </p>
                    <p className={`text-4xl font-black ${aprobado ? 'text-yellow-600' : 'text-gray-600'}`}>
                      {resultados.porcentaje}%
                    </p>
                  </div>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${
                  aprobado ? 'bg-yellow-200' : 'bg-gray-200'
                }`}>
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${aprobado ? 'bg-yellow-500' : 'bg-gray-400'}`}
                    style={{ width: `${resultados.porcentaje}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Revisión detallada */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-7 h-7 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Revisión Detallada
            </h2>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {preguntas.map((pregunta, index) => {
                const esCorrecta = respuestas[index] === pregunta.respuesta;
                const respondida = respuestas[index] !== undefined;
                
                return (
                  <div 
                    key={index}
                    className={`rounded-xl p-5 border-2 ${
                      !respondida 
                        ? 'border-gray-300 bg-gray-50' 
                        : esCorrecta 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-red-300 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                        !respondida 
                          ? 'bg-gray-300 text-gray-600' 
                          : esCorrecta 
                          ? 'bg-green-600 text-white' 
                          : 'bg-red-600 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      <p className="flex-1 text-gray-800 font-medium leading-relaxed">
                        {pregunta.pregunta}
                      </p>
                    </div>
                    
                    <div className="ml-13 space-y-2 text-sm">
                      {respondida ? (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-700">Tu respuesta:</span>
                            <span className={`px-3 py-1 rounded-lg font-bold ${
                              esCorrecta 
                                ? 'bg-green-200 text-green-700' 
                                : 'bg-red-200 text-red-700'
                            }`}>
                              {getOptionByLetter(pregunta, respuestas[index]) ?? `${String(respuestas[index] || '').toUpperCase()})`}
                            </span>
                            {esCorrecta && (
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          {!esCorrecta && (
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-700">Correcta:</span>
                              <span className="px-3 py-1 rounded-lg font-bold bg-green-200 text-green-700">
                                {getOptionByLetter(pregunta, pregunta.respuesta) ?? `${String(pregunta.respuesta || '').toUpperCase()})`}
                              </span>
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-gray-500 italic flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          No respondida
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mb-4">
            {canDownloadAnswers && (
              <button
                onClick={handleDownloadResultsWithAnswers}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Descargar resultados con respuestas
              </button>
            )}
            <button
              onClick={onNewTest}
              className="flex-1 bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Realizar Nuevo Test
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Results;