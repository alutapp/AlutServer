// Module dependencies
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , User = require('./../model/User')
    var logger = require('../logs/logger');
	logger.setLevel('debug');
	
//var sprintf = require('sprintf-js').sprintf;


    
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
        user.idNumber= '123',
        user.password = req.body.password;
        user.firstName= req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;    

        user.save(user, (err, result) => {
            if (err) return console.log(err)
        
            console.log('saved to database')
            res.redirect('/')
          })
        // save(function (err) {
        //     if (err) {
        //         logger.error('user  save err: ' + err);
        //         return callback(err);
        //     }
            
            
        //  });
         
        }
     }

