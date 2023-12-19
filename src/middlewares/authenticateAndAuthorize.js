import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env

// Middleware para verificar el token y, opcionalmente, el rol de administrador
const authenticateAndAuthorize = ({ requireAdmin = false }) => (req, res, next) => {
  // Obtener el token del encabezado de la solicitud
  const token = req.header('Authorization');

  // Verificar si el token está presente
  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado. Se requiere token' });
  }

  try {
    // Verificar el token
    const decodedToken = jwt.verify(token, JWT_SECRET);

    // Verificar el rol de administrador si es necesario
    if (requireAdmin && !decodedToken.admin) {
      return res.status(403).json({ message: 'Acceso no autorizado. Rol de administrador requerido.' });
    }

    // Adjuntar la información del usuario al objeto de solicitud para su uso posterior
    req.user = decodedToken;

    // Continuar con la siguiente función en la cadena de middleware
    next();
  } catch (error) {
    console.log(error.message)
    return res.status(401).json({ message: 'Token no válido.' });
  }
};

export default authenticateAndAuthorize;