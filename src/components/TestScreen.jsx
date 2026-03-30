import { useEffect, useState } from 'react';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';

const TestScreen = ({ 
  preguntas, 
  preguntaActual, 
  respuestas, 
  onSelectAnswer,
  onNext,
  onPrevious,
  onFinish,
  mode,
  canDownloadAnswers = false
}) => {
  const pregunta = preguntas[preguntaActual];
  const respuestaSeleccionada = respuestas[preguntaActual];
  const isFirstQuestion = preguntaActual === 0;
  const isLastQuestion = preguntaActual === preguntas.length - 1;
  const preguntasContestadas = Object.keys(respuestas).length;

  const [secondsLeft, setSecondsLeft] = useState(null);
  // Estado para almacenar si la respuesta es correcta/incorrecta (solo modo prueba)
  const [feedbackState, setFeedbackState] = useState({});

  // Función para evaluar la respuesta (solo modo prueba)
  const evaluateAnswerForMode = () => {
    if (mode === 'prueba' && respuestaSeleccionada) {
      const isCorrect = respuestaSeleccionada === pregunta.respuesta;
      setFeedbackState(prev => ({
        ...prev,
        [preguntaActual]: isCorrect ? 'correct' : 'incorrect',
        currentQuestion: isCorrect ? 'correct' : 'incorrect'
      }));
    }
  };

  const handleNextClick = () => {
    evaluateAnswerForMode();
    // Pausa breve para ver el feedback antes de pasar a la siguiente pregunta
    setTimeout(() => {
      onNext();
    }, 300);
  };

  const formatTime = (s) => {
    if (s === null || s === undefined) return '';
    const mm = Math.floor(s / 60).toString().padStart(2, '0');
    const ss = (s % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  // Limpiar feedback cuando cambias de pregunta
  useEffect(() => {
    setFeedbackState(prev => ({
      ...prev,
      currentQuestion: undefined
    }));
  }, [preguntaActual]);

  useEffect(() => {
    let timerId = null;

    if (mode === 'simulacion' && preguntas.length > 0) {
      // 45 minutos en segundos
      setSecondsLeft(45 * 60);
      timerId = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev === null) return prev;
          if (prev <= 1) {
            clearInterval(timerId);
            // Llamar a onFinish para finalizar el test y navegar a resultados
            try { onFinish(); } catch (e) { /* ignore */ }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setSecondsLeft(null);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, preguntas.length]);

  const handleDownloadExam = (includeAnswers = false) => {
    try {
      const examTitle = includeAnswers
        ? 'Examen con respuestas - Academia Antonio'
        : 'Examen sin respuestas - Academia Antonio';

      let content = `<div class="exam-header"><h1>${examTitle}</h1><div class="meta">Preguntas: ${preguntas.length} — Fecha: ${new Date().toLocaleDateString()}</div><hr/></div>`;

      preguntas.forEach((p, idx) => {
        content += `<div class="question"><div class="qtext">${idx + 1}. ${p.pregunta}</div><ol class="options" type="a">`;
        p.opciones.forEach(opt => {
          const safeOpt = opt.replace(/<[^>]*>/g, '');
          content += `<li class="option">${safeOpt}</li>`;
        });
        content += `</ol>`;

        if (includeAnswers) {
          const correctOption = p.respuesta ? p.respuesta.toUpperCase() : 'N/A';
          content += `<div class="answer-block"><strong>Solucion correcta:</strong> ${correctOption}</div>`;
        }

        content += `</div>`;

      });

      const scopedCss = `#__printableExam { font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial; color:#0f172a; padding:12px; font-size:11px; line-height:1.2 } #__printableExam h1{font-size:16px; margin:0 0 4px 0} #__printableExam .meta{color:#374151; margin-bottom:6px; font-size:11px} #__printableExam .exam-header hr{margin:6px 0 8px 0} #__printableExam .question{margin-bottom:10px} #__printableExam .qtext{font-weight:600; margin-bottom:4px} #__printableExam ol.options{margin:0 0 0 16px; padding:0} #__printableExam li.option{margin:2px 0} #__printableExam .answer-block{margin-top:6px; padding:6px; border-left:4px solid #10b981; background:#ecfdf3; border-radius:6px; font-size:11px;} @media print{ @page{margin:10mm} body * { visibility: hidden !important } #__printableExam, #__printableExam * { visibility: visible !important } #__printableExam { position: absolute; left: 0; top: 0; width: 100% } .no-print{display:none !important} }`;

      const existing = document.getElementById('__printableExam');
      if (existing) existing.remove();

      const container = document.createElement('div');
      container.id = '__printableExam';
      container.innerHTML = `<style>${scopedCss}</style><div class="exam-content">${content}</div>`;
      container.style.display = 'none';
      document.body.appendChild(container);

      container.style.display = 'block';
      setTimeout(() => {
        try { window.print(); } catch (e) { console.warn('Impresión inline cancelada', e); }
        setTimeout(() => { try { container.remove(); } catch (err) { } }, 500);
      }, 250);
    } catch (err) {
      console.error('Error generando examen imprimible', err);
      alert('Error al generar el examen imprimible. Revisa la consola.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-800 p-4">
      <div className="max-w-5xl mx-auto py-6">
        {/* Header fijo */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 sticky top-4 z-20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Pregunta {preguntaActual + 1} <span className="text-gray-400">/ {preguntas.length}</span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-semibold text-green-600">{preguntasContestadas}</span> contestadas
              </p>
            </div>
            <div className="text-right">
              {mode === 'simulacion' && (
                <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold mr-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
                  </svg>
                  {formatTime(secondsLeft)}
                </div>
              )}
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {Math.round((preguntasContestadas / preguntas.length) * 100)}%
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <ProgressBar current={preguntaActual + 1} total={preguntas.length} />
            </div>
          </div>
        </div>

        {/* Tarjeta de pregunta */}
        {mode && (
          <div className="mb-4">
            {mode === 'prueba' ? (
              <div className="p-4 rounded-lg bg-green-50 border-2 border-green-200">
                <h4 className="font-bold">MODO PRUEBA</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                  <li>Este modo prueba es para practicar</li>
                  <li>No tiene límite de tiempo</li>
                </ul>
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-yellow-50 border-2 border-yellow-200">
                <h4 className="font-bold">MODO SIMULACION</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                  <li>Este modo es para hacer una pequeña simulación de examen</li>
                  <li>Tienes un tiempo de 45 minutos para 30 preguntas (recomendado)</li>
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="mb-6">
          <QuestionCard
            pregunta={pregunta.pregunta}
            opciones={pregunta.opciones}
            selectedAnswer={respuestaSeleccionada}
            onSelect={onSelectAnswer}
            correctAnswer={pregunta.respuesta}
            feedbackMode={feedbackState[preguntaActual]}
          />
        </div>

        {/* Botones de navegación principales */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={onPrevious}
            disabled={isFirstQuestion}
            className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
              isFirstQuestion
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-800 hover:bg-gray-50 hover:shadow-xl transform hover:scale-[1.02]'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
          </button>

          {!isLastQuestion ? (
            <button
              onClick={handleNextClick}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-2"
            >
              Siguiente
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={onFinish}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Finalizar Test
            </button>
          )}
        </div>

        {/* Navegación rápida */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Navegación rápida
          </h3>
          <div className="grid grid-cols-10 gap-2">
            {preguntas.map((_, index) => {
              const isAnswered = respuestas[index] !== undefined;
              const isCurrent = index === preguntaActual;
              const questionFeedback = feedbackState[index]; // correct / incorrect / undefined

              return (
                <button
                  key={index}
                  onClick={() => {
                    const diff = index - preguntaActual;
                    if (diff > 0) {
                      for (let i = 0; i < diff; i++) onNext();
                    } else if (diff < 0) {
                      for (let i = 0; i < Math.abs(diff); i++) onPrevious();
                    }
                  }}
                  className={`h-12 rounded-lg font-bold transition-all duration-200 ${
                    isCurrent
                      ? 'bg-gradient-to-br from-green-600 to-green-700 text-white ring-4 ring-green-300 shadow-lg scale-110'
                      : mode === 'prueba' && questionFeedback === 'correct'
                      ? 'bg-green-500 text-white hover:bg-green-600 hover:shadow-md'
                      : mode === 'prueba' && questionFeedback === 'incorrect'
                      ? 'bg-red-500 text-white hover:bg-red-600 hover:shadow-md'
                      : isAnswered
                      ? 'bg-green-100 text-green-700 hover:bg-green-200 hover:shadow-md'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:shadow-sm'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-200 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-green-600 to-green-700 rounded"></div>
              <span className="text-gray-600">Actual</span>
            </div>
            {mode === 'prueba' ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-gray-600">Correcta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-gray-600">Incorrecta</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 rounded"></div>
                  <span className="text-gray-600">Contestada</span>
                </div>
              </>
            )}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 rounded"></div>
              <span className="text-gray-600">Pendiente</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center mt-6 gap-3 no-print">
          <button
            onClick={() => handleDownloadExam(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow"
            title="Descargar/Imprimir examen"
          >
            Descargar examen
          </button>
          {canDownloadAnswers && (
            <button
              onClick={() => handleDownloadExam(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold shadow"
              title="Descargar/Imprimir examen con respuestas"
            >
              Descargar con respuestas
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestScreen;