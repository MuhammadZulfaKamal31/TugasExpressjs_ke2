const express = require("express");
const { login, logOut, me } = require("../controllers/Auth")

const router1 = express.Router();

router1.get('/me', me);
router1.post('/login', login);
router1.delete('/logout', logOut)

module.exports = router1;