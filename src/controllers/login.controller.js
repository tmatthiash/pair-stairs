const passport = require("passport");

exports.isUserAuthenticated = (req, res) => {
  if (!req.user) {
    return res.status(200).send({ isUserAuthenticated: false });
  } else if (req.user.dataValues.name !== req.params.name) {
    return res.status(200).send({ isUserAuthenticated: false });
  }
  else {
    return res.status(200).send({ isUserAuthenticated: true });
  }
}

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res
        .status(401)
        .send({ errorMessage: 'Invalid email or password' });
    }
    return res.status(200).send();
  })(req, res, next);
};
