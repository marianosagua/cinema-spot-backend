import { Resend } from "resend";
import { envs } from "../../config";

const resend = new Resend(envs.resend);

interface Options {
  email: string;
  subject: string;
  message: string;
}

export class EmailService {
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
