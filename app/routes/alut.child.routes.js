module.exports = (app) => {
    const Child = require('../controllers/alut.child.controllers.js');

    // Create a new Note
    app.post('/createChild', Child.create);

    // Retrieve all Child
    app.get('/findAllChilds', Child.findAll);

    // Retrieve a single Note with noteId
    app.get('/users/:userId', Child.findOne);

    // Update a Note with noteId
    app.put('/users/:userId', Child.update);

    // Delete a Note with noteId
    app.delete('/users/:userId', Child.delete);
}