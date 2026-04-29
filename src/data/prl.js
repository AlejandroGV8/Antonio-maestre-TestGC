import preguntas from './prl.json';
import { prlReferencias } from './prl_referencias.js';

export default preguntas.map((p, i) => ({
  ...p,
  ...(prlReferencias[Number(String(p.pregunta).match(/^\s*(\d+)\./)?.[1]) || i + 1] || {})
}));
