const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./database/conexion')

const animales = require('./routes/animales.routes');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/animales', animales);


// Middleware para manejar rutas no encontradas y devolver error 404
app.use((req, res) => {
  res.status(404).json({ ok: false, mensaje: "La ruta que buscas no existe." });
});


module.exports = app;
