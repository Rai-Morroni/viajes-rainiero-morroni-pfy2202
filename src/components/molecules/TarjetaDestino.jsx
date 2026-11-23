import { Link } from 'react-router';
import { Badge } from '../atoms/Badge';

// Resume un destino y enlaza su tarjeta con la página de detalle correspondiente.
export function TarjetaDestino({ destino }) {
  return (
    <article className="bg-white rounded-sm shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition">
      <img
        src={destino.imagen}
        alt={`Vista de ${destino.nombre}, ${destino.pais}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-xl font-bold text-slate-900">{destino.nombre}</h3>
          <Badge variante="azul">{destino.pais}</Badge>
        </div>

        <p className="text-slate-600 text-sm mb-4 flex-1">{destino.descripcion}</p>

        <div className="mb-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Actividades populares
          </p>
          <div className="flex flex-wrap gap-1.5">
            {destino.actividadesPopulares.map((actividad) => (
              <Badge key={actividad} variante="gris">
                {actividad}
              </Badge>
            ))}
          </div>
        </div>

        <Link
          to={`/destinos/${destino.id}`}
          className="block w-full text-center py-2.5 px-4 bg-[#D71920] text-white font-semibold rounded-sm hover:bg-[#b5141a] transition"
        >
          Ver vuelos y hoteles
        </Link>
      </div>
    </article>
  );
}