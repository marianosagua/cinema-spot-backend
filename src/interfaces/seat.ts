// -----------------------------------------------------------------------------
// Representa un asiento dentro de una sala de cine.
// Incluye información sobre su número, sala y disponibilidad.
// -----------------------------------------------------------------------------
export interface Seat {
  /** (Opcional) ID del asiento */
  id?: string;
  /** Número del asiento dentro de la sala */
  seat_number: number;
  /** ID de la sala a la que pertenece el asiento */
  room: string;
  /** (Opcional) Indica si el asiento está disponible */
  is_available?: boolean;
}
