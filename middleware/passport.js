const bcrypt = require("bcrypt-nodejs");
const LocalStrategy = require("passport-local").Strategy;
const Applicant = require("../models/applicant");

module.exports = passport => {
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    Applicant.findById(id)
      .exec()
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          let applicant = await Applicant.findOne({ email: email });
          if (!applicant) {
            return done(null, false, { message: "User Not Found" });
          }
          if (!bcrypt.compareSync(password, applicant.password)) {
            return done(null, false, { message: "Wrong Password" });
          }
          return done(null, applicant);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
