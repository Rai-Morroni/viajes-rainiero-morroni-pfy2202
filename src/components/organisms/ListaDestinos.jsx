import { TarjetaDestino } from '../molecules/TarjetaDestino';

// Convierte la colección recibida en una grilla de tarjetas con claves estables.
export function ListaDestinos({ destinos }) {
  return (
    <section aria-label="Listado de destinos">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinos.map((destino) => (
          <TarjetaDestino key={destino.id} destino={destino} />
        ))}
      </div>
    </section>
  );
}