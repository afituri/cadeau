var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('world', { title: 'Cadeaue.LY - World Map'});
});

router.get('/:continent', function(req, res) {
  res.render('world', { title: 'Cadeaue.LY - World Map'});
});

module.exports = router;
