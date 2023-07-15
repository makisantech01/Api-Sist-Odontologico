import { Router } from "express";
import catchedAsync from "../utils/catchedAsync.js";
import {
  login,
  logout,
  generarTokenRestablecimiento,
  enviarCorreoRestablecimiento,
  restablecerContraseña,
  actualizarContraseña,
} from "../middlewares/login.js";
// import { enviarAlertaWhatsApp } from "../middlewares/whatsapp.js";
import Usuario from "../models/usuario.js";
import Paciente from "../models/paciente.js";

const router = Router();

router.post("/login", catchedAsync(login));
router.post("/logout", catchedAsync(logout));

// Ruta para el envio de recordatorio por WhatsApp
// router.post("/enviar-alerta-whatsapp", (req, res) => {
//   const { telefono } = req.body; // Suponiendo que los datos se envían en el cuerpo de la petición

//   // Llamada a la función de envío de alerta
//   enviarAlertaWhatsApp(telefono, "Tu turno es hoy!");

//   res.send("Alerta de WhatsApp enviada correctamente");
// });

// Ruta para solicitar el restablecimiento de contraseña
router.post("/solicitar-restablecimiento/:dni", async (req, res) => {
  try {
    const { dni } = req.params;
    const { email } = req.body;
    const usuario = await Usuario.findByPk(dni, {
      include: [{ model: Paciente }],
    });
    if (email === usuario.paciente.email) {
      const token = generarTokenRestablecimiento(dni);

      // Enviar el correo electrónico con el enlace de restablecimiento

      await enviarCorreoRestablecimiento(email, token);

      return res
        .status(200)
        .json({ mensaje: "Correo de restablecimiento enviado" });
    }
  } catch (error) {
    console.error(
      "Error al solicitar el restablecimiento de contraseña:",
      error
    );
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

// Ruta para restablecer la contraseña
router.post("/restablecer-contrasena", async (req, res) => {
  try {
    const { token, password } = req.body;

    // Verificar y actualizar la contraseña utilizando el token
    await restablecerContraseña(token, password, res);

    return res
      .status(200)
      .json({ mensaje: "Contraseña restablecida con éxito" });
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

// Ruta para actualizar la contraseña del usuario
router.put("/actualizar-contraseña", async (req, res) => {
  try {
    const { password } = req.body;

    // Actualizar la contraseña del usuario autenticado
    await actualizarContraseña(req, res);

    return res
      .status(200)
      .json({ mensaje: "Contraseña actualizada con éxito" });
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

export default router;
