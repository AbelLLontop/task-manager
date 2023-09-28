const express = require("express");
const { getAllTasks, getTasksByIdUser, updateTask, deleteTask, getTask } = require("../controller/task");
const router = express.Router();

router.get("/",getAllTasks);
router.post("/",getTasksByIdUser)
router.put("/:id",updateTask)
router.delete("/:id",deleteTask)
router.get("/:id",getTask)

module.exports = router;