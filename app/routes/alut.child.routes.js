module.exports = (app) => {
    const Child = require('../controllers/alut.child.controllers.js');

    // Create a new Child
    app.post('/createChild', Child.create);

    // Retrieve all Child
    app.get('/findAllChilds', Child.findAll);

    // Retrieve a single Child with ChildId
    app.get('/findOneChild/:childId', Child.findOne);

    // Update a Child with ChildId
    app.put('/updateChild/:childId', Child.update);

    // Delete a Child with ChildId
    app.delete('/deleteChild/:childId', Child.delete);
}