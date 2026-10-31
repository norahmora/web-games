var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inicio' });
});

/* GET login. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET contacto. */
router.get('/contacto', function(req, res, next) {
  res.render('contacto', { title: 'Contacto' });
});

module.exports = router;
