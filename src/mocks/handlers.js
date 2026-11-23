import { http, graphql, HttpResponse, delay } from 'msw';
import { destinos, vuelos, hoteles } from './data';

// Handlers de red de la demo. Las demoras hacen visibles los estados de carga y
// las respuestas usan las mismas estructuras que consumiría un backend real.
export const handlers = [
  // --- API REST: Obtener listado de destinos ---
  http.get('/api/destinos', async () => {
    await delay(400); // Simula latencia de red
    return HttpResponse.json(destinos);
  }),

  // --- API REST: Obtener un destino específico por ID ---
  http.get('/api/destinos/:id', async ({ params }) => {
    await delay(300);
    const destino = destinos.find((d) => d.id === params.id);
    if (!destino) {
      return HttpResponse.json(
        { message: 'Destino no encontrado' },
        { status: 404 }
      );
    }
    return HttpResponse.json(destino);
  }),

  // --- API GraphQL: Consultar vuelos y hoteles de un destino ---
  graphql.query('ObtenerOpcionesViaje', async ({ variables }) => {
    await delay(500);
    const { destinoId } = variables;

    // GraphQL expresa errores en el cuerpo de la respuesta, no con un 404 REST.
    const destinoExiste = destinos.some((d) => d.id === destinoId);
    if (!destinoExiste) {
      return HttpResponse.json({
        errors: [{ message: `No se encontraron opciones para el destino ID: ${destinoId}` }],
      });
    }

    const vuelosFiltrados = vuelos.filter((v) => v.destinoId === destinoId);
    const hotelesFiltrados = hoteles.filter((h) => h.destinoId === destinoId);

    return HttpResponse.json({
      data: {
        vuelos: vuelosFiltrados,
        hoteles: hotelesFiltrados,
      },
    });
  }),
];