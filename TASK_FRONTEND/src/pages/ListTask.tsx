import { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { useTaskContext } from "../context/TaskContext";


export default function ListTaskPage() {
  
  const {tasks,getTasks} = useTaskContext();
  useEffect(()=>{
    getTasks();
  },[])

  if(tasks.length === 0){
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-4xl font-bold">No hay tareas</h1>
        <img className="w-1/2" src="https://media.giphy.com/media/3o7aCSPqXE5C6T8tBC/giphy.gif" alt="No hay tareas" />
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full ">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
          ))}
      </div>
    </>
  );
}
