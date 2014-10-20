var geoip = require('geoip-lite');
var locationMgr = require('../app/location').locationMgr;
var mysqlMgr = require('./mysql').mysqlMgr,
    util=require('util');


module.exports = {
  getCity: function (ip) {
  	var city = geoip.lookup(ip).city;
  	return city;
  },
  getRegion: function (ip) {
    var region = geoip.lookup(ip).region;
    return region;
  },
  getCountry: function (ip) {
  	console.log(geoip.lookup(ip));
  	var country = geoip.lookup(ip).country;
  	return country;
  },
  getListings: function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `idlisting`, `name` FROM `listing`  ', function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  }
};