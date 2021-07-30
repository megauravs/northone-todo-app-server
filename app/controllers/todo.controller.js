const Todo = require('../models/todo.model.js');

// Create and Save a new Todo item
exports.create = (req, res) => {
  // validate the request
  if (!req.body) {
    return res.status(400).send({
      message: "Todo item body cannot be validated!!"
    });
  }

  // Now let's create a Todo item
  const todo = new Todo({
    title: req.body.title || "Untitled",
    description: req.body.description,
    status: req.body.status,
    due: req.body.due
  });

  // Let's now save the Todo item in the database
  todo.save()
    .then(inputData => {
      res.send(inputData);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Error occorred while saving the item, please try again!!"
      });
    });
};

// Retrieve and return all Todo items from the database.
exports.findAll = (req, res) => {
  Todo.find()
    .then(items => {
      res.send(items);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Error occorred while retrieving items, please try again!!"
      });
    });
};

// Find a single Todo item with a itemId
exports.findOne = (req, res) => {
  Todo.findById(req.params.itemId)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: "Todo item not found with id " + req.params.itemId
        });
      }
      res.send(todo);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Todo item not found with id " + req.params.itemId
        });
      }
      return res.status(500).send({
        message: "Error retrieving item with id " + req.params.itemId
      });
    });
};

// Update a Todo item identified by the itemId in the request
exports.update = (req, res) => {
  // Validate the Request
  if (!req.body) {
    return res.status(400).send({
      message: "Todo item body cannot be validated!!"
    });
  }

  // Find item and update it with the request body
  Todo.findByIdAndUpdate(req.params.itemId, {
    title: req.body.title || "Untitled",
    description: req.body.description,
    status: req.body.status,
    due: req.body.due
  }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: "Todo item not found with id " + req.params.itemId
        });
      }
      res.send(todo);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "todo item not found with id " + req.params.itemId
        });
      }
      return res.status(500).send({
        message: "Error updating todo item with id " + req.params.itemId
      });
    });
};

// Delete a Todo item with the specified itemId in the request
exports.delete = (req, res) => {
  Todo.findByIdAndRemove(req.params.itemId)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: "Todo item not found with id " + req.params.itemId
        });
      }
      res.send({ message: "Todo item deleted successfully!!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Todo item not found with id " + req.params.itemId
        });
      }
      return res.status(500).send({
        message: "Could not delete Todo item with id " + req.params.itemId
      });
    });
};