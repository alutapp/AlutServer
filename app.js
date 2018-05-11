var http = require('http'),
    db = require('./model/db'),
    user = require('./dataAccess/userDao')
    const express = require('express')
    const app = express()


 

    app.get("/SignIn/:email", function (req, res) {
      user.getUser(req.params.email ,function(err, data){
        console.log("**user ** ="+  data);

        res.send(data);

        if (err) {
          console.log('*** Err' + err);
      }});
   })

   var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port
  
    console.log("Example app listening at http://%s:%s", host, port)
  
  })

  //user.createUser(function(err){
    //if (err) {
     // console.log('*** Err' + err);
   // }});

