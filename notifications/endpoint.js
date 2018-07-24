var notifServer = require('notif-server.js')
var apns = require('apns');
var gcm = require('node-gcm');


//Reqest should be - 
// { deviceId:abcdefghijklmnopqrstuvwxyz ,
//   platform:android }
// { deviceId:abcdefghijklmnopqrstuvwxyz ,
//   platform:ios }
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

notifServer.server.get('/send', (req, res) => {
    notifServer.DeviceSchema.find( (err, devices) => {
        if (!err && devices) {
            let androidDevices = [];
            devices.forEach(device => {
                if (device.platform === 'ios') {
                    sendIos(device.deviceId, 'Hello World', 'iOS notification test');
                } else if (device.platform === 'android') {
                    androidDevices.push(device.deviceId);
                }
            });
            sendAndroid(androidDevices, 'Hello World', 'Android notification tests');
            res.send(200);
        } else {
            res.send(500);
        }
    });
});

notifServer.server.get('/sendFriendRequest', (req, res) => {
    device = notifServer.DeviceSchema.find( (err, devices) => {
        if (!err && devices) {
            for(device in devices)
                if(req.body.deviceId == device.deviceId)
                    return device;
            return 0;
        }
    })

    if(device == 0)
    {
        console.error("Device id wasn't found in registered devices");
        res.send(500);
    }
    
    let title = 'Add Friend Request';
    let body = 'Enter app for more details';

    if(device.platform == 'ios') {
        sendIos(device.deviceId, title, body);
        res.send(200);
    }
    else if(device.platform == 'android') {
        sendAndroid(device, title, body);
        res.send(200);
    }
    else {
        console.error("device has no suitable platform");
        res.send(500);
    }

});

function sendIos(deviceId, title, message) {
    var options = {
        keyFile  : 'key.pem',
        certFile : 'cert.pem',
        debug    : true,
        gateway  : 'gateway.sandbox.push.apple.com',
        errorCallback : function(num, err) {
            console.error(err);
        }
    };
    
    let connection = new apns.Connection(options);

    let notification = new apns.Notification();
    notification.device = new apns.Device(deviceId);
    notification.alert = title;//'Hello World !';
    notification.body = message;//'This is the body of the notification';

    connection.sendNotification(notification);
}

function sendAndroid(devices, title, message) {
    let message = new gcm.Message({
        notification: {
            title: title,//"Hello, World",
            icon: "ic_launcher",
            body: message//"This is a notification that will be displayed if your app is in the background."
        }
    });

    let sender = new gcm.sender('AIzaSyD4Wu64CkFPMM6nJOF5vxhcF4pZ_TCa6jU');

    sender.send(message, {
        registrationTokens : devices
    }, function(err, response) {
        if (err) {
            console.error(err);
        } else {
            console.info(response);
        }
    });
}