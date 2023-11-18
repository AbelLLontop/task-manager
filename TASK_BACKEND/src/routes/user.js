const express = require("express");
const router = express.Router()
const uploadImageMiddleware = require("../libs/storajeUpload");
const authMiddleware = require("../middleware/auth");
const UserController = require("../controller/UserController");

const userController = new UserController();
router.get("/me",authMiddleware,userController.getUser.bind(userController));
router.delete("/delete",authMiddleware,userController.deleteUser.bind(userController));
router.put("/update",authMiddleware,uploadImageMiddleware,userController.updateUser.bind(userController));

module.exports = router;