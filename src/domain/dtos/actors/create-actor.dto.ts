export class CreateActorDto {
  constructor(
    public first_name: string,
    public last_name: string,
    public age: number,
    public nationality: string
  ) {}

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