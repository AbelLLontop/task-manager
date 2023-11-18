const express = require("express");
const router = express.Router();
const AuthController = require("../controller/AuthController");


const authController = new AuthController();

router.post("/login",authController.login.bind(authController));
router.post("/register",authController.register.bind(authController));
module.exports = router;