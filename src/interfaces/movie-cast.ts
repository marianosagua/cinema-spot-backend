// -----------------------------------------------------------------------------
// Representa la relación entre una película y un actor.
// Contiene información tanto de los IDs como de los nombres involucrados.
// -----------------------------------------------------------------------------
export interface MovieCast {
  /** ID numérico de la película */
  movie: number;
  /** ID numérico del actor */
  actor: number;
  /** Título de la película */
  movieTitle: string;
  /** Nombre del actor */
  actorFirstName: string;
  /** Apellido del actor */
  actorLastName: string;
}
