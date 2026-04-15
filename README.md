# Sistema de Test - Academia Guardia Civil Antonio Maestre

Aplicación web de entrenamiento para oposiciones a Guardia Civil, centrada en la práctica por temas reales del temario y en la mejora del rendimiento del alumno con simulaciones y revisión detallada.

## Que es esta app

Esta plataforma permite generar tests de forma dinámica a partir de un banco de preguntas por materias. El alumno puede practicar de forma libre o simular condiciones de examen, y al finalizar obtiene métricas claras para saber en qué debe mejorar.

## Valor para quien la usa

- Entrenamiento enfocado: eliges exactamente los temas que quieres reforzar.
- Preparación realista: incluye modo simulación con límite de tiempo.
- Feedback útil: muestra aciertos, fallos y revisión pregunta por pregunta.
- Ahorro de tiempo: crea tests aleatorios en segundos sin preparar material manualmente.
- Seguimiento del progreso: porcentaje final y detalle de respuestas para detectar puntos débiles.

## Funcionalidades principales

- Selección de temas para construir el test.
- Generación aleatoria de preguntas desde el banco disponible.
- Configuración de cantidad de preguntas.
- Dos modos de uso:
	- Modo prueba: práctica sin límite de tiempo.
	- Modo simulación: examen con temporizador de 45 minutos.
- Navegación rápida entre preguntas.
- Corrección y resultados al finalizar.
- Exportación/impresión de examen.

## Funciones para alumno (usuario)

- Entrar en modo invitado y empezar a practicar rápidamente.
- Elegir materias y lanzar un test personalizado.
- Ver progreso durante el examen.
- Revisar respuestas al finalizar con resumen de rendimiento.
- Descargar o imprimir el examen sin respuestas.

## Funciones para administrador (usuario con login)

- Inicio de sesión para acceso avanzado.
- Posibilidad de descargar examen con respuestas.
- Descarga de resultados con respuestas en formato texto.
- Base lista para gestión de preguntas por tema desde backend/API.


## Tecnologías

- Frontend: React + Vite + TailwindCSS
- Backend/API: Node.js + Express
- Despliegue backend compatible con Serverless (AWS Lambda mediante serverless-http)

## Ejecución en local

### Requisitos

- Node.js 18+
- npm

### 1) Instalar dependencias

```bash
npm install
```

### 2) Iniciar frontend

```bash
npm run dev
```

## Flujo recomendado de uso

1. Seleccionar temas a reforzar.
2. Definir cantidad de preguntas.
3. Elegir modo (prueba o simulación).
4. Realizar el test y revisar resultados.
5. Repetir test centrando el estudio en los fallos.

## Objetivo

Ayudar al opositor a estudiar con más foco, medir su nivel real y mejorar su preparación de forma constante y práctica.
