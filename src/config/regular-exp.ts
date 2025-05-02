// Expresiones regulares reutilizables para validación de datos en CinemaSpot.
//
// Este archivo centraliza las expresiones regulares utilizadas en el backend para validar distintos formatos de datos.
// Actualmente incluye la expresión regular para validar correos electrónicos.
//
// Exportaciones:
// - regularExps: Objeto con las expresiones regulares disponibles.
//
// Ejemplo de uso:
// import { regularExps } from "../config/regular-exp";
// if (!regularExps.email.test(email)) { ... }

export const regularExps = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
};
