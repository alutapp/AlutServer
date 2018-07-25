const users = require('express').Router();
const User = require('../controllers/alut.user.controllers.js');


    // Create a new User
    users.post('/createUser', User.create);

    // Retrieve all User
    users.get('/findAllUsers', User.findAll);

    // Retrieve a single User with UserId
    users.get('/findOneUser/:userId', User.findOne);

    // Update a User with UserId
    users.put('/updateUser/:userId', User.update);

    // Delete a User with UserId
    users.delete('/deleteUser/:userId', User.delete);

    module.exports = users;
