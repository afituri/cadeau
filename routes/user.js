var express = require('express');
var helpers = require('../app/helpers');
var router = express.Router();

/* GET user's home page. */
router.get('/',ensureAuthenticated, function(req, res) {
  res.render('user',{username:req.session.username});
});

/* Add a gift*/

router.get('/newGift',ensureAuthenticated, function(req, res) {
  var location ={
  	city : helpers.getCity('173.194.45.38'),
  	state : helpers.getRegion('173.194.45.38'),
  	country : helpers.getCountry('173.194.45.38')
  }
  res.render('addgift',{username:req.session.username,iduser:req.session.iduser, location:location});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
module.exports = router;

//41.254.2.115