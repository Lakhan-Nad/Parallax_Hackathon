const Question = require("../models/question");
const questionRoute = require("express").Router();

module.exports.addQuestion = async question => {
  try {
    let newQuestion = new Question(question);
    await newQuestion.save();
    return newQuestion;
  } catch (error) {
    next(error);
  }
};

module.exports.bufferAndShuffle = async language => {
  try {
    let questions = await Question.find({ language: language }).lean();
    var j, x, i;
    for (i = questions.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = questions[i];
      questions[i] = questions[j];
      questions[j] = x;
    }
    questions = questions.splice(0, 10);
    return questions;
  } catch (error) {
    next(error);
  }
};
