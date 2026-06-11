"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function getTransporter() {
    var _a, _b;
    const host = (_a = process.env.MAILTRAP_HOST) !== null && _a !== void 0 ? _a : 'sandbox.smtp.mailtrap.io';
    const port = Number((_b = process.env.MAILTRAP_PORT) !== null && _b !== void 0 ? _b : 2525);
    const user = process.env.MAILTRAP_USER;
    const pass = process.env.MAILTRAP_PASS;
    if (!user || !pass) {
        throw new Error('Mailtrap credentials are not configured');
    }
    return nodemailer_1.default.createTransport({
        host,
        port,
        auth: { user, pass },
    });
}
class EmailService {
    static async sendPasswordRecoveryCode(email, code) {
        var _a;
        const from = (_a = process.env.MAIL_FROM) !== null && _a !== void 0 ? _a : 'Projeto Baião <noreply@projeto-baiao.local>';
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
exports.EmailService = EmailService;
