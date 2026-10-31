var express = require('express');
var router = express.Router();

// Juegos de ejemplo

var juegosRecientes = [
  { titulo: 'Neon Drift', plataforma: 'PS5', formato: 'Físico', anio: 2025, portada: 'neon' },
  { titulo: 'Kitty Quest', plataforma: 'Switch', formato: 'Físico', anio: 2024, portada: 'kitty' },
  { titulo: 'Star Garden 64', plataforma: 'N64', formato: 'Físico', anio: 1999, portada: 'star' },
  { titulo: 'Bubble Pop DX', plataforma: 'Game Boy Color', formato: 'Físico', anio: 2001, portada: 'bubble' },
  { titulo: 'Dungeon Mail', plataforma: 'PC', formato: 'Digital', anio: 2026, portada: 'dungeon' },
  { titulo: 'Skate Cloud', plataforma: 'Xbox Series', formato: 'Digital', anio: 2025, portada: 'skate' }
];

/* Inicio */
router.get('/', function (req, res) {
  res.render('index', { title: 'Inicio', pagina: 'inicio', juegos: juegosRecientes });
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

