const express = require('express');
const router = express.Router();
const { signout, signup } = require('../controllers/auth')

router.post('/singup', signup);
router.get('/singout', signout);

module.exports = router;