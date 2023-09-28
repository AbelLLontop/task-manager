const express = require("express");
const { loginUser, registerUser,updateUser } = require("../controller/user");
const uploadImageMiddleware = require("../libs/storajeUpload");
const authMiddleware = require("../middleware/auth");
const router = express.Router()

router.post("/register",registerUser);
router.put("/update",authMiddleware,uploadImageMiddleware,updateUser);
router.post("/login",loginUser)

module.exports = router;