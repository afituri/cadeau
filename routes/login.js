var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    md5 = require('MD5'),
    easyPbkdf2 = require("easy-pbkdf2")(),
    userMgr = require('../app/user').userMgr;
var router = express.Router();


passport.use(new LocalStrategy(
  function(username, password, done) {
    findByUsername(username, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      authenticate(user,password, function(valid){
        if(valid){
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.iduser);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

/* login/register screens. */
router.get('/', function(req, res) {
  res.render('login', { title: 'Cadeaue.LY - Login', });
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

/* Register form*/
router.get('/register', function(req, res) {
  res.render('register', { title: 'Cadeaue.LY - Register', });
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
          break;
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
          var salt = easyPbkdf2.generateSalt();
          easyPbkdf2.secureHash( req.body.password, salt, function( err, passwordHash, originalSalt ) {
            var obj={
                  username : req.body.username,
                  password : passwordHash,
                  salt : originalSalt,
                  status : "ACTIVE"
                }
            userMgr.activate(obj,req.body.email, function(result){
              res.send(true);
            });
          });
          break;
      }
    }
  });
});

router.post('/', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});

function findById(id, fn) {
  userMgr.getUserById(id, function(user){
    if(user){
      fn(null, user);
    } else {
      fn(new Error('User ' + id + ' does not exist'));
    }
  });
}
function findByUsername(username, fn) {
  userMgr.getUser(username, function(user){
    if(user) {
      return fn(null, user);
    } else {
      return fn(null, null);
    }
  });
}

function authenticate( user, userEnteredPassword, callback) {
  // make sure the user-entered password is equal to the previously
  // created hash when hashed with the same salt.
  easyPbkdf2.verify( user.salt, user.password, userEnteredPassword, function( err, valid ) {
      callback(valid);

  });
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

module.exports = router;
