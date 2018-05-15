var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , Child = require('./child')
   // , userDao = require('./../dataAccess/userDao')
    
//TODO: change connection string
var dbURI = 'mongodb://alutapp:alutapp1234@ds019063.mlab.com:19063/alutappdb'; 

mongoose.connect(dbURI); 

// events handle
mongoose.connection.on('connected', function () {  
    console.log('db.js: Mongoose connection open to ' + dbURI);
  }); 
mongoose.connection.on('error',function (err) {  
    console.log('db.js: Mongoose connection error: ' + err);
}); 
mongoose.connection.on('disconnected', function () {  
    console.log('db.js: Mongoose connection disconnected'); 
  });
// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
    mongoose.connection.close(function () { 
      console.log('db.js: Mongoose connection disconnected through app termination'); 
      process.exit(0); 
    }); 
});
