const router = require("express").Router();
const database = require("../services/questionDB");

router.post("/add", async (req, res, next) => {
  let result = await database.addQuestion(req.body);
  res.json(result);
});
router.post("/get", async (req, res, next) => {
  let result = await database.bufferAndShuffle(req.body.language);
  let questions = JSON.stringify(result);
  res.render("quizPage", { language: req.body.language, myQuiz: questions });
});
router.get("/get", async (req, res, next) => {
  let result = await database.bufferAndShuffle("C-LANGUAGE");
  let questions = JSON.stringify(result);
  res.render("quizPage", { language: "C-LANGUAGE", myQuiz: questions });
});
module.exports = router;
