var express = require('express'),
    geoip = require('geoip-lite'),
    helpers = require('../app/helpers');
var router = express.Router();
var uploadManager = require('../app/uploadManager')(router);

/* GET home page. */
router.get('/', function(req, res) {
  var ip = '41.254.2.115';
  console.log(req.connection.remoteAddress);
  console.log(geoip.lookup(ip));
  res.render('index', { title: 'GiftOn.ly', username: req.session.username});
});

/* GET gift listings. */
router.get('/getListings', function(req, res) {
  helpers.getListings(function(result){
    res.send(result);
  });
});


module.exports = router;
