var notifServer = require('server.js')
var apns = require('apns');
var gcm = require('node-gcm');
var logger = require('../logs/logger')

notifServer.server.get('/send', (req, res) => {
    notifServer.DeviceSchema.find( (err, devices) => {
        if (!err && devices) {
            let androidDevices = [];
            devices.forEach(device => {
                if (device.platform === 'ios') {
                    sendIos(device.deviceId);
                } else if (device.platform === 'android') {
                    androidDevices.push(device.deviceId);
                }
            });
            sendAndroid(androidDevices);
            res.send(200);
        } else {
            res.send(500);
        }
    });
});

var options = {
    keyFile  : 'key.pem',
    certFile : 'cert.pem',
    debug    : true,
    gateway  : 'gateway.sandbox.push.apple.com',
    errorCallback : function(num, err) {
        console.error(err);
    }
};

function sendIos(deviceId) {
    let connection = new apns.Connection(options);

    let notification = new apns.Notification();
    notification.device = new apns.Device(deviceId);
    notification.alert = 'Hello World !';

    connection.sendNotification(notification);
}

function sendAndroid(devices) {
    let message = new gcm.Message({
        notification : {
            title : 'Hello, World!'
        }
    });

    let sender = new gcm.sender('AIzaSyD4Wu64CkFPMM6nJOF5vxhcF4pZ_TCa6jU');

    sender.send(message, {
        registrationTokens : devices
    }, function(err, response) {
        if (err) {
            logger.error(err);
        } else {
            logger.info(response);
        }
    });
}