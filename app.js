var express = require('express')
    , http = require('http')
    , userServices = require('./service/userServices')
    , db = require('./model/db');

var app = module.exports = express();


   var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port
  
    console.log("Example app listening at http://%s:%s", host, port)
  })

  app.get('/SignIn/:email/:password', userServices.GetUserByEmailAndPassword);


  //user.createUser(function(err){
    //if (err) {
     // console.log('*** Err' + err);
   // }});

