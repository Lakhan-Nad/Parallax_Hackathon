const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
const indexRouter = require("./routes/main");
const flash = require("connect-flash");

require("dotenv").config();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const publicDir = express.static(path.join(__dirname, "/"));
app.use(publicDir);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: "parallax", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require("./middleware/passport")(passport);

mongoose.connect(
  "mongodb://127.0.0.1:27017/Beginners",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  function(err, myDb) {
    if (err) {
      console.log("Unable to connect to Db ):");
    } else {
      console.log("Connected to db :)");
    }
  }
);

app.use("/", indexRouter);

app.use(function(req, res, next) {
  next(new Error("Page Not Found"));
});

app.use((err, req, res, next) => {
  res.render("error", { error: err });
});

app.listen(3000);
