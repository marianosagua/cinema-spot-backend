// Servicio para el envío de correos electrónicos utilizando la API de Resend.
// Permite enviar correos personalizados a los usuarios del sistema, por ejemplo para validación de email o recuperación de contraseña.
//
// Uso típico: crear una instancia de EmailService y llamar a sendEmail con los datos del destinatario y el contenido del mensaje.

import { Resend } from "resend";

// Instancia del cliente de Resend con la API Key correspondiente.
const resend = new Resend("re_ZDhXQPMp_JwgctN94c85hJExAvPMgRBEJ");

// Opciones requeridas para enviar un correo electrónico.
// - email: dirección de correo del destinatario
// - subject: asunto del correo
// - message: contenido HTML del mensaje
interface Options {
  email: string;
  subject: string;
  message: string;
}

export class EmailService {
  /**
   * Envía un correo electrónico utilizando el servicio Resend.
   * @param options Objeto con email del destinatario, asunto y mensaje HTML.
   * @returns true si el correo se envió correctamente, false si hubo un error.
   *
   * Ejemplo de uso:
   *   await emailService.sendEmail({
   *     email: 'usuario@correo.com',
   *     subject: 'Bienvenido',
   *     message: '<b>Gracias por registrarte</b>'
   *   });
   */
  async sendEmail(options: Options): Promise<Boolean> {
    const { email, subject, message } = options;

    try {
      await resend.emails.send({
        from: "CinemaSpot <onboarding@resend.dev>",
        to: [email],
        subject,
        html: message,
      });

      return true;
    } catch (error) {
      console.log(`Error: ${error}`);
      return false;
    }
  }
}
