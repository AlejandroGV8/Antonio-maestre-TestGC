import preguntas from './prl.json';
import { prlReferencias } from './prl_referencias.js';

export default preguntas.map((p, i) => ({
  ...p,
  ...(prlReferencias[i + 1] || {})
}));
