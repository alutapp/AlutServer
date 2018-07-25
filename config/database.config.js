
// url: 'mongodb://localhost:27017/alutDb'

const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

// Connecting to the database

mongoose.connect('mongodb://localhost:27017/alutDb')
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});