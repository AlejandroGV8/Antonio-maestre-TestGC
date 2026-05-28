import { useState } from 'react';

const findCorrectOptionText = (question) => {
  const rawAnswer = String(question?.respuesta ?? '').trim().toLowerCase();

  if (!rawAnswer) return 'No disponible';

  const options = Array.isArray(question?.opciones) ? question.opciones : [];
  const answerIndex = rawAnswer.charCodeAt(0) - 97;

  if (answerIndex >= 0 && answerIndex < options.length) {
    return options[answerIndex];
  }

  const byPrefix = options.find((option) =>
    String(option).trim().toLowerCase().startsWith(`${rawAnswer})`)
  );
  if (byPrefix) return byPrefix;

  return `Respuesta: ${question.respuesta}`;
};

const AnswersViewer = ({ themes, onBack }) => {
  const [firstTheme] = themes;
  const [selectedThemeId, setSelectedThemeId] = useState(firstTheme?.id ?? '');

  const selectedTheme = themes.find((theme) => theme.id === selectedThemeId) ?? null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white">Ver respuestas</h1>
              <p className="text-green-100 mt-1">Selecciona un tema y consulta todas las preguntas con su solucion.</p>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="self-start rounded-lg bg-white/95 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-white"
            >
              Volver al inicio
            </button>
          </div>

          <div className="mb-6 rounded-2xl bg-white/95 p-5 shadow-2xl">
            <label className="mb-2 block text-sm font-semibold text-slate-700">Tema</label>
            <select
              value={selectedThemeId}
              onChange={(e) => setSelectedThemeId(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-green-500 focus:outline-none"
            >
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.nombre}
                </option>
              ))}
            </select>
          </div>

          {selectedTheme ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
                <span className="font-semibold">Tema seleccionado:</span> {selectedTheme.nombre} · {selectedTheme.preguntas.length} preguntas
              </div>

              {selectedTheme.preguntas.map((question, index) => (
                <article key={`${selectedTheme.id}-${index}`} className="rounded-2xl bg-white/95 p-5 shadow-lg">
                  <h2 className="text-base font-semibold text-slate-900">{question.pregunta}</h2>

                  <p className="mt-4 text-sm font-semibold text-green-700">Respuesta correcta</p>
                  <p className="mt-1 text-slate-800">{findCorrectOptionText(question)}</p>

                  {question.referenciaTema ? (
                    <div className="mt-4 rounded-lg border border-yellow-300 bg-yellow-50 p-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-yellow-900">Referencia</p>
                      <p className="mt-1 text-sm font-semibold text-yellow-900">{question.referenciaTema}</p>
                      {question.extractoTema ? (
                        <p className="mt-2 text-sm text-yellow-900/90">{question.extractoTema}</p>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white/95 p-6 text-center text-slate-700 shadow-2xl">
              No hay temas disponibles.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswersViewer;
