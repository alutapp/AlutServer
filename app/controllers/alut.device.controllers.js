const Device = require('../models/device.js')
const notification = require('../methods/notification.send.js')
var firebase = require('firebase');
var serviceAccount = require('../../notifications/firebase-important.json');

exports.register = (req, res) => {
    try{
        let body = req.body;//JSON.parse(req.body);
    
    if (body) {
        let newDevice = new Device(body);
        console.log(newDevice);
        newDevice.save(err => {
            if (!err) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        });
        }
    }
    catch(err){
        console.log('Error occured:\n'+err);
        res.sendStatus(500);
    }
};

exports.sendAll = (req, res) => {
    Device.find( (err, devices) => {
        if (!err && devices) {
            let androidDevices = [];
            devices.forEach(device => {
                if (device.platform === 'ios') {
                    try{
                        notification.sendIos(device.deviceId, 'Hello World', 'iOS notification test');
                    }
                    catch(err){
                        console.log("Error sending to iOS:\n"+err);
                        res.sendStatus(500);
                    }
                } else if (device.platform === 'android') {
                    console.log("Adding device: "+device)
                    androidDevices.push(device.deviceId);
                }
            });
            try{
                console.log("Sending for all devices: "+androidDevices)
                androidDevices.forEach(deviceID => {
                    notification.sendAndroid(deviceID, 'Hello World', 'Android notification tests');
                });
                
                res.sendStatus(200);
            }
            catch(err){
                console.log("Error sending to android:\n"+err);
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(500);
        }
    });
};

exports.sendFriendRequest = (req, res) => {
    device = Device.find( (err, devices) => {
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
        res.sendStatus(500);
    }
    
    let title = 'Add Friend Request';
    let body = 'Enter app for more details';

    try { 

    if(device.platform == 'ios') {
        notification.sendIos(device.deviceId, title, body);
        res.sendStatus(200);
    }
    else if(device.platform == 'android') {
        notification.sendAndroid(device.deviceId, title, body);
        res.sendStatus(200);
    }
    else {
        console.error("device has no suitable platform");
        res.sendStatus(500);
    }
    }
    catch(err){
        console.log("Error sending friend request:\n"+err);
    }

};