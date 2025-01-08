import { Resend } from "resend";

const resend = new Resend("re_ZDhXQPMp_JwgctN94c85hJExAvPMgRBEJ");

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
        from: "Acme <onboarding@resend.dev>",
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
