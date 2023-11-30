import { useEffect, useRef, useState } from "react";
import TaskCard from "../components/TaskCard";
import { Task } from "../interfaces/task";
import { useUserContext } from "../hooks/useUserContest";
import { useForm } from "react-hook-form";
import { useTaskContext } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import utc from 'dayjs/plugin/utc'
import dayjs from "dayjs";
dayjs.extend(utc)

const TaskFormPage = () => {
  const refInput = useRef<HTMLInputElement>(null);
  const {register,handleSubmit,setValue} = useForm();
  const {createTask,getTask,updateTask} = useTaskContext();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(()=>{
    const loadTask = async()=>{
      if(params.id){
        const task = await getTask(params.id);
        setValue("title",task.title);
        setValue("description",task.description);
      }
    }
    loadTask();

  },[])

const onSubmit = handleSubmit((data)=>{
  if(params.id){
  updateTask({...data,_id:params.id,date:dayjs.utc(data.date).format()} as Task);
  navigate("/tasks");
  }else{
    const newTask = data as Task;
    createTask({
      ...newTask,
      date:dayjs.utc(newTask.date).format()
    });
    navigate("/tasks");

  }

})

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* <TaskCard  task={task} /> */}
      <div className="mt-4">
        <h1 className="text-2xl text-center">Create a new Task</h1>
        <form onSubmit={onSubmit}   className="flex flex-col gap-2 max-w-sm mx-auto">
          <label className="block">
            <span className=" block text-gray-700 text-sm mb-1">Title</span>
            <input
            {...register("title")}
              autoFocus
              placeholder="Title"
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
             {...register("description")}
             placeholder="Description"
             rows={3}
              required
              className="
              bg-gray-900
              border-2 border-gray-800 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            ></textarea>
          </label>
          <label className="block">
            <span className=" block text-gray-700 text-sm mb-1">Title</span>
            <input
            {...register("date")}
              autoFocus
              required
              className="
              bg-gray-900
              border-2 border-gray-800 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              type="date"
            />
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
        </form>
      </div>
    </div>
  );
};

export default TaskFormPage;
