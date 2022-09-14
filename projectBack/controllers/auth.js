const User = require("../models/user");
// const { validationResult } = require('express-validator');
const { validationResult } = require("express-validator");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }


  const user = User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ err: "Not abele to save user" });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signout = (req, res) => {
  res.json({
    massage: "SignOut Route",
  });
};
