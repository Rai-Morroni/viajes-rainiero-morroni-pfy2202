// Catálogo usado por los handlers MSW. Los IDs se representan como cadenas para
// coincidir con los parámetros de ruta REST y con el escalar GraphQL ID.
export const destinos = [
  {
    id: '1',
    nombre: 'Tokio',
    pais: 'Japón',
    descripcion: 'Metrópolis vibrante que combina templos ancestrales, gastronomía de clase mundial y tecnología de vanguardia.',
    actividadesPopulares: ['Cruce de Shibuya', 'Templo Senso-ji', 'Gastronomía en Shinjuku', 'Monte Fuji'],
    imagen: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    
  },
  {
    id: '2',
    nombre: 'París',
    pais: 'Francia',
    descripcion: 'La ciudad de la luz, reconocida por su arquitectura icónica, museos históricos y cafés bohemios.',
    actividadesPopulares: ['Torre Eiffel', 'Museo del Louvre', 'Paseo por el Sena', 'Barrio de Montmartre'],
    imagen: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    nombre: 'Cusco',
    pais: 'Perú',
    descripcion: 'Antigua capital del Imperio Inca, puerta de entrada a Machu Picchu y al Valle Sagrado.',
    actividadesPopulares: ['Machu Picchu', 'Valle Sagrado', 'Plaza de Armas', 'Montaña de 7 Colores'],
    imagen: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    nombre: 'Cancún',
    pais: 'México',
    descripcion: 'Playas de arena blanca, aguas turquesas del Caribe y cercanía a vestigios arqueológicos mayas.',
    actividadesPopulares: ['Chichén Itzá', 'Isla Mujeres', 'Cenotes de Yucatán', 'Snorkel en arrecifes'],
    imagen: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?auto=format&fit=crop&w=800&q=80',
  },
];

// Opciones de vuelo vinculadas con destinos mediante destinoId.
export const vuelos = [
  { id: 'v1', destinoId: '1', aerolinea: 'ANA All Nippon', precio: 1350, fechaSalida: '2026-06-15', fechaRegreso: '2026-06-28', disponibilidad: 'Disponible', escalas: '1 escala' },
  { id: 'v2', destinoId: '1', aerolinea: 'LATAM Airlines', precio: 1490, fechaSalida: '2026-07-02', fechaRegreso: '2026-07-16', disponibilidad: 'Últimos asientos', escalas: '1 escala' },
  { id: 'v3', destinoId: '2', aerolinea: 'Air France', precio: 980, fechaSalida: '2026-05-10', fechaRegreso: '2026-05-22', disponibilidad: 'Disponible', escalas: 'Directo' },
  { id: 'v4', destinoId: '2', aerolinea: 'Iberia', precio: 890, fechaSalida: '2026-05-18', fechaRegreso: '2026-05-30', disponibilidad: 'Agotado', escalas: '1 escala' },
  { id: 'v5', destinoId: '3', aerolinea: 'SKY Airline', precio: 320, fechaSalida: '2026-04-20', fechaRegreso: '2026-04-27', disponibilidad: 'Disponible', escalas: '1 escala' },
  { id: 'v6', destinoId: '3', aerolinea: 'LATAM Airlines', precio: 380, fechaSalida: '2026-05-05', fechaRegreso: '2026-05-12', disponibilidad: 'Últimos asientos', escalas: 'Directo' },
  { id: 'v7', destinoId: '4', aerolinea: 'Aeroméxico', precio: 640, fechaSalida: '2026-08-10', fechaRegreso: '2026-08-18', disponibilidad: 'Disponible', escalas: '1 escala' },
];

// Opciones de hotel vinculadas con destinos mediante destinoId.
export const hoteles = [
  { id: 'h1', destinoId: '1', nombre: 'Shinjuku Granbell Hotel', precioNoche: 185, estrellas: 4, fechas: '15 Jun - 28 Jun', disponibilidad: 'Disponible' },
  { id: 'h2', destinoId: '1', nombre: 'Park Hyatt Tokyo', precioNoche: 420, estrellas: 5, fechas: '02 Jul - 16 Jul', disponibilidad: 'Últimas habitaciones' },
  { id: 'h3', destinoId: '2', nombre: 'Hôtel Le Littré', precioNoche: 260, estrellas: 4, fechas: '10 May - 22 May', disponibilidad: 'Disponible' },
  { id: 'h4', destinoId: '2', nombre: 'Pullman Paris Tour Eiffel', precioNoche: 350, estrellas: 4, fechas: '18 May - 30 May', disponibilidad: 'Agotado' },
  { id: 'h5', destinoId: '3', nombre: 'Palacio del Inka', precioNoche: 210, estrellas: 5, fechas: '20 Abr - 27 Abr', disponibilidad: 'Disponible' },
  { id: 'h6', destinoId: '3', nombre: 'Tierra Viva Cusco Centro', precioNoche: 95, estrellas: 3, fechas: '05 May - 12 May', disponibilidad: 'Disponible' },
  { id: 'h7', destinoId: '4', nombre: 'Live Aqua Beach Resort', precioNoche: 310, estrellas: 5, fechas: '10 Ago - 18 Ago', disponibilidad: 'Últimas habitaciones' },
];