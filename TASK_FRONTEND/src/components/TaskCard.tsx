import { Task } from "../interfaces/task";
import { useIntersectionObserver } from "../hooks/useItersectionObserver";
import { useRef } from "react";
import { useAuthContext } from "../context/UserContext";
import { useTaskContext } from "../context/TaskContext";
import { Link } from "react-router-dom";
import utc from 'dayjs/plugin/utc'
import dayjs from "dayjs";
dayjs.extend(utc)
interface Props {
  task: Task;
}
const TaskCard = ({ task }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthContext();
  const { deleteTask } = useTaskContext();
  const [isVisible] = useIntersectionObserver(containerRef);

  return (
    <div
      ref={containerRef}
      className={` h-fit p-4 cursor-pointer border border-gray-800 rounded-md mt-4 hover:border-gray-700 group relative 
    hover:scale-[1.02]
        ${isVisible ? "opacity-100" : "opacity-10"} transition-all`}
    >
      <div className="flex justify-between">

      <div className="flex gap-2 items-center mb-2 ">
        <div className="w-10 h-10 flex-grow-0 flex-shrink-0 rounded-full bg-gray-800 relative">
          
        </div>

        <div>
          <h3 className="font-bold">{task.title}</h3>
          <div className=" group-hover:text-gray-400">By {task.user.username}</div>
        </div>
      </div>
      <div className=" flex gap-2">
        <button
        onClick={()=>deleteTask(task._id)}
        className="
      place-self-center
      w-full
      sm:w-fit
      sm:place-self-end
      md:place-self-center
      bg-red-600 p-2 px-4 rounded cursor-pointer
    hover:outline-red-600
    outline-none">Delete</button>
        <Link
        to={`/task/${task._id}`}
        className="
      place-self-center
      w-full
      sm:w-fit
      sm:place-self-end
      md:place-self-center
      bg-yellow-600 p-2 px-4 rounded cursor-pointer
    hover:outline-yellow-600
    outline-none">Edit</Link>
      </div>
      </div>
      <p className="group-hover:text-gray-50 text-gray-400 text-sm">
        {task.description}
      </p>
      <div className="flex justify-between items-center">
        <span>
          <div className=" group-hover:text-gray-400">{dayjs(task.date).utc().format("DD/MM/YYYY")}</div>
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
