import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

// Configuración del transporte de correo electrónico
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cristianmurua1995@gmail.com",
    pass: "rlaksbuezbambzdl",
  },
});

// Función para enviar el correo electrónico
export const enviarCorreo = async (email, asunto, contenido) => {
  const mailOptions = {
    from: "cristianmurua1995@gmail.com",
    to: email,
    subject: asunto,
    text: contenido,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado");
  } catch (error) {
    console.error("Error al enviar el correo electrónico", error);
  }
};

// GOOGLE CALENDAR CONFIG
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const scopes = ["https://www.googleapis.com/auth/calendar"];

const url = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
});

export const getAuthUrl = (req, res) => {
  res.redirect(url);
};

export const getRedirect = async (req, res) => {
  const code = req.query.code;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  res.send({ msg: "Logueado correctamente!" });
};

// // Crea una instancia del cliente de Google Calendar
const calendar = google.calendar({ version: "v3", auth: process.env.API_KEY });

// // Función para agregar un evento al calendario
export const agregarEventoCalendario = async (
  email,
  fecha,
  hora,
  asunto,
  descripcion
) => {
  const evento = {
    summary: asunto,
    description: descripcion,
    start: {
      dateTime: `${fecha}T${hora}:00`,
      timeZone: "America/Argentina/Buenos_Aires",
    },
    end: {
      dateTime: `${fecha}T${hora}:00`,
      timeZone: "America/Argentina/Buenos_Aires",
    },
    attendees: [{ email }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 }, // 24 horas antes
      ],
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      auth: oauth2Client,
      requestBody: evento,
    });
    console.log("Evento agregado al calendario", response.data);
  } catch (error) {
    console.error("Error al agregar el evento al calendario", error);
  }
};
