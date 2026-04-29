import proteccionDatosBase from './proteccion_datos.json';
import referenciasProteccionDatos from './proteccion_datos_referencias';

const proteccionDatosData = proteccionDatosBase.map((pregunta, index) => ({
  ...pregunta,
  ...(referenciasProteccionDatos[index + 1] ?? {})
}));

export default proteccionDatosData;