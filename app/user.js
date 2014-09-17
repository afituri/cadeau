var mysqlMgr = require('./mysql').mysqlMgr,
    util=require('util');

exports.userMgr = {
	addUser : function(body,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('INSERT INTO `user` SET ?',  body,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(body.name); 
        }
      });
    });
  },

  checkEmail : function(email,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `status` FROM `user` WHERE `email` = ? ',  email,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

  registerEmail : function(body,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('INSERT INTO `user` SET ?',  body,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(true);
        }
      });
    });
  },

  checkAccount : function(code,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `status`, `email` FROM `user` WHERE `md5activation` = ? ',  code,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  checkUsername : function(username,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `email` FROM `user` WHERE `username` = ? ',  username,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

  activate : function(body,email,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('UPDATE `user` SET ? WHERE `email` = ?',  [body,email],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(true); 
        }
      });
    });
  },
  getUser : function(username,cb) {
    mysqlMgr.connect(function (conn){
      conn.query('SELECT * FROM `user` WHERE (`email`= ?) OR (`username` = ?)',[username,username],function(err,result) {
        conn.release();
        if(err) {
        util.log(err);
        } else {
          cb(result[0]);
        }
      });
    });
  },
  getUserById : function(id,cb) {
    mysqlMgr.connect(function (conn){
      conn.query('SELECT * FROM `user` WHERE `iduser`= ? ',id,function(err,result) {
        conn.release();
        if(err) {
        util.log("mysql lib err "+err);
        } else {
          cb(result[0]);
        }
      });
    });
  }
};