// Indicador de espera accesible, con texto ajustable según la operación activa.
export function Spinner({ texto = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3" role="status">
      <div className="w-10 h-10 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin" />
      <p className="text-slate-600 font-medium text-sm">{texto}</p>
    </div>
  );
}