var express = require('express');
var router = express.Router();
/* usar los textos desde un json. Se accede como un array de objetos. */
var datos = require('../data/data');

// Juegos de ejemplo

/* Inicio */
router.get('/', function (req, res) {
  let gamesText = datos.getGamesText();
  res.render('index', { title: 'Inicio', pagina: 'inicio', juegos: gamesText });
});

/* Login */
router.get('/login', function (req, res) {
  res.render('login', { title: 'Iniciar sesión', pagina: 'login' });
});

// Simulación de login
router.post('/login', function (req, res) {
  res.render('login', { title: 'Iniciar sesión', pagina: 'login', enviado: true });
});

/* Contacto */
router.get('/contacto', function (req, res) {
  res.render('contacto', { title: 'Contacto', pagina: 'contacto' });
});

// Simulación del envío del formulario de contacto.
router.post('/contacto', function (req, res) {
  res.render('contacto', { title: 'Contacto', pagina: 'contacto', enviado: true });
});

module.exports = router;

