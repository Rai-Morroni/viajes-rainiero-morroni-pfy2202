import { Badge } from '../atoms/Badge';

// Mantiene el mismo código visual de disponibilidad que las tarjetas de vuelo.
function obtenerVarianteEstado(disponibilidad) {
  if (disponibilidad === 'Disponible') return 'verde';
  if (disponibilidad === 'Agotado') return 'rojo';
  return 'amarillo';
}

// Muestra alojamiento, categoría, fechas, precio por noche y disponibilidad.
export function TarjetaHotel({ hotel }) {
  return (
    <div className="bg-white border border-slate-200 rounded-sm p-5 flex flex-col justify-between gap-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-bold text-slate-900 text-lg">{hotel.nombre}</h4>
          <p className="text-amber-500 text-sm" aria-label={`${hotel.estrellas} estrellas`}>
            {'★'.repeat(hotel.estrellas)}{'☆'.repeat(5 - hotel.estrellas)}
          </p>
        </div>
        <Badge variante={obtenerVarianteEstado(hotel.disponibilidad)}>
          {hotel.disponibilidad}
        </Badge>
      </div>

      <p className="text-sm text-slate-600">
        <span className="font-semibold">Fechas:</span> {hotel.fechas}
      </p>

      <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
        <span className="text-xs text-slate-500">Por noche</span>
        <span className="text-2xl font-extrabold text-[#D71920]">${hotel.precioNoche} USD</span>
      </div>
    </div>
  );
}