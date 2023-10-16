import TaskCard from "../../components/TaskCard";
const tasks = [
  {
    id: 1,
    title: "Titulo de prueba",
    state: "Por Empezar",
    content: "lorem",
    date: new Date(),
    nameUser: "Juanito",
  },
  {
    id: 2,
    title: "Titulo de prueba",
    state: "Por Empezar",
    content: "lorem",
    date: new Date(),
    nameUser: "Juanito",
  },
  {
    id: 3,
    title: "Titulo de prueba",
    state: "Por Empezar",
    content: "lorem",
    date: new Date(),
    nameUser: "Juanito",
  },
  {
    id: 4,
    title: "Titulo de prueba",
    state: "Por Empezar",
    content: "lorem",
    date: new Date(),
    nameUser: "Juanito",
  },
  {
    id: 5,
    title: "Titulo de prueba",
    state: "Por Empezar",
    content: "lorem",
    date: new Date(),
    nameUser: "Juanito",
  },
];
export default function ListTaskPage() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </>
  );
}
