// Mezclar array aleatoriamente usando Fisher-Yates shuffle
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Seleccionar N preguntas aleatorias
export const selectRandomQuestions = (questions, count) => {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, Math.min(count, questions.length));
};

// Seleccionar N preguntas manteniéndolas agrupadas por tema (orden: temas en el orden seleccionado)
export const selectQuestionsByTheme = (questions, count) => {
  // El array 'questions' ya viene etiquetado con __themeId y agrupado por tema
  // Solo necesitamos tomar los primeros 'count' preguntas
  // las cuales respetarán el orden de temas
  return questions.slice(0, Math.min(count, questions.length));
};

// Seleccionar N preguntas distribuidas de forma equilibrada entre TODOS los temas
// Garantiza que TODOS los temas seleccionados aparezcan, respetando SYLLABUS_ORDER
export const selectQuestionsDistributedByTheme = (questions, count) => {
  // Agrupar preguntas por tema (manteniendo el __themeId)
  const questionsByTheme = {};
  const themeOrder = []; // Mantener el orden de temas según aparecen (ya está ordenado por SYLLABUS_ORDER)
  
  questions.forEach(question => {
    const themeId = question.__themeId;
    if (!questionsByTheme[themeId]) {
      questionsByTheme[themeId] = [];
      themeOrder.push(themeId);
    }
    questionsByTheme[themeId].push(question);
  });

  const numThemes = themeOrder.length;
  
  // Si tenemos pocos temas, aseguramos al menos 1 pregunta por tema
  // Si tenemos muchos temas, distribuimos de forma equilibrada
  let questionsPerTheme = Math.floor(count / numThemes);
  let remainder = count % numThemes;
  
  // Asegurar que cada tema tenga al menos 1 pregunta (si hay suficientes)
  questionsPerTheme = Math.max(1, questionsPerTheme);
  
  // Seleccionar preguntas de cada tema en orden (respetando SYLLABUS_ORDER)
  const selected = [];
  themeOrder.forEach((themeId, index) => {
    const themesQuestions = shuffleArray(questionsByTheme[themeId]);
    // Los primeros 'remainder' temas obtienen una pregunta extra
    const qtyForThisTheme = questionsPerTheme + (index < remainder ? 1 : 0);
    selected.push(...themesQuestions.slice(0, qtyForThisTheme));
  });
  
  // Retornar exactamente 'count' preguntas (o menos si no hay suficientes)
  return selected.slice(0, Math.min(count, selected.length));
};

// Calcular resultados
export const calculateResults = (questions, answers, options = {}) => {
  const scoringMode = options.scoringMode || 'standard';

  let aciertos = 0;
  let fallos = 0;
  let noRespondidas = 0;

  questions.forEach((pregunta, index) => {
    const respuestaUsuario = answers[index];

    if (respuestaUsuario === undefined) {
      noRespondidas++;
      return;
    }

    if (respuestaUsuario === pregunta.respuesta) {
      aciertos++;
    } else {
      fallos++;
    }
  });

  const total = questions.length || 1;
  const porcentaje = ((aciertos / total) * 100).toFixed(1);

  if (scoringMode === 'official') {
    // Formula oficial tipo test: Nota = Aciertos - (Fallos / 3)
    const notaFormula = aciertos - (fallos / 3);
    const puntosOficial = Math.max(0, Number(((notaFormula / total) * 100).toFixed(2)));

    return {
      aciertos,
      fallos,
      noRespondidas,
      porcentaje,
      notaFormula: Number(notaFormula.toFixed(2)),
      puntosOficial,
      corteOficial: 50,
      aprobadoOficial: puntosOficial >= 50
    };
  }

  return { aciertos, fallos, noRespondidas, porcentaje };
};

// Obtener letra de la opción (a, b, c, d)
export const getOptionLetter = (index) => {
  return String.fromCharCode(97 + index); // 97 = 'a'
};