
var userDao = require('./dataAccess/userDao');

exports.SignIn = function (req, res) {
    console.log('SignIn email: ' + req.params.email+ ' password '+ req.params.password);
    userDao.getUserByEmailAndPassword(req.params.email,  req.params.password, function(err, user) {
      if (err) {
        console.log('SignIn Err' + err);
        res.json({
          error: err
        });
      } else {
        console.log('SignIn Success');
  
        res.json(user);
      }
    });
  };