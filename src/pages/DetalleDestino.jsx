import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { useQuery } from '@apollo/client/react';
import { obtenerDestinoPorId } from '../services/destinosService';
import { OBTENER_OPCIONES_VIAJE } from '../services/queries';
import { PlantillaPrincipal } from '../components/templates/PlantillaPrincipal';
import { SeccionVuelos } from '../components/organisms/SeccionVuelos';
import { SeccionHoteles } from '../components/organisms/SeccionHoteles';
import { Badge } from '../components/atoms/Badge';
import { Spinner } from '../components/atoms/Spinner';
import { MensajeEstado } from '../components/atoms/MensajeEstado';

// Combina el detalle REST del destino con la consulta GraphQL de vuelos y hoteles.
export function DetalleDestino() {
  const { id } = useParams();
  const [destino, setDestino] = useState(null);
  const [cargandoDestino, setCargandoDestino] = useState(true);
  const [errorDestino, setErrorDestino] = useState(null);

  const {
    data: opcionesData,
    loading: cargandoOpciones,
    error: errorOpciones,
    refetch,
  } = useQuery(OBTENER_OPCIONES_VIAJE, {
    // Apollo vuelve a ejecutar la consulta si cambia el identificador de ruta.
    variables: { destinoId: id },
  });

  useEffect(() => {
    let activo = true;
    const cargar = async () => {
      try {
        setCargandoDestino(true);
        setErrorDestino(null);
        const data = await obtenerDestinoPorId(id);
        if (activo) setDestino(data);
      } catch (err) {
        if (activo) setErrorDestino(err.message);
      } finally {
        if (activo) setCargandoDestino(false);
      }
    };
    cargar();
    return () => {
      // La ruta puede cambiar de destino mientras la solicitud anterior sigue activa.
      activo = false;
    };
  }, [id]);

  return (
    <PlantillaPrincipal>
      <Link
        to="/destinos"
        className="inline-flex items-center gap-1 text-sky-700 font-semibold text-sm hover:underline mb-6"
      >
        &larr; Volver a destinos
      </Link>

      {cargandoDestino && <Spinner texto="Cargando información del destino..." />}

      {!cargandoDestino && errorDestino && (
        <MensajeEstado
          tipo="error"
          titulo="Destino no encontrado"
          descripcion={errorDestino}
        />
      )}

      {!cargandoDestino && destino && (
        <div className="space-y-10">
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <img
              src={destino.imagen}
              alt={`Vista de ${destino.nombre}`}
              className="w-full h-64 md:h-full object-cover"
            />
            <div className="p-6 md:p-8 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-extrabold text-slate-900">{destino.nombre}</h1>
                <Badge variante="azul">{destino.pais}</Badge>
              </div>
              <p className="text-slate-600">{destino.descripcion}</p>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Actividades populares
                </p>
                <div className="flex flex-wrap gap-2">
                  {destino.actividadesPopulares.map((act) => (
                    <Badge key={act} variante="gris">
                      {act}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {cargandoOpciones && <Spinner texto="Consultando vuelos y hoteles vía GraphQL..." />}

          {!cargandoOpciones && errorOpciones && (
            <MensajeEstado
              tipo="error"
              titulo="Error al consultar opciones de viaje"
              descripcion={errorOpciones.message}
              onReintentar={() => refetch()}
            />
          )}

          {!cargandoOpciones && !errorOpciones && opcionesData && (
            <div className="space-y-10">
              <SeccionVuelos vuelos={opcionesData.vuelos} />
              <SeccionHoteles hoteles={opcionesData.hoteles} />
            </div>
          )}
        </div>
      )}
    </PlantillaPrincipal>
  );
}