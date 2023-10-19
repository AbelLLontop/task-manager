import { Task } from "../interfaces/task";
import { useIntersectionObserver } from "../hooks/useItersectionObserver";
import { useEffect, useRef, useState } from "react";

interface Props {
  task: Task;
}
const TaskCard = ({ task }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible] = useIntersectionObserver(containerRef);
  

  return (
    <div
    ref={containerRef}
    className={` h-fit p-4 cursor-pointer border border-gray-800 rounded-md mt-4 hover:border-gray-700 group relative 
    hover:scale-[1.02]
        ${isVisible ? "opacity-100" : "opacity-10"} transition-all`}
        >
      <div className="flex gap-2 items-center mb-2">
        <div className="w-8 h-8 flex-grow-0 flex-shrink-0 rounded-full bg-gray-800"></div>
        <div>
          <h3 className="font-bold">{task.title}</h3>
          <div className=" group-hover:text-gray-400">By {task.nameUser}</div>
        </div>
      </div>
      <p className="group-hover:text-gray-50 text-gray-400 text-sm">
        {task.content}
      </p>
      <div className="flex justify-between items-center">
        <span>
          <div className=" group-hover:text-gray-400">
            {task.date.toLocaleDateString()}
          </div>
        </span>
        <div className="p-2 px-4">{task.state}</div>
      </div>
    </div>
  );
};

export default TaskCard;
