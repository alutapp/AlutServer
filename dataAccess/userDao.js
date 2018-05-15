// Module dependencies
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , User = require('./../model/User')
module.exports = {

    getUserByEmailAndPassword: function(email, password, callback) {
        console.log('userDao.js : getUser with mail ' + email);
        User.find({'email': email}, {}, function (err, user) {
            callback(null, user[0]);
        });
    },
    createUser: function (req, res) {  
        console.log('test create user ');
    
        var user = new User();
        user.idNumber= "11",
        user.password = "password";
        user.firstName= "mor";
        user.lastName = "zohar";
        user.email = "m@gmail.com";    

        user.save(function (err) {
            if (err) {
                console.log('user  save err: ' + err);
                return callback(err);
            }
         });
        }
     }

