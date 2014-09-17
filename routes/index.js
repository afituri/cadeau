var express = require('express'),
	geoip = require('geoip-lite');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

	// var ip = '41.254.2.115';
	// console.log(req.connection.remoteAddress);
	// console.log(geoip.lookup(ip));

  res.render('index', { title: 'Cadeaue.LY'});
});

module.exports = router;
