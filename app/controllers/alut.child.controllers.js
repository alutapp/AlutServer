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
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,     
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
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a ChildId
exports.findOne = (req, res) => {

};

// Update a Child identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a Child with the specified ChildId in the request
exports.delete = (req, res) => {

};