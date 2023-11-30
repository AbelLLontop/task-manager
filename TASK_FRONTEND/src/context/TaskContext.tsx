import { createContext, useContext, useState } from "react";
import { Task } from "../interfaces/task";
import { createTaskRequests, deleteTaskRequests, getTaskRequests, getTasksRequests, updateTaskRequests } from "../services/TaskService";

const TaskContext = createContext<{
    tasks: Task[];
    createTask: (task:Task) => void;
    getTasks: () => void;
    deleteTask: (id:string) => void;
    getTask: (id:string) => Promise<Task>;
    updateTask: (task:Task) => void;
}>({tasks: [], createTask: () => { ""}, getTasks: () => { ""},deleteTask: () => { ""},
updateTask: () => { ""},
getTask: async(id:string)=>{return {} as Task}});
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("TaskContext must be used within an TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const createTask = async(task:Task)=>{
    console.log(task)
    const taskReq = await createTaskRequests(task);
    console.log(taskReq);
  }
  const updateTask = async(task:Task)=>{
    try{
      await updateTaskRequests(task);
    }catch(e){
      console.log(e);
    }
  }
  const getTasks = async ()=>{
    try{
        const tasksRequest = await getTasksRequests();
        setTasks(tasksRequest.data);
    }catch(error){
        console.log(error);
    }
  }
  const deleteTask = async(id:string)=>{
    try{
        const tasksRequest = await deleteTaskRequests(id);
        if(tasksRequest.status ===204){
            setTasks(tasks.filter((task)=>task._id !== id));
        }
    }catch(error){
        console.log(error);
    }
  }

  const getTask = async(id:string)=>{
    const res  = await getTaskRequests(id);
    return res.data;
  }

  return <TaskContext.Provider value={{tasks,createTask,getTasks,deleteTask,getTask,updateTask}}>{children}</TaskContext.Provider>;
};
