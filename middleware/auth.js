module.exports = {
  isApplicant: (req, res, next) => {
    if (req.user.role == "applicant") {
      return next();
    }
  },
  isComapny: (req, res, next) => {
    if (req.user.role == "comapny") {
      return next();
    }
  },
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
  }
};
