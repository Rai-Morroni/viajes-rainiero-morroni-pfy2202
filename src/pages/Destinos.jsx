import { useState, useEffect } from 'react';
import { obtenerDestinos } from '../services/destinosService';
import { PlantillaPrincipal } from '../components/templates/PlantillaPrincipal';
import { ListaDestinos } from '../components/organisms/ListaDestinos';
import { Spinner } from '../components/atoms/Spinner';
import { MensajeEstado } from '../components/atoms/MensajeEstado';

// Obtiene el catálogo REST, permite filtrar por ciudad/país y muestra cada estado
// de la solicitud (carga, error, resultados o búsqueda sin coincidencias).
export function Destinos() {
  const [destinos, setDestinos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarDestinos = async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await obtenerDestinos();
      setDestinos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    let activo = true;

    // La carga inicial no usa cargarDestinos porque esta última actualiza el
    // estado de carga de forma inmediata; aquí el resultado llega desde la promesa.
    obtenerDestinos()
      .then((data) => {
        if (activo) setDestinos(data);
      })
      .catch((err) => {
        if (activo) setError(err.message);
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      // Evita actualizar estado si la página se desmonta antes de terminar el fetch.
      activo = false;
    };
  }, []);

  // El filtrado es local: solo cambia la presentación y no realiza otra petición.
  const destinosFiltrados = destinos.filter(
    (d) =>
      d.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      d.pais.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <PlantillaPrincipal>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Destinos disponibles</h1>
          <p className="text-slate-600 text-sm mt-1">
            Selecciona un destino para consultar vuelos y hoteles disponibles.
          </p>
        </div>

        <input
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por ciudad o país..."
          aria-label="Buscar destino por ciudad o país"
          className="w-full md:w-72 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {cargando && <Spinner texto="Cargando destinos desde el servidor..." />}

      {!cargando && error && (
        <MensajeEstado
          tipo="error"
          titulo="Error al cargar destinos"
          descripcion={error}
          onReintentar={cargarDestinos}
        />
      )}

      {!cargando && !error && destinosFiltrados.length === 0 && (
        <MensajeEstado
          titulo="Sin coincidencias"
          descripcion="No encontramos destinos que coincidan con tu búsqueda."
        />
      )}

      {!cargando && !error && destinosFiltrados.length > 0 && (
        <ListaDestinos destinos={destinosFiltrados} />
      )}
    </PlantillaPrincipal>
  );
}