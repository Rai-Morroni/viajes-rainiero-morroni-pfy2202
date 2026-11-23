import { gql } from '@apollo/client';

// Solicita en una sola operación las dos colecciones relacionadas con un destino.
export const OBTENER_OPCIONES_VIAJE = gql`
  query ObtenerOpcionesViaje($destinoId: ID!) {
    vuelos(destinoId: $destinoId) {
      id
      aerolinea
      precio
      fechaSalida
      fechaRegreso
      disponibilidad
      escalas
    }
    hoteles(destinoId: $destinoId) {
      id
      nombre
      precioNoche
      estrellas
      fechas
      disponibilidad
    }
  }
`;