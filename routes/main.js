const express = require("express");
const router = express.Router();
const dboperation = require("../services/applicantDB");
const auth = require("../middleware/auth");
const passport = require("passport");
const questionRouter = require("./questionRoute");

router.get("/", (req, res, next) => {
  res.render("login", { message: "" });
});

router.get("/login", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/applicant/main");
  }
  res.render("login", { message: req.flash("error") });
});

router.get("/register", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/applicant/main");
  }
  res.render("register", { message: "" });
});

router.post("/register", async (req, res, next) => {
  try {
    let result = await dboperation.addApplicant(req.body);
    if (result == "ok") {
      res.redirect("/login");
    } else {
      res.render("register", { message: result });
    }
  } catch (error) {
    next(error);
  }
});

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/applicant/main",
    failureRedirect: "/login",
    failureFlash: true
  })
);

router.get("/logout", (req, res, next) => {
  req.logOut();
  res.render("login");
});

router.use("/question", questionRouter);

module.exports = router;
