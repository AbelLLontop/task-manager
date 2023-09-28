import { Link, Outlet } from "react-router-dom";

export default function PrivateLayout() {
  return (
    <>
      <div className="w-full p-1 min-h-screen bg-gray-950">
        <div className=" max-w-6xl mx-auto  text-white p-8  rounded-lg">
          <div className=" flex justify-between p-4 gap-2 bg-gray-900 rounded-md sticky top-9 z-10">
            <div className="flex gap-2 items-center">
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
              <Link to={"tasks"}>
                <div className="bg-gray-800 p-2 px-4 rounded  cursor-pointer  hover:outline-gray-800 outline-none">
                  Mis tareas
                </div>
              </Link>
            </div>
            <div
              className="bg-blue-600 p-2 px-4 rounded cursor-pointer
            hover:outline-blue-600
            outline-none"
            >
              Add new Task
            </div>
          </div>

          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
