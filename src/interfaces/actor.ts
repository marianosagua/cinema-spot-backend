// -----------------------------------------------------------------------------
// Interfaz que representa a un actor en el sistema CinemaSpot
// Incluye información personal y profesional del actor
// -----------------------------------------------------------------------------

export interface Actor {
  /** ID único del actor */
  id: number;
  /** Nombre del actor */
  first_name: string;
  /** Apellido del actor */
  last_name: string;
  /** Edad del actor */
  age: number;
  /** Nacionalidad del actor */
  nationality: string;
}

/**
 * Interfaz para crear un nuevo actor
 * No incluye el ID ya que se genera automáticamente
 */
export interface CreateActorDto {
  first_name: string;
  last_name: string;
  age: number;
  nationality: string;
}

/**
 * Interfaz para actualizar un actor existente
 * Todos los campos son opcionales para permitir actualizaciones parciales
 */
export interface UpdateActorDto {
  first_name?: string;
  last_name?: string;
  age?: number;
  nationality?: string;
} 