// -----------------------------------------------------------------------------
// Define la estructura de una función de cine (showtime).
// Incluye información sobre la película, sala, horarios y estado de ocupación.
// -----------------------------------------------------------------------------
export interface Showtime {
  /** (Opcional) ID de la función */
  id?: string;
  /** ID o nombre de la película */
  movie: string;
  /** Hora de inicio de la función */
  start_time: string;
  /** Hora de fin de la función */
  end_time: string;
  /** ID o nombre de la sala */
  room: string;
  /** (Opcional) Indica si la función está llena */
  is_full?: boolean;
}
