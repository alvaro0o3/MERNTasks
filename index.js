const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Crear el servidor
const app = express();

// Conectar a la base de datos
connectDB();

// Habilitar CORS para la comunicación entre dominios
app.use(cors());

// Habilitar express.json
app.use(express.json({ extended: true }));

// Puerto de la app (Heroku busca la variable de entorno PORT)
const port = process.env.PORT || 4000;

// Importar rutas de endpoints
app.use('/API/users', require('./routes/users'));
app.use('/API/auth', require('./routes/auth'));
app.use('/API/projects', require('./routes/projects'));
app.use('/API/tasks', require('./routes/tasks'));

// Arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});