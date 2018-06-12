module.exports = (app) => {
    const User = require('../controllers/alut.user.controllers.js');

    // Create a new Note
    app.post('/createUser', User.create);

    // Retrieve all User
    app.get('/findAllUsers', User.findAll);

    // Retrieve a single Note with noteId
    app.get('/users/:userId', User.findOne);

    // Update a Note with noteId
    app.put('/users/:userId', User.update);

    // Delete a Note with noteId
    app.delete('/users/:userId', User.delete);
}