const Child = require('../models/child.js');

// Create and Save a new Child
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Child content can not be empty"
        });
    }

    // Create a Child
    const child = new Child({
        id : req.body.id,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,  
        hobbies : req.body.hobbies,   
        verbal : req.body.verbal,    
        independent: req.body.independent,   
        address : { city:req.body.city,street: req.body.street},
        description :req.body.description     
    });

    // Save Child in the database
    child.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Child."
        });
    });
};

// Retrieve and return all Children from the database.
exports.findAll = (req, res) => {
    Child.find()
    .then(childs => {
        res.send(childs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving childs."
        });
    });
};

// Find a single child with a childId
exports.findOne = (req, res) => {
    Child.findById(req.params.childId)
    .then(child => {
        if(!child) {
            return res.status(404).send({
                message: "Child not found with id " + req.params.childId
            });            
        }
        res.send(child);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Child not found with id " + req.params.childId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving child with id " + req.params.childId
        });
    });
};

// Update a child identified by the childId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Child content can not be empty"
        });
    }

    // Find child and update it with the request body
    Child.findByIdAndUpdate(req.params.childId, {
        id : req.body.id,
        name : req.body.name, 
        age : req.body.age ,
        gender : req.body.gender, 
        verbal : req.body.verbal, 
        hobbies : req.body.hobbies ,        
        independent : req.body.independent ,
        address : { city:req.body.city,street: req.body.street},
        description : req.body.description 
    }, {new: true})
    .then(child => {
        if(!child) {
            return res.status(404).send({
                message: "Child not found with id " + req.params.childId
            });
        }
        res.send(child);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Child not found with id " + req.params.childId
            });                
        }
        return res.status(500).send({
            message: "Error updating child with id " + req.params.childId
        });
    });
};

// Delete a child with the specified childId in the request
exports.delete = (req, res) => {
    Child.findByIdAndRemove(req.params.childId)
    .then(child => {
        if(!child) {
            return res.status(404).send({
                message: "Child not found with id " + req.params.childId
            });
        }
        res.send({message: "Child deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Child not found with id " + req.params.childId
            });                
        }
        return res.status(500).send({
            message: "Could not delete child with id " + req.params.childId
        });
    });
};








