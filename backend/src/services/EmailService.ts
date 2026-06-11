import nodemailer from 'nodemailer';

function getTransporter() {
  const host = process.env.MAILTRAP_HOST ?? 'sandbox.smtp.mailtrap.io';
  const port = Number(process.env.MAILTRAP_PORT ?? 2525);
  const user = process.env.MAILTRAP_USER;
  const pass = process.env.MAILTRAP_PASS;

  if (!user || !pass) {
    throw new Error('Mailtrap credentials are not configured');
  }

  return nodemailer.createTransport({
    host,
    port,
    auth: { user, pass },
  });
}

export class EmailService {
  static async sendPasswordRecoveryCode(email: string, code: string): Promise<void> {
    const from = process.env.MAIL_FROM ?? 'Projeto Baião <noreply@projeto-baiao.local>';
    const transporter = getTransporter();

    await transporter.sendMail({
      from,
      to: email,
      subject: 'Código de recuperação de senha',
      text: `Seu código de recuperação de senha é: ${code}\n\nEste código expira em 15 minutos.`,
      html: `
        <p>Seu código de recuperação de senha é:</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${code}</p>
        <p>Este código expira em 15 minutos.</p>
      `,
    });
  }
}
