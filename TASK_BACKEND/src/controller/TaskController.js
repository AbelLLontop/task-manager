const TaskService = require("../services/TaskService");
const { schemaTask } = require("../validator/Task");

class TaskController {
  taskService = new TaskService();

  async createTask(req, res, next) {
    try {
      const { id } = req.userToken;
      const { description, status, title } = await schemaTask.validate(
        req.body,
        { strict: true, abortEarly: false }
      );
      const data = await this.taskService.createTask({
        idUser: id,
        title,
        description,
        status,
      });
      return res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  }
  async getAllTasks(req, res, next) {
    try {
      const data = await this.taskService.getAllTasks();
      return res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  }
  async getTasks(req, res, next) {
    try {
      const { id } = req.userToken;
      const data = await this.taskService.getTasksByIdUser(id);
      return res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  }
  async getTask(req, res, next) {
    try {
      const { id } = req.userToken;
      const { idTask } = req.params;
      const data = await this.taskService.getTask(id, idTask);
      if (!data) {
        return res.status(404).json({ message: "Task not found" });
      }
      return res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  }
  async updateTask(req, res, next) {
    try {
      const { id } = req.userToken;
      const { idTask } = req.params;
      const { description, status, title } = await schemaTask.validate(
        req.body,
        { strict: true, abortEarly: false }
      );

      const data = await this.taskService.updateTask(id, idTask, {
        title,
        description,
        status,
      });
      if (!data) {
        return res.status(404).json({ message: "Task not found" });
      }
      return res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  }
  async deleteTask(req, res, next) {
    try {
      const { id } = req.userToken;
      const { idTask } = req.params;
      const data = await this.taskService.deleteTask(id, idTask);
      if (!data) {
        return res.status(404).json({ message: "Task not found" });
      }
      return res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = TaskController;
