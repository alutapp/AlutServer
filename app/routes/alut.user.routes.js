module.exports = (app) => {
    const User = require('../controllers/alut.user.controllers.js');

    // Create a new User
    app.post('/createUser', User.create);

    // Retrieve all User
    app.get('/findAllUsers', User.findAll);

    // Retrieve a single User with UserId
    app.get('/findOneUser/:userId', User.findOne);

    // Update a User with UserId
    app.put('/updateUser/:userId', User.update);

    // Delete a User with UserId
    app.delete('/deleteUser/:userId', User.delete);
}