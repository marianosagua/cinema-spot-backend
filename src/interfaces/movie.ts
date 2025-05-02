// -----------------------------------------------------------------------------
// Define la estructura de una película en el sistema.
// Incluye información general, multimedia y funciones asociadas.
// -----------------------------------------------------------------------------
import { Showtime } from "./showtime";

export interface Movie {
  /** ID numérico de la película */
  id: number;
  /** Título de la película */
  title: string;
  /** Descripción general de la película */
  description: string;
  /** URL o ruta del póster */
  poster: string;
  /** ID de la categoría */
  category: number;
  /** Duración de la película (formato string) */
  duration: string;
  /** URL o ruta del banner */
  banner: string;
  /** Sinopsis de la película */
  synopsis: string;
  /** URL del tráiler */
  trailer: string;
  /** Nombre del director */
  director: string;
  /** Clasificación de la película */
  rating: string;
  /** Número de reseñas */
  review: number;
  /** Funciones asociadas a la película */
  showtimes: Showtime[];
}
