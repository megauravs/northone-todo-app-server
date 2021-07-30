const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    title: String,
    description: String,
    status: String,
    due: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', TodoSchema);