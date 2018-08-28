var apns = require('apns');
var fcm = require('fcm-node');

exports.sendIos = (deviceId, title, message) => {
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

exports.sendAndroid = (deviceID, title, message) => {

    console.log("Preparing android message for device "+deviceID);

    var androidMessage = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: deviceID,//'registration_token', 
        //collapse_key: 'green',
        
        notification: {
            title: title, 
            body: message
        }//,
        
        //data: {  //you can send only notification or only data(or include both)
        //    my_key: 'my value',
        //    my_another_key: 'my another value'
        //}
    };

    console.log("Creating fcm sender object");
    let serverKey = 'AAAAJZ35K38:APA91bGIKnA9WLTAFPRfUqKZ2PkTyewvvZsWTz2YKzHgm5HECra2NLMtob-Ij9wlSKWKYC3AZ3U__OhsSk7W8t7OzJq1nssPtXjifaR61jKWOvIiTSUPf4gms-hyTSKLQtIZZJ731glJndlvaCRGUcdn_wStREwVFQ';
    let fcm_server = new fcm(serverKey);

    console.log("Sending message: "+JSON.stringify(androidMessage))
    fcm_server.send(androidMessage, 
        //{ registrationTokens : devices}, 
        function(err, response) {
        if (err) {
            console.error("Error:"+err);
        } else {
            console.info("Information: "+response);
        }
    });
}