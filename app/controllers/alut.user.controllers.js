const User = require('../models/user.js');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Create a User
    const User = new User({
        idNumber:req.body.idNumber,       
        firstName:req.body.firstName,        
        lastName:req.body.lastName,      
        email:req.body.email,       
        password:req.body.password,       
        gender:req.body.gender,     
        phone:req.body.phone, 
        child:req.body.child,      
        friends:req.body.friends,   
        waitingList:req.body.waitingList,        
    });

    // Save User in the database
    User.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(Users => {
        res.send(Users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Users."
        });
    });
};

// Find a single User with a UserId
exports.findOne = (req, res) => {

};

// Update a User identified by the UserId in the request
exports.update = (req, res) => {

};

// Delete a User with the specified UserId in the request
exports.delete = (req, res) => {

};