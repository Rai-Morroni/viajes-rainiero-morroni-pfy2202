// Acceso a los endpoints REST simulados por MSW. Los errores HTTP se convierten
// en excepciones para que las páginas puedan mostrar un estado de error explícito.
export async function obtenerDestinos() {
  const response = await fetch('/api/destinos');
  if (!response.ok) {
    throw new Error('No se pudieron cargar los destinos disponibles.');
  }
  return response.json();
}

// Solicita un destino individual; el ID forma parte de la ruta REST.
export async function obtenerDestinoPorId(id) {
  const response = await fetch(`/api/destinos/${id}`);
  if (!response.ok) {
    throw new Error('No se encontró el destino solicitado.');
  }
  return response.json();
}