const express = require("express");
const {registerUser, loginUser, getUser, getUsers} = require("../Controllers/userController");

const router = express.Router();


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/gerUser/:userId", getUser)
router.get("/", getUsers)


module.exports = router