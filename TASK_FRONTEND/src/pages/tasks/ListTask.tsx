import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import TaskCard from "../../components/TaskCard";
import { Task } from "../../interfaces/task";
const tasksTest:Task[] = [
  {
    id: 1,
    title: "Titulo de prueba",
    state: "Por Empezar",
    content: "lorem",
    date: new Date(),
    nameUser: "Juanito",
    idUser:1,
    imageUser:"http://localhost:3000/perfile.png"
  },
  {
    id: 2,
    title: "Titulo de prueba",
    state: "Por Empezar",
    content: "lorem",
    date: new Date(),
    nameUser: "Juanito",
    idUser:1,
    imageUser:"http://localhost:3000/perfile.png"
  },
  {
    id: 3,
    title: "Titulo de prueba",
    state: "Por Empezar",
    content: "lorem",
    date: new Date(),
    nameUser: "Juanito",
    idUser:1,
    imageUser:"http://localhost:3000/perfile.png"
  },
  {
    id: 4,
    title: "Titulo de prueba",
    state: "Por Empezar",
    content: "lorem",
    date: new Date(),
    nameUser: "Juanito",
    idUser:1,
    imageUser:"http://localhost:3000/perfile.png"
  },
  {
    id: 5,
    title: "Titulo de prueba",
    state: "Por Empezar",
    content: "lorem",
    date: new Date(),
    nameUser: "Juanito",
    idUser:1,
    imageUser:"http://localhost:3000/perfile.png"
  },
  {
    id: 6,
    title: "Titulo de prueba",
    state: "Por Empezar",
    content: "lorem",
    date: new Date(),
    nameUser: "Juanito",
    idUser:1,
    imageUser:"http://localhost:3000/perfile.png"
  },
  {
    id: 7,
    title: "Titulo de prueba",
    state: "Por Empezar",
    content: "lorem",
    date: new Date(),
    nameUser: "Juanito",
    idUser:1,
    imageUser:"http://localhost:3000/perfile.png"
  },
  {
    id: 8,
    title: "Titulo de prueba",
    state: "Por Empezar",
    content: "lorem",
    date: new Date(),
    nameUser: "Juanito",
    idUser:1,
    imageUser:"http://localhost:3000/perfile.png"
  },
];

const getTaskTest = async ():Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(tasksTest);
    }, 500);
  });
}

export default function ListTaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    getTaskTest().then((resTasks)=>{
      setTasks(resTasks)
      setLoading(false)
    })
  },[])

  if (loading) {
    return <div
    className="
    mt-10
      flex
      justify-center
      items-center
      flex-grow
    
    "
    >
      <Loader />
    </div>
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full ">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
          ))}
      </div>
    </>
  );
}
