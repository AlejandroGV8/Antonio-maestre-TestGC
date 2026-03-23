import { useState } from 'react';

const LoginPage = ({ onLogin, onContinueWithoutLogin, error }) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ usuario, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800/95 border border-emerald-500/40 backdrop-blur-xl rounded-2xl shadow-2xl">
        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-black text-amber-200">Academia Guardia Civil</h1>
          </div>

          {error && (
            <div className="mb-3 rounded-lg border border-red-300 bg-red-100 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-amber-100">Usuario</label>
              <input
                className="mt-1 w-full border border-emerald-300/50 bg-slate-900 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Escribe tu usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-100">Contraseña</label>
              <input
                type="password"
                className="mt-1 w-full border border-emerald-300/50 bg-slate-900 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Escribe tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={onContinueWithoutLogin}
              className="text-sm font-semibold text-amber-200 hover:text-amber-300 hover:underline"
            >
              Continuar sin logear
            </button>
          </div>

          <div className="mt-6 text-xs text-slate-300 text-center">
            <p>Inicia sesión para descargar examen con respuestas y elegir cantidad de preguntas.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
