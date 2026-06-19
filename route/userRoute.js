const express = require("express");
const checkAuth = require("../middleware/auth");

const router = express.Router();

const { register, login, getuser } = require("../controller/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/", checkAuth, getuser);

module.exports = router;
