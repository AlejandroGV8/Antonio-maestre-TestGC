import React from 'react';

const ModeModal = ({ onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold">Selecciona modo de test</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Cerrar</button>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border-2 border-green-200 bg-green-50">
            <h4 className="font-bold text-lg">MODO PRUEBA</h4>
            <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
              <li>Este modo prueba es para practicar</li>
              <li>No tiene límite de tiempo</li>
            </ul>
            <div className="mt-4">
              <button
                onClick={() => onSelect('prueba')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold"
              >
                Seleccionar MODO PRUEBA
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg border-2 border-yellow-200 bg-yellow-50">
            <h4 className="font-bold text-lg">MODO SIMULACION</h4>
            <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
              <li>Este modo es para hacer una pequeña simulación de examen</li>
              <li>Tienes un tiempo limitado para completar el test de 45 minutos</li>
            </ul>
            <div className="mt-4">
              <button
                onClick={() => onSelect('simulacion')}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold"
              >
                Seleccionar MODO SIMULACION
              </button>
            </div>
          </div>

          <div className="text-right">
            <button onClick={onClose} className="text-sm text-gray-600 hover:underline">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeModal;
