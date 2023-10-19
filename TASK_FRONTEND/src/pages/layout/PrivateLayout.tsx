import { Link, Outlet } from "react-router-dom";
import UserProvider, { useUserContext } from "../../context/UserContext";

export default function PrivateLayout() {
  const {image} = useUserContext();
  return (
    <>
      <div className="w-full p-1 min-h-screen bg-gray-950">
        <div className="sticky max-w-6xl mx-auto top-9 z-10 px-8">

   
          <div className="  text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 gap-2 bg-gray-900 rounded-md ">
            <div className="flex flex-wrap gap-2 items-center">
              <Link to={"user/profile"}>
                <div className="bg-gray-800 p-2 px-4 rounded  cursor-pointer  hover:outline-gray-800 outline-none">
                  Profile
                </div>
              </Link>
              <Link to={"tasks"}>
                <div className="bg-gray-800 p-2 px-4 rounded  cursor-pointer  hover:outline-gray-800 outline-none">
                  Tareas
                </div>
              </Link>
              <Link to={"tasks/my-list"}>
                <div className="bg-gray-800 p-2 px-4 rounded  cursor-pointer  hover:outline-gray-800 outline-none">
                  Mis tareas
                </div>
              </Link>
            </div>
            <Link to={"tasks/create"}  className="
              place-self-center
              w-full
              sm:w-fit
              sm:place-self-end
              md:place-self-center
              bg-blue-600 p-2 px-4 rounded cursor-pointer
            hover:outline-blue-600
            outline-none">
         
              
              Add new Task
            </Link>
            <div className="hidden md:flex items-center gap-2 justify-end">
            <div className="w-10 h-10 flex-grow-0 flex-shrink-0 rounded-full bg-gray-800 relative">
            {image&&(
                <img className="w-full h-full rounded-full object-cover absolute left-0 top-0" src={image} alt="" />
              )}


            </div>
            <div className="text-sm">
              <div>Juanito</div>
              <div className="text-white/50">juanito@gmail.com</div>
            </div>
            </div>
          </div>
          </div>
        <div className=" max-w-6xl mx-auto  text-white p-8  rounded-lg h-full flex flex-col overflow-x-hidden">
   

          <main className="pt-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
