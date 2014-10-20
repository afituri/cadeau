var mysqlMgr = require('./mysql').mysqlMgr,
    util=require('util');

exports.locationMgr = {

  getCountries : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `iso`, `local_name` FROM `location` WHERE `type` = "CO" ORDER BY `local_name`',  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  getCities : function(iso,cb){
    console.log(iso);
    iso ="%"+iso+"%";
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `id`, `local_name` FROM `location` WHERE `iso` LIKE ? AND (`type` = "CI" )   ORDER BY `local_name`', iso, function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

  getUsCities : function(state,cb){
    console.log(state);
    state ="%US-"+state+"%";
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `id`, `local_name` FROM `location` WHERE `iso` LIKE ? AND (`type` = "CI" )   ORDER BY `local_name`', state, function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

  getStates : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT DISTINCT(`state`) FROM `uscities` ',  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

}

