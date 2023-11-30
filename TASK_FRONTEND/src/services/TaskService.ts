import { Task } from "../interfaces/task";
import { apiManager } from "./api.config";

export const getTasksRequests = async () => await apiManager.get("/tasks");
export const getTaskRequests = async (id: string) =>
  await apiManager.get(`/tasks/${id}`);

export const createTaskRequests = async (task: Task) =>
  await apiManager.post("/tasks", task);

export const updateTaskRequests = async (task: Task) =>
  await apiManager.put(`/tasks/${task._id}`, task);
export const deleteTaskRequests = async (id:string) =>
  await apiManager.delete(`/tasks/${id}`);
