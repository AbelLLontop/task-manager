const express = require("express");
const router = express.Router();
const TaskController = require("../controller/TaskController");
const authMiddleware = require("../middleware/auth");
const taskController = new TaskController();


router.get("/",authMiddleware,taskController.getAllTasks.bind(taskController));
router.get("/me",authMiddleware,taskController.getTasks.bind(taskController));
router.post("/",authMiddleware,taskController.createTask.bind(taskController));
router.put("/:idTask",authMiddleware,taskController.updateTask.bind(taskController));
router.delete("/:idTask",authMiddleware,taskController.deleteTask.bind(taskController));
router.get("/:idTask",authMiddleware,  taskController.getTask.bind(taskController))

module.exports = router;