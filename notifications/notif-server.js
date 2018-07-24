var mongoose = require('mongoose');
var restify = require('restify');

var Schema = mongoose.Schema;

var Device = new Schema({
    deviceId : String,
    platform : String
});

var DeviceSchema = mongoose.model('Device', Device);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
    console.info('db open');
});

mongoose.connect('mongodb://localhost/pushserver');

var server = restify.createServer({
    name : 'pushServer'
});

server.use(restify.plugins.bodyParser());