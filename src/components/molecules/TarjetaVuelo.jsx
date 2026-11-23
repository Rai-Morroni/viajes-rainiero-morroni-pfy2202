import { Badge } from '../atoms/Badge';

// Traduce el estado de disponibilidad del vuelo a una variante visual de Badge.
function obtenerVarianteEstado(disponibilidad) {
  if (disponibilidad === 'Disponible') return 'verde';
  if (disponibilidad === 'Agotado') return 'rojo';
  return 'amarillo';
}

// Muestra aerolínea, itinerario, precio y disponibilidad de un vuelo.
export function TarjetaVuelo({ vuelo }) {
  return (
    <div className="bg-white border border-slate-200 rounded-sm p-5 flex flex-col justify-between gap-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-bold text-slate-900 text-lg">{vuelo.aerolinea}</h4>
          <p className="text-xs text-slate-500">{vuelo.escalas}</p>
        </div>
        <Badge variante={obtenerVarianteEstado(vuelo.disponibilidad)}>
          {vuelo.disponibilidad}
        </Badge>
      </div>

      <div className="text-sm text-slate-600 space-y-1">
        <p><span className="font-semibold">Salida:</span> {vuelo.fechaSalida}</p>
        <p><span className="font-semibold">Regreso:</span> {vuelo.fechaRegreso}</p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
        <span className="text-xs text-slate-500">Ida y vuelta</span>
        <span className="text-2xl font-extrabold text-[#D71920]">${vuelo.precio} USD</span>
      </div>
    </div>
  );
}