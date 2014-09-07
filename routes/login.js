var express = require('express'),
    md5 = require('MD5'),
  userMgr = require('../app/user').userMgr;
var router = express.Router();

/* login/register screens. */
router.get('/', function(req, res) {
  res.render('login', { title: 'Cadeaue.LY - Login'});
});
/* Check if email already registered*/
router.get('/checkEmail/:email', function(req, res) {
  userMgr.checkEmail(req.params.email, function(result){
    if(!result[0]){
      res.send(false);
    } else {
      res.send(result[0].status);
    }
    
  });
});

/* Register a new email*/
router.post('/register', function(req, res) {
  userMgr.checkEmail(req.body.email, function(result){
    if(!result[0]){
      var date = new Date(),
          md5activation = md5(req.body.email+date.toString()),
          obj={
            email : req.body.email,
            md5activation : md5activation,
            status : 'INACTIVE'
          }
        
      userMgr.registerEmail(obj, function(result){
        if(result){
          res.send(true);//register success
        } else {
          res.send(false);//register fails 
        }
      });
    } else {
      res.send(result[0].status);
    }
    
  });
});

//this is when a user get's an email with the activation link
router.get('/activate/:code', function(req, res) {
  userMgr.checkAccount(req.params.code, function(result){
    if(!result[0]){
      console.log("not found");//do something
      res.send(false);
    } else {
      switch(result[0].status){
        case "INACTIVE":
          res.render('activate', {email: result[0].email});
          break
        //do something when blocked and active
      }
    }
  });
});

router.get('/checkUsername/:username', function(req, res) {
  userMgr.checkUsername(req.params.username, function(result){
    if(!result[0]){
      res.send(true);
    } else {
      res.send(false);
    }
  });
});

router.post('/activate', function(req, res) {
  userMgr.checkEmail(req.body.email, function(result){
    if(!result[0]){
      res.send(false);
    } else {
      console.log(result[0].status);
      switch(result[0].status){
        case 'INACTIVE':
          var obj={
            username : req.body.username,
            password : md5(req.body.password+'masecretfornow'),
            status : "ACTIVE"
          }
          userMgr.activate(obj,req.body.email, function(result){
            res.send(true);
          });
          break
      }
    }
  });
});

router.post('/login', function(req, res){
  userMgr.
});

module.exports = router;
