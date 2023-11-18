const TaskModel = require("../model/task");

class TaskService {
  async createTask({ idUser, title, description,status }) {
    const data = await TaskModel.create({
      title,
      description,
      status,
      user: idUser,
    });
    return data;
  }
  async getAllTasks() {
    const data = await TaskModel.find();
    return data;
  }
  async getTasksByIdUser(idUser) {
    const data = await TaskModel.find({ user: idUser });
    return data;
  }
  async updateTask(idUser, id, {
    title,description,status
  }) {
    const data = await TaskModel.findOneAndUpdate(
      { _id: id, user: idUser },
      {
        title,
        description,
        status,
      },
      { new: true }
    );
    return data;
  }
  async deleteTask(idUser, id) {
    const data = await TaskModel.findOneAndDelete({ _id: id, user: idUser });
    return data;
  }
}

module.exports = TaskService;
