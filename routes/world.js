var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',ensureAuthenticated, function(req, res) {
  res.render('world', { title: 'Cadeaue.LY - World Map'});
});

router.get('/:continent', function(req, res) {
  res.render('world', { title: 'Cadeaue.LY - World Map'});
});

function ensureAuthenticated(req, res, next) {
	console.log(req.isAuthenticated());
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

module.exports = router;
