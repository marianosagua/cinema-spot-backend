// -----------------------------------------------------------------------------
// DTO para la actualización de actores
// Valida y transforma los datos recibidos para actualizar un actor existente
// -----------------------------------------------------------------------------

/**
 * Data Transfer Object para la actualización de un actor.
 * Valida que los campos proporcionados tengan el formato correcto.
 * Todos los campos son opcionales para permitir actualizaciones parciales.
 */
export class UpdateActorDto {
  constructor(
    public first_name?: string,
    public last_name?: string,
    public age?: number,
    public nationality?: string
  ) {}

  /**
   * Crea una instancia de UpdateActorDto a partir de los datos recibidos.
   * Valida el formato de los campos proporcionados.
   * @param object Objeto con los datos del actor a actualizar
   * @returns Una tupla con un mensaje de error o la instancia creada
   */
  static create(object: { [key: string]: any }): [string?, UpdateActorDto?] {
    const { first_name, last_name, age, nationality } = object;

    // Validar nombre si se proporciona
    if (first_name !== undefined) {
      if (!first_name || first_name.trim() === "") {
        return ["El nombre no puede estar vacío"];
      }
      if (first_name.length < 2 || first_name.length > 50) {
        return ["El nombre debe tener entre 2 y 50 caracteres"];
      }
    }

    // Validar apellido si se proporciona
    if (last_name !== undefined) {
      if (!last_name || last_name.trim() === "") {
        return ["El apellido no puede estar vacío"];
      }
      if (last_name.length < 2 || last_name.length > 50) {
        return ["El apellido debe tener entre 2 y 50 caracteres"];
      }
    }

    // Validar edad si se proporciona
    if (age !== undefined) {
      if (typeof age !== "number" || age < 1 || age > 120) {
        return ["La edad debe ser un número entre 1 y 120"];
      }
    }

    // Validar nacionalidad si se proporciona
    if (nationality !== undefined) {
      if (!nationality || nationality.trim() === "") {
        return ["La nacionalidad no puede estar vacía"];
      }
      if (nationality.length < 2 || nationality.length > 50) {
        return ["La nacionalidad debe tener entre 2 y 50 caracteres"];
      }
    }

    return [
      undefined,
      new UpdateActorDto(first_name, last_name, age, nationality),
    ];
  }
} 