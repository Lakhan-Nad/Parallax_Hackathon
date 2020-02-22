const Applicant = require("../models/applicant");
const bcrypt = require("bcrypt-nodejs");
const salt_factor = 8;
generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(salt_factor), null);
};

module.exports = {
  addApplicant: async user => {
    try {
      let message = "ok";
      let newApplicant = new Applicant(user);
      newApplicant.email = user.email.trim();
      newApplicant.password = generateHash(user.password.trim());
      newApplicant.contact = parseInt(user.contact);
      newApplicant.firstName = user.firstName.trim();
      newApplicant.lastName = user.lastName.trim();
      await newApplicant.save();
      return message;
    } catch (error) {
      return error.message;
    }
  }
};
