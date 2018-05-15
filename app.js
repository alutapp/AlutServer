var express = require('express')
    , http = require('http')
    , userServices = require('./service/userServices')
    , db = require('./model/db');

var app = module.exports = express();

var logger = require('./logs/logger');
	logger.setLevel('debug');
	
var sprintf = require('sprintf-js').sprintf;

/*
   var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port
  
    logger.debug(sprintf("Example app listening at http://%s:%s", host, port))
  })
*/
 app.get('/SignIn/:email/:password', userServices.SignIn);
 app.get('/IsEmailExist/:email', userServices.IsEmailExist);


  //user.createUser(function(err){
    //if (err) {
     // console.log('*** Err' + err);
   // }});

