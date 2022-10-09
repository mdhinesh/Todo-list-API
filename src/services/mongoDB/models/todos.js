const mongoose = require('mongoose')

const todosSchema = new mongoose.Schema({
    username: String,
    todos: [
      {
        checked: Boolean,
        text: String,
        id: Number,
      },
    ],
  });

module.exports.Todos = mongoose.model("Todos", todosSchema)