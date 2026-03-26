import derechosHumanosData from './derechos_humanos.json';

const MONOGRAFICO_ONU_ANSWER_KEY = [
  'b', 'c', 'b', 'c', 'a', 'c', 'b', 'c', 'd', 'd',
  'c', 'a', 'c', 'a', 'c', 'd', 'c', 'c', 'b', 'c',
  'd', 'c', 'b', 'c', 'd', 'c', 'b', 'd', 'c', 'a',
  'c', 'd', 'c', 'd', 'a', 'c', 'b', 'd', 'a', 'a',
  'c', 'c', 'b', 'a', 'b', 'b', 'd', 'b', 'c', 'd',
  'a', 'a', 'b', 'b', 'd', 'b', 'a', 'c', 'c', 'd',
  'd', 'b', 'd', 'a', 'a', 'c', 'a', 'b', 'd', 'a',
  'c', 'b', 'd', 'a', 'a', 'a', 'd', 'c', 'b', 'a',
  'c', 'b', 'c', 'c', 'a', 'b', 'd', 'a', 'a', 'b'
];

const onuMonograficosData = derechosHumanosData
  .slice(0, MONOGRAFICO_ONU_ANSWER_KEY.length)
  .map((question, index) => ({
    ...question,
    respuesta: MONOGRAFICO_ONU_ANSWER_KEY[index]
  }));

export default onuMonograficosData;