import { useState } from 'react';
import Home from './components/Home';
import TestScreen from './components/TestScreen';
import Results from './components/Results';
import LoginPage from './components/LoginPage';
import { selectRandomQuestions } from './utils/testHelpers';
import ModeModal from './components/ModeModal';

// Importa tus JSONs
import viogenData from './data/viogen.json';
import prlData from './data/prl.js';
import ueData from './data/ue.json';
import igualdadData from './data/igualdad.js';
import derechoConsitucionalData from './data/derecho_constitucional.json';
import derechosHumanosData from './data/derechos_humanos.json';
import derechoCivilData from './data/derecho_civil.json';
import derechoPenalData from './data/derecho_penal.json';
import derechoProcesalPenalData from './data/derecho_procesal_penal.json';
import derechoAdministrativoData from './data/derecho_administrativo.json';
import institucionesInternacionalesData from './data/instituciones_internacionales.json';
import proteccionDatosData from './data/proteccion_datos';
import onuMonograficosData from './data/onu_monograficos';

function App() {
  const API_BASE_URL = 'https://o190h5xj5e.execute-api.eu-west-1.amazonaws.com';
  const MONOGRAFICO_THEME_ID = 'onu_monograficos';
  const SYLLABUS_ORDER = {
    derechos_humanos: 1,
    igualdad: 2,
    prl: 3,
    derecho_constitucional: 4,
    ue: 5,
    instituciones_internacionales: 6,
    derecho_civil: 7,
    derecho_penal: 8,
    derecho_procesal_penal: 9,
    derecho_administrativo: 10,
    proteccion_datos: 11,
    onu_monograficos: 12,
    viogen: 21
  };

  const getThemeOrder = (themeId) => SYLLABUS_ORDER[themeId] ?? Number.MAX_SAFE_INTEGER;

  const sortQuestionsBySyllabus = (questions, direction = 'asc') => {
    const multiplier = direction === 'desc' ? -1 : 1;

    return [...questions].sort((a, b) => {
      const orderDiff = (getThemeOrder(a.__themeId) - getThemeOrder(b.__themeId)) * multiplier;
      if (orderDiff !== 0) return orderDiff;
      return 0;
    });
  };

  const loadThemeQuestionsFromApi = async (themeId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/themes/${themeId}/questions`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Error cargando preguntas API:', themeId, err.message);
      return null;
    }
  };

  const loadThemes = () => {
    const defaultThemes = [
      {
        id: 'viogen',
        nombre: 'VIOGEN',
        tipo: 'general',
        preguntas: viogenData
      },
      {
        id: 'prl',
        nombre: 'Prevención de Riesgos Laborales',
        tipo: 'general',
        preguntas: prlData
      },
      {
        id: 'ue',
        nombre: 'Unión Europea',
        tipo: 'general',
        preguntas: ueData
      },
      {
        id: 'igualdad',
        nombre: 'Igualdad',
        tipo: 'general',
        preguntas: igualdadData
      },
      {
        id: 'derecho_constitucional',
        nombre: 'Derecho Constitucional',
        tipo: 'general',
        preguntas: derechoConsitucionalData
      },
      {
        id: 'derechos_humanos',
        nombre: 'Derechos Humanos',
        tipo: 'general',
        preguntas: derechosHumanosData
      },
      {
        id: 'instituciones_internacionales',
        nombre: 'Instituciones Internacionales',
        tipo: 'general',
        preguntas: institucionesInternacionalesData
      },
      {
        id: 'derecho_civil',
        nombre: 'Derecho Civil',
        tipo: 'general',
        preguntas: derechoCivilData
      },
      {
        id: 'derecho_penal',
        nombre: 'Derecho Penal',
        tipo: 'general',
        preguntas: derechoPenalData
      },
      {
        id: 'derecho_procesal_penal',
        nombre: 'Derecho Procesal Penal',
        tipo: 'general',
        preguntas: derechoProcesalPenalData
      },
      {
        id: 'derecho_administrativo',
        nombre: 'Derecho Administrativo',
        tipo: 'general',
        preguntas: derechoAdministrativoData
      },
      {
        id: 'proteccion_datos',
        nombre: 'Protección de Datos',
        tipo: 'general',
        preguntas: proteccionDatosData
      },
      {
        id: MONOGRAFICO_THEME_ID,
        nombre: 'Carta de las Naciones Unidas',
        tipo: 'monografico',
        preguntas: onuMonograficosData
      }
    ];

    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('gc-academia-themes');
      if (saved) {
        try {
          const savedThemes = JSON.parse(saved);

          if (Array.isArray(savedThemes)) {
            const savedById = new Map(savedThemes.map((theme) => [theme.id, theme]));
            const mergedThemes = defaultThemes.map((theme) => {
              const savedTheme = savedById.get(theme.id);
              if (!savedTheme) return theme;

              // Mantiene metadatos guardados (si existen), pero siempre usa
              // el banco de preguntas actual del codigo para evitar desfaces.
              return {
                ...savedTheme,
                ...theme,
                preguntas: theme.preguntas
              };
            });
            const extraSavedThemes = savedThemes.filter(
              (theme) => !defaultThemes.some((defaultTheme) => defaultTheme.id === theme.id)
            );

            return [...mergedThemes, ...extraSavedThemes];
          }
        } catch (e) { }
      }
    }

    return defaultThemes;
  };

  const [themes] = useState(loadThemes);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [questionCount, setQuestionCount] = useState(30);
  const [testQuestions, setTestQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showModeModal, setShowModeModal] = useState(false);
  const [testMode, setTestMode] = useState('prueba');
  const [homeMode, setHomeMode] = useState('general');

  const handleToggleTheme = (themeId) => {
    setSelectedThemes(prev =>
      prev.includes(themeId)
        ? prev.filter(id => id !== themeId)
        : [...prev, themeId]
    );
  };

  const handleLogin = ({ usuario, password }) => {
    const validUser = 'AntonioGC';
    const validPass = 'AntonioProfesor1234';

    if (usuario.trim() === validUser && password === validPass) {
      setIsLoggedIn(true);
      setLoginError('');
      setCurrentScreen('home');
      return true;
    }

    setIsLoggedIn(false);
    setLoginError('Usuario o contraseña incorrectos. Intenta de nuevo.');
    return false;
  };

  const handleContinueWithoutLogin = () => {
    setIsLoggedIn(false);
    setLoginError('');
    setCurrentScreen('home');
  };

  const handleStartTest = () => {
    if (selectedThemes.length === 0) return;
    setShowModeModal(true);
  };

  const handleOpenMonographicTests = () => {
    setHomeMode('monografico');
    setSelectedThemes([]);
    setQuestionCount(30);
  };

  const handleBackToGeneralTests = () => {
    setHomeMode('general');
    setSelectedThemes([]);
    setQuestionCount(30);
  };

  const handleSelectAllThemes = () => {
    const allThemeIds = visibleThemes.map(theme => theme.id);
    setSelectedThemes(allThemeIds);
  };

  const handleDeselectAllThemes = () => {
    setSelectedThemes([]);
  };

  const startTestWithMode = async (mode) => {
    let allQuestions = [];

    if (isLoggedIn && API_BASE_URL) {
      const apiQuestionsList = await Promise.all(
        selectedThemes.map(async (themeId) => {
          const data = await loadThemeQuestionsFromApi(themeId);
          if (!Array.isArray(data)) return [];
          return data.map((question) => ({ ...question, __themeId: themeId }));
        })
      );
      allQuestions = apiQuestionsList.flat();

      if (allQuestions.length === 0) {
        // Fallback local JSON si API no regresa datos
        allQuestions = themes
          .filter(theme => selectedThemes.includes(theme.id))
          .flatMap(theme => theme.preguntas.map((question) => ({ ...question, __themeId: theme.id })));
      }
    } else {
      allQuestions = themes
        .filter(theme => selectedThemes.includes(theme.id))
        .flatMap(theme => theme.preguntas.map((question) => ({ ...question, __themeId: theme.id })));
    }

    const maxQuestions = allQuestions.length;
    const requested = Number(questionCount || 30);
    const count = Math.max(5, Math.min(requested, maxQuestions || 30));

    // En cada examen se decide aleatoriamente si el bloque de temas va de 1->23 o de 23->1.
    const syllabusDirection = Math.random() < 0.5 ? 'asc' : 'desc';
    const selectedQuestions = sortQuestionsBySyllabus(
      selectRandomQuestions(allQuestions, count),
      syllabusDirection
    );

    setTestMode(mode || 'prueba');
    setTestQuestions(selectedQuestions);
    setCurrentQuestion(0);
    setAnswers({});
    setCurrentScreen('test');
    setShowModeModal(false);
  };

  const handleSelectAnswer = (answer) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    setCurrentScreen('results');
  };

  const handleNewTest = () => {
    setCurrentScreen('home');
    setTestQuestions([]);
    setCurrentQuestion(0);
    setAnswers({});
    setShowModeModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
    setHomeMode('general');
    setSelectedThemes([]);
    setTestQuestions([]);
    setAnswers({});
    setLoginError('');
  };

  const visibleThemes = themes
    .filter(theme =>
      homeMode === 'monografico' ? theme.tipo === 'monografico' : theme.tipo !== 'monografico'
    )
    .sort((a, b) => {
      const orderDiff = getThemeOrder(a.id) - getThemeOrder(b.id);
      if (orderDiff !== 0) return orderDiff;
      return a.nombre.localeCompare(b.nombre, 'es');
    });

  const totalAvailableQuestions = themes
    .filter(theme => selectedThemes.includes(theme.id) && visibleThemes.some(visible => visible.id === theme.id))
    .reduce((sum, theme) => sum + theme.preguntas.length, 0);

  return (
    <>
      {currentScreen === 'login' && (
        <LoginPage
          onLogin={handleLogin}
          onContinueWithoutLogin={handleContinueWithoutLogin}
          error={loginError}
        />
      )}

      {currentScreen === 'home' && (
        <Home
          themes={visibleThemes}
          selectedThemes={selectedThemes}
          onToggleTheme={handleToggleTheme}
          onSelectAllThemes={handleSelectAllThemes}
          onDeselectAllThemes={handleDeselectAllThemes}
          onStartTest={handleStartTest}
          onOpenMonographicTests={handleOpenMonographicTests}
          onBackToGeneralTests={handleBackToGeneralTests}
          questionCount={questionCount}
          setQuestionCount={setQuestionCount}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          totalAvailableQuestions={totalAvailableQuestions}
          canUseCustomQuestionCount={true}
          homeMode={homeMode}
        />
      )}

      {currentScreen === 'test' && (
        <TestScreen
          preguntas={testQuestions}
          preguntaActual={currentQuestion}
          respuestas={answers}
          onSelectAnswer={handleSelectAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onFinish={handleFinish}
          mode={testMode}
          canDownloadAnswers={isLoggedIn}
        />
      )}

      {currentScreen === 'results' && (
        <Results
          preguntas={testQuestions}
          respuestas={answers}
          onNewTest={handleNewTest}
          canDownloadAnswers={isLoggedIn}
        />
      )}

      {showModeModal && (
        <ModeModal onSelect={startTestWithMode} onClose={() => setShowModeModal(false)} />
      )}
    </>
  );
}

export default App;