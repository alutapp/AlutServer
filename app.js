var http = require('http'),
    db = require('./model/db'),
    user = require('./dataAccess/userDao')

  user.createUser(function(err){
    if (err) {
      console.log('*** Err' + err);
    }});

