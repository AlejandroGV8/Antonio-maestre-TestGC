import express from 'express';
import fs from 'fs';
import path from 'path';
import serverless from 'serverless-http';

const app = express();
const PORT = process.env.PORT || 4000;

const defaultDataDir = path.join(process.cwd(), 'src', 'data');
const dataDir = process.env.DATA_DIR || defaultDataDir;
if (!fs.existsSync(dataDir)) {
  console.warn(`DATA_DIR no existe: ${dataDir}. Asegúrate de desplegar src/data`);
}

const themeFiles = {
  viogen: 'viogen.json',
  prl: 'prl.json',
  ue: 'ue.json',
  igualdad: 'igualdad.json',
  derecho_constitucional: 'derecho_constitucional.json',
  derechos_humanos: 'derechos_humanos.json',
  instituciones_internacionales: 'instituciones_internacionales.json',
  proteccion_datos: 'proteccion_datos.json'
};

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const loadJson = (fileName) => {
  const filePath = path.join(dataDir, fileName);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
};

const saveJson = (fileName, data) => {
  const filePath = path.join(dataDir, fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

app.get('/api/themes', (req, res) => {
  const themes = Object.entries(themeFiles).map(([id, file]) => ({ id, file }));
  res.json(themes);
});

app.get('/api/themes/:themeId/questions', (req, res) => {
  const { themeId } = req.params;
  const fileName = themeFiles[themeId];
  if (!fileName) return res.status(404).json({ error: 'Tema no encontrado.' });

  try {
    const data = loadJson(fileName);
    res.json(data);
  } catch (err) {
    console.error('Error loading questions from', path.join(dataDir, fileName), err);
    res.status(500).json({ error: 'No se pudo leer preguntas. Revisa dataDir y archivos en el despliegue.' });
  }
});

app.post('/api/themes/:themeId/questions', (req, res) => {
  const { themeId } = req.params;
  const fileName = themeFiles[themeId];
  if (!fileName) {
    return res.status(404).json({ error: 'Tema no encontrado' });
  }

  const { pregunta, opciones, respuesta } = req.body;
  if (!pregunta || !Array.isArray(opciones) || opciones.length < 2 || !respuesta) {
    return res.status(400).json({ error: 'Datos inválidos. pregunta, opciones y respuesta son requeridos.' });
  }

  try {
    const current = loadJson(fileName);
    const nueva = { pregunta, opciones, respuesta };
    current.push(nueva);
    saveJson(fileName, current);
    res.status(201).json(nueva);
  } catch (err) {
    console.error('Error guardando pregunta en', path.join(dataDir, fileName), err);
    res.status(500).json({ error: 'Error guardando pregunta. Revisa dataDir y permisos.' });
  }
});

const handler = serverless(app);

if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
  app.listen(PORT, () => {
    console.log(`API servidor corriendo en http://localhost:${PORT}`);
  });
}

export { handler };