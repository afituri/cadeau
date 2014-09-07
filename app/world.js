var mysqlMgr = require('./mysql').mysqlMgr,
    util=require('util');

exports.worldMgr = {
	

  checkEmail : function(continent,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `status` FROM `user` WHERE `email` = ? ',  email,  function(err, result) {
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  }

}