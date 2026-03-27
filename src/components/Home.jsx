import { useEffect, useState } from 'react';
import ThemeSelector from './ThemeSelector';

const Home = ({
  themes,
  selectedThemes,
  onToggleTheme,
  onStartTest,
  onOpenMonographicTests,
  onBackToGeneralTests,
  questionCount,
  setQuestionCount,
  isLoggedIn,
  onLogout,
  totalAvailableQuestions,
  canUseCustomQuestionCount,
  homeMode
}) => {
  const [questionCountInput, setQuestionCountInput] = useState(String(questionCount ?? ''));

  useEffect(() => {
    setQuestionCountInput(String(questionCount ?? ''));
  }, [questionCount]);

  const handleQuestionCountChange = (value) => {
    const onlyDigits = value.replace(/\D/g, '');

    if (onlyDigits === '') {
      setQuestionCountInput('');
      return;
    }

    const normalized = String(parseInt(onlyDigits, 10));
    setQuestionCountInput(Number.isNaN(Number(normalized)) ? '' : normalized);
  };

  const commitQuestionCount = () => {
    const parsed = Number.parseInt(questionCountInput, 10);
    const minQuestions = 5;
    const maxQuestions = Math.max(totalAvailableQuestions, minQuestions);

    if (Number.isNaN(parsed)) {
      setQuestionCount(minQuestions);
      setQuestionCountInput(String(minQuestions));
      return;
    }

    const clamped = Math.max(minQuestions, Math.min(parsed, maxQuestions));
    setQuestionCount(clamped);
    setQuestionCountInput(String(clamped));
  };

  const totalPreguntas = themes
    .filter(theme => selectedThemes.includes(theme.id))
    .reduce((sum, theme) => sum + theme.preguntas.length, 0);

  const canStart = selectedThemes.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 px-6 py-2 rounded-full font-bold text-sm tracking-wider shadow-lg">
                ACADEMIA GUARDIA CIVIL ANTONIO MAESTRE
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight">
              Sistema de Test
            </h1>
            <p className="text-xl text-gray-300 font-light">
              Preparacion profesional para tus oposiciones
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-700 to-green-600 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Configurar Test
              </h2>
              <p className="text-green-100 mt-1">Selecciona los temas que deseas practicar</p>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border border-gray-200 rounded-xl p-3 bg-slate-50">
                <div>
                  <p className="text-sm text-slate-600">Estado de sesion</p>
                  <div className="mt-1 text-base font-semibold">
                    {isLoggedIn ? 'Conectado como AntonioGC' : 'Modo invitado (sin login)'}
                  </div>
                </div>
                {isLoggedIn ? (
                  <button
                    onClick={onLogout}
                    className="text-sm font-semibold text-red-700 hover:text-red-900"
                  >Cerrar sesion</button>
                ) : null}
              </div>

              {canUseCustomQuestionCount && (
                <div className="border border-green-200 rounded-xl p-3 bg-green-50">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Cantidad de preguntas</label>
                  <input
                    type="number"
                    value={questionCountInput}
                    min={5}
                    max={Math.max(totalAvailableQuestions, 5)}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => handleQuestionCountChange(e.target.value)}
                    onBlur={commitQuestionCount}
                    className="w-full rounded-lg border border-green-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                  />
                  <p className="text-xs text-green-700 mt-1">Puedes generar hasta {totalAvailableQuestions} preguntas segun los temas seleccionados.</p>
                </div>
              )}

              <ThemeSelector
                themes={themes}
                selectedThemes={selectedThemes}
                onToggle={onToggleTheme}
              />

              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm font-semibold text-slate-700">
                  {homeMode === 'monografico' ? 'Mostrando test monograficos' : 'Mostrando test generales'}
                </p>
                {homeMode === 'monografico' ? (
                  <button
                    type="button"
                    onClick={onBackToGeneralTests}
                    className="text-sm font-semibold text-green-700 hover:text-green-900"
                  >
                    Volver a test generales
                  </button>
                ) : null}
              </div>

              {canStart && (
                <div className="bg-gradient-to-r from-green-50 to-yellow-50 border-2 border-green-200 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Banco de preguntas disponibles
                      </p>
                      <p className="text-3xl font-black text-green-700">
                        {totalPreguntas}
                        <span className="text-lg font-normal text-gray-600 ml-2">preguntas</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Test generado</p>
                      <p className="text-2xl font-bold text-yellow-600">{questionCount}</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={onStartTest}
                disabled={!canStart}
                className={`w-full py-5 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg ${
                  canStart
                    ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white transform hover:scale-[1.02] hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {canStart ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Comenzar Test
                  </span>
                ) : (
                  'Selecciona al menos un tema para continuar'
                )}
              </button>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onOpenMonographicTests}
                  className="text-center rounded-lg p-2 transition-colors hover:bg-green-50"
                >
                  <div className="text-2xl mb-1">📚</div>
                  <p className="text-xs text-gray-700 font-semibold">Test monograficos</p>
                </button>
                <div className="text-center">
                  <div className="text-2xl mb-1">🔄</div>
                  <p className="text-xs text-gray-600 font-medium">Aleatorio</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">✅</div>
                  <p className="text-xs text-gray-600 font-medium">Correccion instantanea</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 text-gray-400 text-sm">
            <p>Entrena duro, aprueba seguro</p>
            <p>Web Creada por: <b>Alejandro Gonzalez Vidal</b></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
