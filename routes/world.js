var express = require('express');
var locationMgr = require('../app/location').locationMgr;
var helpers = require('../app/helpers');
var router = express.Router();

/* GET home page. */
router.get('/',ensureAuthenticated, function(req, res) {
  res.render('world', { title: 'Gifton.LY - World Map', username: req.session.username});
});

router.get('/getCountries', function(req, res) {
  locationMgr.getCountries(function(result){
    res.send(result);
  });
});

router.get('/getStates', function(req, res) {
  locationMgr.getStates(function(result){
    res.send(result);
  });
});

router.get('/getCities/:iso', function(req, res) {
  locationMgr.getCities(req.params.iso,function(result){
    res.send(result);
  });
});

router.get('/getUsCities/:state', function(req, res) {
  locationMgr.getUsCities(req.params.state,function(result){
    res.send(result);
  });
});

router.get('/:continent', function(req, res) {
  res.render('world', { title: 'Gifton.LY - World Map'});
});



function ensureAuthenticated(req, res, next) {
  console.log(req.session);
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

module.exports = router;
