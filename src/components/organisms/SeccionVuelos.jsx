import { TarjetaVuelo } from '../molecules/TarjetaVuelo';
import { MensajeEstado } from '../atoms/MensajeEstado';

// Renderiza las tarjetas de vuelo o el estado vacío para el destino consultado.
export function SeccionVuelos({ vuelos }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">Vuelos disponibles</h2>
      {vuelos.length === 0 ? (
        <MensajeEstado
          titulo="Sin vuelos disponibles"
          descripcion="Por el momento no hay vuelos registrados para este destino."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vuelos.map((vuelo) => (
            <TarjetaVuelo key={vuelo.id} vuelo={vuelo} />
          ))}
        </div>
      )}
    </section>
  );
}