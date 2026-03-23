import { useState } from 'react';
import Home from './components/Home';
import TestScreen from './components/TestScreen';
import Results from './components/Results';
import LoginPage from './components/LoginPage';
import { selectRandomQuestions } from './utils/testHelpers';
import ModeModal from './components/ModeModal';

// Importa tus JSONs
import viogenData from './data/viogen.json';
import prlData from './data/prl.json';
import ueData from './data/ue.json';
import igualdadData from './data/igualdad.json';
import derechoConsitucionalData from './data/derecho_constitucional.json';
import derechosHumanosData from './data/derechos_humanos.json';
import derechoCivilData from './data/derecho_civil.json';
import derechoPenalData from './data/derecho_penal.json';

function App() {
  const API_BASE_URL = 'https://o190h5xj5e.execute-api.eu-west-1.amazonaws.com';

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
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('gc-academia-themes');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) { }
      }
    }

    return [
      {
        id: 'viogen',
        nombre: 'VIOGEN',
        preguntas: viogenData
      },
      {
        id: 'prl',
        nombre: 'Prevención de Riesgos Laborales',
        preguntas: prlData
      },
      {
        id: 'ue',
        nombre: 'Unión Europea',
        preguntas: ueData
      },
      {
        id: 'igualdad',
        nombre: 'Igualdad',
        preguntas: igualdadData
      },
      {
        id: 'derecho_constitucional',
        nombre: 'Derecho Constitucional',
        preguntas: derechoConsitucionalData
      },
      {
        id: 'derechos_humanos',
        nombre: 'Derechos Humanos',
        preguntas: derechosHumanosData
      },
      {
        id: 'derecho_civil',
        nombre: 'Derecho Civil',
        preguntas: derechoCivilData
      },
      {
        id: 'derecho_penal',
        nombre: 'Derecho Penal',
        preguntas: derechoPenalData
      }
    ];
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

  const startTestWithMode = async (mode) => {
    let allQuestions = [];

    if (isLoggedIn && API_BASE_URL) {
      const apiQuestionsList = await Promise.all(
        selectedThemes.map(async (themeId) => {
          const data = await loadThemeQuestionsFromApi(themeId);
          return Array.isArray(data) ? data : [];
        })
      );
      allQuestions = apiQuestionsList.flat();

      if (allQuestions.length === 0) {
        // Fallback local JSON si API no regresa datos
        allQuestions = themes
          .filter(theme => selectedThemes.includes(theme.id))
          .flatMap(theme => theme.preguntas);
      }
    } else {
      allQuestions = themes
        .filter(theme => selectedThemes.includes(theme.id))
        .flatMap(theme => theme.preguntas);
    }

    const maxQuestions = allQuestions.length;
    const requested = Number(questionCount || 30);
    const count = Math.max(5, Math.min(requested, maxQuestions || 30));

    const selectedQuestions = selectRandomQuestions(allQuestions, count);

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
    setSelectedThemes([]);
    setTestQuestions([]);
    setAnswers({});
    setLoginError('');
  };

  const totalAvailableQuestions = themes
    .filter(theme => selectedThemes.includes(theme.id))
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
          themes={themes}
          selectedThemes={selectedThemes}
          onToggleTheme={handleToggleTheme}
          onStartTest={handleStartTest}
          questionCount={questionCount}
          setQuestionCount={setQuestionCount}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          totalAvailableQuestions={totalAvailableQuestions}
          canUseCustomQuestionCount={true}
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