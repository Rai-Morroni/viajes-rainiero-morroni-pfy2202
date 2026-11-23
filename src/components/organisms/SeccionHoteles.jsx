import { TarjetaHotel } from '../molecules/TarjetaHotel';
import { MensajeEstado } from '../atoms/MensajeEstado';

// Renderiza las tarjetas de alojamiento o explica por qué la lista está vacía.
export function SeccionHoteles({ hoteles }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">Hoteles recomendados</h2>
      {hoteles.length === 0 ? (
        <MensajeEstado
          titulo="Sin hoteles disponibles"
          descripcion="Por el momento no hay alojamientos registrados para este destino."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hoteles.map((hotel) => (
            <TarjetaHotel key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </section>
  );
}