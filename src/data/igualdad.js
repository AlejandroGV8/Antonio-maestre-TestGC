import preguntas from './igualdad.json';
import { igualdadReferencias } from './igualdad_referencias.js';

export default preguntas.map((p, i) => ({
  ...p,
  ...(igualdadReferencias[i + 1] || {}),
}));
