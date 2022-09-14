const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signout, signup } = require("../controllers/auth");

router.post(
  "/singup",
//   check("name", "Name Should be gretter then 3").isLength({ min: 3 }),
//   check("email", "Emali is require").isEmail,
//   check("password", "Name Should be gretter then 3").isLength({ min: 3 }),
  signup
);
router.get("/singout", signout);

module.exports = router;
