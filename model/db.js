var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , Child = require('./child')
	, logger = require('../logs/logger')
   // , userDao = require('./../dataAccess/userDao')
    
//TODO: change connection string
var dbURI = 'mongodb://alutapp:alutapp1234@ds019063.mlab.com:19063/alutappdb'; 

mongoose.connect(dbURI); 

// events handle
mongoose.connection.on('connected', function () {  
    logger.debug('db.js: Mongoose connection open to ' + dbURI);
  }); 
mongoose.connection.on('error',function (err) {  
    logger.debug('db.js: Mongoose connection error: ' + err);
}); 
mongoose.connection.on('disconnected', function () {  
    logger.debug('db.js: Mongoose connection disconnected'); 
  });
// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
    mongoose.connection.close(function () { 
      logger.debug('db.js: Mongoose connection disconnected through app termination'); 
      process.exit(0); 
    }); 
});
