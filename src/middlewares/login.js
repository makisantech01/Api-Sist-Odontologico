import Usuario from "../models/usuario.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export const login = async (req, res) => {
  const { dni, password } = req.body;
  try {
    // Buscar el usuario en la base de datos por email
    const usuario = await Usuario.findByPk(dni);

    if (usuario) {
      // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
      const contraseñaValida = await bcrypt.compare(password, usuario.password);

      if (contraseñaValida) {
        // Generar un token de sesión
        const token = jwt.sign(
          { id: usuario.dni, admin: usuario.admin },
          "secreto",
          {
            expiresIn: "1h",
          }
        );

        // Establecer la cookie de sesión
        res.cookie("session", token, { httpOnly: true });

        res.json({
          success: true,
          message: "Inicio de sesión exitoso",
          dniCorrecto: true,
          token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Contraseña incorrecta",
          dniCorrecto: true,
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "Usuario no encontrado",
        dniCorrecto: false,
      });
    }
  } catch (error) {
    console.error("Error al realizar el inicio de sesión:", error);

    if (error.name === "SequelizeDatabaseError") {
      if (error.parent && error.parent.code === "ER_BAD_FIELD_ERROR") {
        res.status(400).json({
          success: false,
          message: "Campo inválido en la solicitud",
          dniCorrecto: true,
        });
      } else if (error.parent && error.parent.code === "ER_NO_SUCH_COLUMN") {
        res.status(400).json({
          success: false,
          message: "Columna no encontrada en la base de datos",
          dniCorrecto: true,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Ocurrió un error al realizar el inicio de sesión",
          dniCorrecto: true,
        });
      }
    } else {
      res.status(500).json({
        success: false,
        message: "Ocurrió un error al realizar el inicio de sesión",
        dniCorrecto: true,
      });
    }
  }
};

export const logout = (req, res) => {
  // Eliminar la cookie de sesión
  res.clearCookie("session");
  res.json({ success: true, message: "Cierre de sesión exitoso" });
};

// Paso 1: Generar un token de restablecimiento de contraseña
export function generarTokenRestablecimiento(usuarioId) {
  const token = jwt.sign({ usuarioId }, "secreto", {
    expiresIn: "1h", // El token expirará en 1 hora
  });
  return token;
}

// Paso 2: Enviar un correo electrónico con el enlace de restablecimiento
export async function enviarCorreoRestablecimiento(email, token) {
  const transporter = nodemailer.createTransport({
    // Configura tu transporte de correo electrónico aquí
    service: "gmail",
    auth: {
      user: "cristianmurua1995@gmail.com",
      pass: "rlaksbuezbambzdl",
    },
  });

  const correo = {
    from: "cristianmurua1995@gmail.com",
    to: email,
    subject: "Restablecimiento de contraseña",
    html: `Haz clic en el siguiente enlace para restablecer tu contraseña: <a href="http://localhost:5173/restablecer-contrasena?token=${token}">Restablecer contraseña</a>`,
  };

  await transporter.sendMail(correo);
}

// Paso 3: Crear una ruta para manejar las solicitudes de restablecimiento de contraseña
export async function restablecerContraseña(token, password, res) {
  try {
    // Validar el token
    const decoded = jwt.verify(token, "secreto");
    const usuarioId = decoded.usuarioId;

    // Actualizar la contraseña
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const contraseñaHasheada = await bcrypt.hash(password, 10);
    usuario.password = contraseñaHasheada;
    await usuario.save();
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
}

// Paso 4: Actualizar la contraseña del usuario
export async function actualizarContraseña(req, res) {
  try {
    const { dni, password } = req.body;

    const usuario = await Usuario.findByPk(dni);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const contraseñaHasheada = await bcrypt.hash(password, 10);
    usuario.password = contraseñaHasheada;
    await usuario.save();

    return res
      .status(200)
      .json({ mensaje: "Contraseña actualizada con éxito" });
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
}
