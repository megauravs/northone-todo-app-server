module.exports = (app) => {
    const todos = require('../controllers/todo.controller.js');

    // Create a new item
    app.post('/todos', todos.create);

    // Retrieve all items
    app.get('/todos', todos.findAll);

    // Retrieve a single item with itemId
    app.get('/todos/:itemId', todos.findOne);

    // Update a item with itemId
    app.put('/todos/:itemId', todos.update);

    // Delete a item with itemId
    app.delete('/todos/:itemId', todos.delete);
}