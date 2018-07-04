var mongoose = require('mongoose');
var restify = require('restify');
var logger = require('../logs/logger')

var Schema = mongoose.Schema;

var Device = new Schema({
    deviceId : String,
    platform : String
});

var DeviceSchema = mongoose.model('Device', Device);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
    logger.info('db open');
});

mongoose.connect('mongodb://localhost/pushserver');

var server = restify.createServer({
    name : 'pushServer'
});

server.use(restify.plugins.bodyParser());

server.post('/register', (req, res, next) => {
    let body = JSON.parse(req.body);

    if (body) {
        let newDevice = new DeviceSchema(body);
        newDevice.save(err => {
            if (!err) {
                res.send(200);
            } else {
                res.send(500);
            }
        });
    }
});