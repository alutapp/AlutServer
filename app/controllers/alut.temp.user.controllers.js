const TempUser = require('../models/temp.user.js');
var generatepassword = require('../methods/generate.password.js');
var sendMailRequestToAppManager = require('../methods/mail.send.js')

// Create Temp User && send to manager mail for approval
exports.registerRequest = (req, res) => {
    // Validate request
    if(!req.body.id) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    
    // Create a Temp User
   
    const tempUser = new TempUser({
        id:req.body.id,       
        firstName:req.body.firstName,        
        lastName:req.body.lastName,      
        email:req.body.email,  
        password:req.body.password                        
    });
   
    // Save User in the database
    tempUser.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Temp User."
        });
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Temp User."
        });

    });
    
    //tempUser.password = generatepassword.generateTempPassword;
    sendMailRequestToAppManager.sendMailRequest(req.body.email,req.body.id,req.body.firstName,req.body.lastName);

};

