// -----------------------------------------------------------------------------
// Representa a un usuario del sistema.
// Incluye información personal, credenciales y estado de validación.
// -----------------------------------------------------------------------------
export interface User {
  /** ID del usuario */
  id: string;
  /** Nombre del usuario */
  first_name: string;
  /** Apellido del usuario */
  last_name: string;
  /** Correo electrónico del usuario */
  email: string;
  /** Contraseña (encriptada) */
  password: string;
  /** Rol del usuario (por ejemplo, admin, cliente) */
  role: string;
  /** Fecha de creación del usuario */
  created_at: string;
  /** Fecha de última actualización */
  updated_at: string;
  /** Indica si el correo fue validado */
  email_validated: boolean;
}
