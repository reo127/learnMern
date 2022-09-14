const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signout, signup } = require("../controllers/auth");

router.post(
  "/singup",
  check('name').isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
  check('email').isEmail().withMessage('Email is require'),
  check('password').isLength({ min: 3 }).withMessage('password must be at least 3 chars long'),
  signup
);
router.get("/singout", signout);

module.exports = router;
