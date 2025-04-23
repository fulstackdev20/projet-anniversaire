import nodemailer from 'nodemailer';

// Transporteur SMTP à configurer avec vos identifiants
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
    secure: false, // true pour 465, false pour les autres ports
    auth: {
        user: process.env.SMTP_USER || 'utilisateur@example.com',
        pass: process.env.SMTP_PASS || 'motdepasse',
    },
});

/**
 * Envoie un email de confirmation de réservation
 * @param {string} to - Email du destinataire
 * @param {string} name - Nom de l'invité
 */
export async function sendConfirmationEmail(to, name) {
    const mailOptions = {
        from: process.env.SMTP_FROM || 'no-reply@example.com',
        to,
        subject: 'Confirmation de votre réservation',
        text: `Bonjour ${name},\n\nVotre réservation a bien été prise en compte.\nMerci et à bientôt !`,
        html: `<p>Bonjour <b>${name}</b>,</p><p>Votre réservation a bien été prise en compte.<br>Merci et à bientôt !</p>`
    };
    await transporter.sendMail(mailOptions);
}
