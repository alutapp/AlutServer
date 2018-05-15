
var userDao = require('../dataAccess/userDao');


exports.IsEmailExist = function (req, res) {
  if (req.params.email == null){
    res.send("ERROR email is null")
  }
  userDao.getUserByEmail(req.params.email, function(err, user) {
    if (err) {
      logger.error('IsEmailExist service Err' + err);
      res.json({
        Error: err
      });      
    }else if (user == null){
      logger.info('IsEmailExist service, not found user with email: ' + req.params.email);
      res.send(false);
    } else if (user){
      logger.info('IsEmailExist service, found user with email: ' + req.params.email);
      res.send(true);
    }
  })
}

exports.SignIn = function (req, res) {
    logger.debug('SignIn email: ' + req.params.email + ' password '+ req.params.password);
    if (req.params.email == null || req.params.password == null){
      res.send("ERROR email or password are null")
    }

    userDao.getUserByEmailAndPassword(req.params.email,  req.params.password, function(err, user) {
      if (err) {
        logger.error('SignIn Err' + err);
        res.json({
          Error: "error in sign in"
        });      
      }else if (user == null){
        logger.error("ERROR: there is no user with email " + req.params.email + " and password " + req.params.password);
        res.send("ERROR: there is no user with email " + req.params.email + " and password " + req.params.password);
      } else {
        logger.info('SignIn Success ' + user);
  
        res.json(user);
      }
    })
  };

  exports.getUser = function (req, res) {
    userDao.getUserByEmailAndPassword('m@gmail.com', 'password', function(err, user) {
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