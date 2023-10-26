import { useEffect, useRef, useState } from "react";
import TaskCard from "../../components/TaskCard";
import { Task } from "../../interfaces/task";
import { useUserContext } from "../../hooks/useUserContest";

const initialTask = {
  id: 1,
  title: "Titulo de prueba",
  state: "Por Empezar",
  content: "",
  date: new Date(),
  nameUser: "Juanito",
};

const NewTaskPage = () => {
  const [task,setTask] = useState<Task>(initialTask);
  const refInput = useRef<HTMLInputElement>(null);
  const {user} = useUserContext();
useEffect(()=>{
  refInput.current?.select();

},[])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TaskCard user={user} task={task} />
      <div className="mt-4">
        <h1 className="text-2xl text-center">Create a new Task</h1>
        <div className="flex flex-col gap-2 max-w-sm mx-auto">
          <label className="block">
            <span className=" block text-gray-700 text-sm mb-1">Title</span>
            <input
            ref={refInput}
            name="title"
            value={task.title}
            onChange={handleInputChange}
              autoFocus
              required
              className="
              bg-gray-900
              border-2 border-gray-800 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              type="text"
            />
          </label>
          <label className="block">
            <span className=" block text-gray-700 text-sm mb-1">Content</span>
            <textarea
             onChange={handleInputChange}
             name="content"
             value={task.content}
              required
              className="
              bg-gray-900
              border-2 border-gray-800 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            ></textarea>
          </label>
          <label className="block">
            <span className=" block text-gray-700 text-sm mb-1">State</span>

            <select
            onChange={handleInputChange}
              className="bg-gray-800 p-2 px-4 rounded
              cursor-pointer
              hover:outline-gray-800
              outline-none
              border-r-8
              border-transparent
              "
              name="state"
            >
              <option value="por-empezar">Por Empezar</option>
              <option value="en-progreso">En Progreso</option>
              <option value="terminado">Terminado</option>
            </select>
          </label>

          <button
            className=" bg-blue-600 p-2 px-4 rounded cursor-pointer
            hover:outline-blue-600
            outline-none
            mt-4
            "
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTaskPage;
