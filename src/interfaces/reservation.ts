// -----------------------------------------------------------------------------
// Representa una reserva de asientos para una función de cine.
// Incluye el usuario, la función y los asientos reservados.
// -----------------------------------------------------------------------------
export interface Reservation {
  /** ID del usuario que realiza la reserva */
  user_id: string;
  /** ID de la función reservada */
  showtime_id: string;
  /** Arreglo de IDs de los asientos reservados */
  seat_ids: string[];
}
