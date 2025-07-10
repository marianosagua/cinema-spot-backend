// -----------------------------------------------------------------------------
// DTO para la creación de actores
// Valida y transforma los datos recibidos para crear un nuevo actor
// -----------------------------------------------------------------------------

/**
 * Data Transfer Object para la creación de un actor.
 * Valida que todos los campos requeridos estén presentes y tengan el formato correcto.
 */
export class CreateActorDto {
  constructor(
    public first_name: string,
    public last_name: string,
    public age: number,
    public nationality: string
  ) {}

  /**
   * Crea una instancia de CreateActorDto a partir de los datos recibidos.
   * Valida la existencia y formato de los campos requeridos.
   * @param object Objeto con los datos del actor
   * @returns Una tupla con un mensaje de error o la instancia creada
   */
  static create(object: { [key: string]: any }): [string?, CreateActorDto?] {
    const { first_name, last_name, age, nationality } = object;

    if (!first_name) {
      return ["El nombre es requerido"];
    }

    if (!last_name) {
      return ["El apellido es requerido"];
    }

    if (!age) {
      return ["La edad es requerida"];
    }

    if (typeof age !== "number" || age < 1 || age > 120) {
      return ["La edad debe ser un número entre 1 y 120"];
    }

    if (!nationality) {
      return ["La nacionalidad es requerida"];
    }

    if (first_name.length < 2 || first_name.length > 50) {
      return ["El nombre debe tener entre 2 y 50 caracteres"];
    }

    if (last_name.length < 2 || last_name.length > 50) {
      return ["El apellido debe tener entre 2 y 50 caracteres"];
    }

    if (nationality.length < 2 || nationality.length > 50) {
      return ["La nacionalidad debe tener entre 2 y 50 caracteres"];
    }

    return [
      undefined,
      new CreateActorDto(first_name, last_name, age, nationality),
    ];
  }
} 