var express = require('express');
var router = express.Router();

/* login screen. */
router.get('/', function(req, res) {
  res.render('login', { title: 'Cadeaue.LY - Login'});
});

module.exports = router;
