
var userDao = require('../dataAccess/userDao');
var logger = require('../logs/logger');
logger.setLevel('debug');

var sprintf = require('sprintf-js').sprintf;


exports.IsEmailExist = function (req, res) {
  if (req.body.email == null){
    res.send("ERROR email is null")
  }
  userDao.getUserByEmail(req.body.email, function(err, user) {
    if (err) {
      logger.error('IsEmailExist service Err' + err);
      res.json({
        Error: err
      });      
    }else if (user == null){
      logger.info('IsEmailExist service, not found user with email: ' + req.body.email);
      res.send(false);
    } else if (user){
      logger.info('IsEmailExist service, found user with email: ' + req.body.email);
      res.send(true);
    }
  })
}

exports.SignIn = function (req, res) {
    logger.debug('SignIn email: ' + req.body.email + ' password '+ req.body.password);
    if (req.body.email == null || req.body.password == null){
      res.send("ERROR email or password are null")
    }

    userDao.getUserByEmailAndPassword(req.body.email,  req.body.password, function(err, user) {
      if (err) {
        logger.error('SignIn Err' + err);
        res.json({
          Error: "error in sign in"
        });      
      }else if (user == null){
        logger.error("ERROR: there is no user with email " + req.body.email + " and password " + req.body.password);
        res.send("ERROR: there is no user with email " + req.body.email + " and password " + req.body.password);
      } else {
        logger.info('SignIn Success ' + user);
  
        res.json(user);
      }
    })
  };

  exports.getUser = function (req, res) {
    userDao.getUserByEmailAndPassword(req.body.email, req.body.password, function(err, user) {
      if (err) {
        logger.error('get User Err' + err);
        res.json({
          error: err
        });
      } else {
        logger.info('get user Success');
  
        res.json(user);
      }
    });
  }

  exports.addUser = function (req, res) {
    
    
    // userDao.getUserByEmailAndPassword(req.body.email, req.body.password, function(err, user) {
      // if (user) {
      //   logger.error('you triyng to add ' + user.firstName + ' is exsit already');
      //   res.json({
      //     error : 'the user'+user.firstName +' is exsit already'
      //   });

      // } else {

        logger.info('start Add User');
        userDao.createUser(req,  function(err, res) {
          if (err) {
            logger.error('get User Err' + err);
            res.json({
              error: err
            });
          } else {
            logger.info('get user Success');
      
            res.json(res);
          }
        });

  }