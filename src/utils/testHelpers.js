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

// Calcular resultados
export const calculateResults = (questions, answers) => {
  let aciertos = 0;
  
  questions.forEach((pregunta, index) => {
    if (answers[index] === pregunta.respuesta) {
      aciertos++;
    }
  });

  const fallos = questions.length - aciertos;
  const porcentaje = ((aciertos / questions.length) * 100).toFixed(1);

  return { aciertos, fallos, porcentaje };
};

// Obtener letra de la opción (a, b, c, d)
export const getOptionLetter = (index) => {
  return String.fromCharCode(97 + index); // 97 = 'a'
};