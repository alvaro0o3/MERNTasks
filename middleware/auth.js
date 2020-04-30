const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {

    // Leer token del header
    const token = req.header('x-auth-token');

    // Revisar si hay token
    if (!token) {
        res.status(401).json({ msg: 'Permiso no válido' });
    }

    // Validar el token
    // En el token va cifrado un objeto usuario con un id
    // lo sacamos a cifrado
    try {
        const cifrado = jwt.verify(token, process.env.SECRET);
        req.user = cifrado.user; // El id del usuario logeado
        next(); // Pasa al siguiente middleware en la lista de projects
    } catch(error) {
        res.status(401).json({ msg:'Token no válido' })
    }
}