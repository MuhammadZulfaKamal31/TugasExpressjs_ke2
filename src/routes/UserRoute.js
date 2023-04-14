
const express = require("express");
const { getUsers, getUserById, updateUser, createUser, deleteUser } = require("../controllers/User.js")
//gak bisa akses user kalau kita gak login dulu 
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js")

const router = express.Router();

router.get('/user', verifyUser, adminOnly, getUsers);
router.get('/user/:id', verifyUser, adminOnly, getUserById);
router.post('/user', verifyUser, adminOnly, createUser);
router.patch('/user/:id', verifyUser, adminOnly, updateUser);
router.delete('/user/:id', verifyUser, adminOnly, deleteUser);

module.exports = router;