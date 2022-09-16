const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const user = require("../models/user");

// Method for Sign Up or Register  -------------------
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

// Method for SignIn or Login
exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }

  //   If user did't exist or created
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ err: "User Email dose't exist" });
    }

    // If Password dons't match
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "Email or password not match" });
    }

    // Creating and Storing token in browser cooke
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.cookie("token", token, { expire: new Date() + 9999 });

    // Send user info to fontEnd
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

// Method for Sign Out or Log Out  -----------------------
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    massage: "User SignOut Successfully",
  });
};

// Mehtod to Check user is SignIn or not ------------------
exports.isSignIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({ error: "ACCESS DENIED " });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({ error: "You are not admin" });
  }
  next();
};

