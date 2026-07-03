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

// Pesos aproximados por tema basados en la tendencia de examenes recientes.
// Si se selecciona un subconjunto de temas, se normalizan automaticamente.
const THEME_EXAM_WEIGHTS = {
  derechos_humanos: 11.0,
  igualdad: 2.2,
  prl: 2.8,
  derecho_constitucional: 8.6,
  ue: 4.7,
  instituciones_internacionales: 3.6,
  derecho_civil: 4.1,
  derecho_penal: 6.4,
  derecho_procesal_penal: 10.0,
  derecho_administrativo: 5.4,
  proteccion_datos: 2.3,
  tema_12_extranjeria: 3.5,
  seguridad_publica_privada: 4.5,
  tema_14_ministerios: 3.0,
  fuerzas_cuerpos_seguridad: 6.9,
  tema_16_proteccion_civil_desarrollo_sostenible_eficiencia_energetica: 3.7,
  tema_17_tic: 3.0,
  tema_18_topografia: 2.5,
  tema_19_deontologia_profesional: 1.8,
  tema_20_responsabilidad_penal_menores: 2.0,
  viogen: 2.0,
  tema_22_armas_explosivos: 4.3,
  tema_23_derecho_fiscal: 2.3
};

// Seleccionar N preguntas distribuidas por pesos de examen.
// Si faltan pesos para algun tema, se usa peso 1 como fallback.
export const selectQuestionsDistributedByTheme = (questions, count) => {
  const questionsByTheme = {};
  const themeOrder = [];

  questions.forEach((question) => {
    const themeId = question.__themeId;
    if (!questionsByTheme[themeId]) {
      questionsByTheme[themeId] = [];
      themeOrder.push(themeId);
    }
    questionsByTheme[themeId].push(question);
  });

  if (themeOrder.length === 0 || count <= 0) return [];

  const availableByTheme = Object.fromEntries(
    themeOrder.map((themeId) => [themeId, questionsByTheme[themeId].length])
  );
  const totalAvailable = themeOrder.reduce((sum, themeId) => sum + availableByTheme[themeId], 0);
  const targetCount = Math.min(count, totalAvailable);

  const allocation = Object.fromEntries(themeOrder.map((themeId) => [themeId, 0]));

  // Si hay hueco suficiente, garantiza presencia de todos los temas elegidos.
  let remaining = targetCount;
  if (targetCount >= themeOrder.length) {
    themeOrder.forEach((themeId) => {
      if (availableByTheme[themeId] > 0) {
        allocation[themeId] = 1;
        remaining -= 1;
      }
    });
  }

  const weightByTheme = Object.fromEntries(
    themeOrder.map((themeId) => [themeId, THEME_EXAM_WEIGHTS[themeId] ?? 1])
  );
  const totalWeight = themeOrder.reduce((sum, themeId) => sum + weightByTheme[themeId], 0) || 1;

  // Reparto base proporcional por pesos.
  const remainders = [];
  themeOrder.forEach((themeId) => {
    const rawShare = (remaining * weightByTheme[themeId]) / totalWeight;
    const base = Math.floor(rawShare);
    const maxExtraCapacity = Math.max(0, availableByTheme[themeId] - allocation[themeId]);
    const granted = Math.min(base, maxExtraCapacity);
    allocation[themeId] += granted;
    remainders.push({
      themeId,
      fraction: rawShare - base
    });
  });

  let allocatedTotal = themeOrder.reduce((sum, themeId) => sum + allocation[themeId], 0);

  // Reparto por restos mayores respetando capacidad por tema.
  remainders.sort((a, b) => b.fraction - a.fraction);
  let remainderIndex = 0;
  while (allocatedTotal < targetCount) {
    const current = remainders[remainderIndex % remainders.length];
    const { themeId } = current;
    if (allocation[themeId] < availableByTheme[themeId]) {
      allocation[themeId] += 1;
      allocatedTotal += 1;
    }
    remainderIndex += 1;

    // Freno de seguridad para evitar bucles en casos degenerados.
    if (remainderIndex > targetCount * 10) break;
  }

  const selected = [];
  themeOrder.forEach((themeId) => {
    const themesQuestions = shuffleArray(questionsByTheme[themeId]);
    const qtyForThisTheme = allocation[themeId];
    selected.push(...themesQuestions.slice(0, qtyForThisTheme));
  });

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