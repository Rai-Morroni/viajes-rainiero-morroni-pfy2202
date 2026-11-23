import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { PlantillaPrincipal } from '../components/templates/PlantillaPrincipal';

// Página de bienvenida que presenta el propósito de la app y dirige al catálogo.
export function Inicio() {
  const [destinoBuscado, setDestinoBuscado] = useState('');
  const navigate = useNavigate();

  const handleBuscar = (e) => {
    e.preventDefault();
    navigate('/destinos');
  };

  return (
    <PlantillaPrincipal anchoCompleto>
      {/* Hero fotográfico a ancho completo */}
      <section
        className="relative h-[460px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full text-white pb-12">
          <p className="text-lg md:text-2xl italic font-light">
            La mejor manera de planificar y reservar tu viaje ideal
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight my-2">
            TU PRÓXIMO VIAJE
          </h1>
          <p className="text-base md:text-xl italic font-light mb-6">
            es con Viajes PFY
          </p>
          <Link
            to="/destinos"
            className="inline-block bg-[#D71920] hover:bg-[#b5141a] text-white text-sm font-bold px-6 py-3 rounded-sm shadow transition"
          >
            Explorar destinos
          </Link>
        </div>
      </section>

      {/* Panel buscador superpuesto */}
      <section className="max-w-5xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white shadow-lg rounded-sm border border-neutral-200 overflow-hidden">
          {/* Pestañas superiores */}
          <div className="grid grid-cols-3 border-b border-neutral-200 text-xs sm:text-sm font-semibold text-neutral-600">
            <div className="py-3.5 px-4 text-center text-neutral-900 border-b-2 border-[#D71920] bg-white">
              ✈️ Buscar viajes
            </div>
            <Link
              to="/destinos"
              className="py-3.5 px-4 text-center hover:bg-neutral-50 transition"
            >
              🏨 Hoteles
            </Link>
            <Link
              to="/destinos"
              className="py-3.5 px-4 text-center hover:bg-neutral-50 transition"
            >
              🗺️ Actividades
            </Link>
          </div>

          {/* Formulario horizontal */}
          <form onSubmit={handleBuscar} className="p-6 flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={destinoBuscado}
              onChange={(e) => setDestinoBuscado(e.target.value)}
              placeholder="¿A qué destino quieres viajar? (Ej. Tokio, París, Cusco...)"
              className="flex-1 border border-neutral-400 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#D71920]"
            />
            <button
              type="submit"
              className="bg-[#D71920] hover:bg-[#b5141a] text-white font-bold px-8 py-3 text-sm rounded-sm transition"
            >
              Continuar
            </button>
          </form>
        </div>        

        <h2 className="text-center text-xl text-neutral-700 mt-10 mb-6">
          Destinos destacados desde <strong className="text-neutral-900">Chile</strong>
        </h2>
      </section>
    </PlantillaPrincipal>
  );
}