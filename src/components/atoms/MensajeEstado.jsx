// Presenta estados informativos o de error. El botón de reintento solo aparece
// cuando el componente recibe una función onReintentar.
export function MensajeEstado({ titulo, descripcion, tipo = 'info', onReintentar }) {
  const estilos =
    tipo === 'error'
      ? 'bg-rose-50 border-rose-200 text-rose-800'
      : 'bg-slate-50 border-slate-200 text-slate-700';

  return (
    <div className={`border rounded-xl p-6 text-center max-w-lg mx-auto my-8 ${estilos}`}>
      <h3 className="text-lg font-bold mb-1">{titulo}</h3>
      <p className="text-sm opacity-90">{descripcion}</p>
      {onReintentar && (
        <button
          type="button"
          onClick={onReintentar}
          className="mt-4 px-4 py-2 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 transition"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}