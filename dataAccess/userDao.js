// Module dependencies
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , User = require('./../model/User')

    
module.exports = {

    getUserByEmailAndPassword: function(email, password, callback) {
        logger.debug('userDao.js : getUser with mail ' + email +' and password ' + password);
        User.find({'email': email}, {}, function (err, user) {
            callback(null, user[0]);
        });
    },
    getUserByEmail: function(email, callback){
        logger.debug('userDao.js : getUser with mail ' + email );
        User.find({'email': email}, {}, function (err, user) {
            callback(null, user[0]);
        });
    },
    createUser: function (req, res) {  
        logger.debug('test create user ');
    
        var user = new User();
        user.idNumber= "11",
        user.password = "password";
        user.firstName= "mor";
        user.lastName = "zohar";
        user.email = "m@gmail.com";    

        user.save(function (err) {
            if (err) {
                logger.error('user  save err: ' + err);
                return callback(err);
            }
         });
        }
     }

