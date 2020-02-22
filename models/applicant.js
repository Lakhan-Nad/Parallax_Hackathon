const mongoose = require("mongoose");

const applicantSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  contact: Number,
  type: {
    type: String,
    enum: ["fresher", "experienced"],
    default: "fresher"
  }
});

module.exports = mongoose.model("Applicant", applicantSchema);
