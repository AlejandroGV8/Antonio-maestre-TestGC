import preguntas from './prl.json';
import { prlReferencias } from './prl_referencias.js';

const getQuestionNumber = (questionText) => {
  const match = String(questionText ?? '').match(/^\s*(\d+)\./);
  return match ? Number(match[1]) : null;
};

export default preguntas.map((p) => {
  const questionNumber = getQuestionNumber(p.pregunta);
  return {
    ...p,
    ...(questionNumber ? prlReferencias[questionNumber] || {} : {})
  };
});
