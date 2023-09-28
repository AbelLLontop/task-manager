import { useState } from "react"


export default function ListTaskPage() {
  const [tasks,setTasks] = useState([
    {
        state:'por-empezar',
        id:1,
    },
    {
        state:'en-progreso',
        id:2,
    },
    {
        state:'terminado',
        id:3,
    },
    {
        state:'por-empezar',
        id:4,
    },
    {
        state:'en-progreso',
        id:5,
    },
    {
        state:'terminado',
        id:6,
    },
])
  return (
    <>

<div className="bg-gray-950 p-4 mt-4">
                {
                    tasks.map((task)=>(
                        <Item key={task.id} task={task}  setState={setTasks}/>
                    ))
                }
            </div>

    </>
  )
}


const Item = ({task,setState}:any)=>{
  const handleSelect = (e:any)=>{
      setState((prev:any)=>{
          return prev.map((item:any)=>{
              if(item.id === task.id){
                  return {
                      ...item,
                      state:e.target.value,
                  }
              }
              return item
          })
      })
      
  }

  const Ticket = ()=>{
  const state = task.state
  return <span className={`
  group-hover:opacity-100
  transition-all
  group-hover:top-[-20px]
  group-hover:left-[-60px]
  group-hover:-rotate-45
  opacity-0 block absolute p-2 px-4 top-0 
  ${task.state=='por-empezar'&&'bg-slate-500'} 
  ${task.state=='en-progreso'&&'bg-green-500'} 
  ${task.state=='terminado'&&'bg-red-950'} 
  left-0 rotate-0`}>
      {task.state=='por-empezar'&&'bg-slate-500'} 
  {task.state=='en-progreso'&&'bg-green-500'} 
  {task.state=='terminado'&&'bg-red-950'} 
  </span>}

  return (
      <div className="p-4
      border border-gray-800 rounded-md mt-4
      hover:border-gray-700
      group
      relative
      hover:scale-105
      transition-all
      ">
         <Ticket/>
         <div className="
         flex justify-between items-center mb-2">
      <h3 className="font-bold">Title</h3>
      <div className="flex gap-2">
          <div className="bg-blue-600 p-2 px-4 rounded  cursor-pointer  hover:outline-blue-600
          outline-none">Editar</div>
          <div className="bg-gray-800 p-2 px-4 rounded cursor-pointer  hover:outline-gray-800
          outline-none">Eliminar</div>
      </div>
         </div>
      <p className="group-hover:text-gray-50 text-gray-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius neque autem dolor ducimus officia illum consequatur tenetur ipsa numquam nisi? Cum eveniet doloribus id. Modi perspiciatis earum officia quam incidunt?</p>
      <div className="flex justify-between items-center">
        <span>
            <div className=" group-hover:text-gray-400">
           Juanito

            </div>
            <div className=" group-hover:text-gray-400">
           29/09/2021
            </div>
        </span>
          <select onChange={handleSelect} value={task.state} className="bg-gray-800 p-2 px-4 rounded
          cursor-pointer
          hover:outline-gray-800
          outline-none
          border-r-8
          border-transparent
          " name="state">
              <option value="por-empezar">Por Empezar</option>
              <option value="en-progreso">En Progreso</option>
              <option value="terminado">Terminado</option>
          </select>
        
      </div>

      </div>
  )
}