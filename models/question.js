const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  answer: {
    type: Number,
    enum: [1, 2, 3, 4],
    default: 1
  },
  language: String
});

module.exports = mongoose.model("question", questionSchema);
