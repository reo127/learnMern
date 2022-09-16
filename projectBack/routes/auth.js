const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signout, signup, signin, isSignIn } = require("../controllers/auth");

// Sign Up Route
router.post(
  "/singup",
  check('name').isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
  check('email').isEmail().withMessage('Email is require'),
  check('password').isLength({ min: 3 }).withMessage('password must be at least 3 chars long'),
  signup
);


// SignIn or Login Route
router.post(
    "/singin",
    check('email').isEmail().withMessage('Email is require'),
    check('password').isLength({ min: 1 }).withMessage('password is require'),
    signin
  );


  // Testting isSignIn
  router.get("/test", isSignIn, (req, res)=>{
    res.send("Router Protected")
  })


router.get("/singout", signout);

module.exports = router;
