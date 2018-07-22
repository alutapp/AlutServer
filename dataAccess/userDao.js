// Module dependencies
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , User = require('./../model/User')
var logger = require('../logs/logger');
	logger.setLevel('debug');
	
//var sprintf = require('sprintf-js').sprintf;

module.exports = {

    getUser: function (email, callback) {
        console.log('userDao.js : getUser with mail ' + email);
        User.find({'email': email}, {}, function (err, user) {
            callback(null, user[0]);
        });
    },
    createUser: function (req, res) {  
        console.log('test create user ');
    
        var user = new User();
        user.idNumber= '123',
        user.password = req.body.password;
        user.firstName= req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;    

        user.save(function (err) {
            if (err) {
                console.log('user  save err: ' + err);
                return callback(err);
            }
         });
        }
     }

