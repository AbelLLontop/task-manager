import { Link } from "react-router-dom";
import { useAuthContext } from "../context/UserContext";
// import { useUserContext } from "../hooks/useUserContest";

const Navbar = () => {
  const { logout,user } = useAuthContext();

  return (
    <div className="  text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 gap-2 bg-gray-900 rounded-md ">
      
      <div className="flex flex-wrap gap-2 items-center">
      
        <Link to={"/profile"}>
          <div className="bg-gray-800 p-2 px-4 rounded  cursor-pointer  hover:outline-gray-800 outline-none">
            Profile {user.username}
          </div>
        </Link>
        <Link to={"/tasks"}>
          <div className="bg-gray-800 p-2 px-4 rounded  cursor-pointer  hover:outline-gray-800 outline-none">
            Mis tareas
          </div>
        </Link>
      </div>
      
      <Link
        to={"/add-task"}
        className="
      place-self-center
      w-full
      sm:w-fit
      sm:place-self-end
      md:place-self-center
      bg-blue-600 p-2 px-4 rounded cursor-pointer
    hover:outline-blue-600
    outline-none"
      >
        Add new Task
      </Link>
      <div className="hidden md:flex justify-end ">
        <Link
          onClick={logout}
          to={"/login"}
          className="
        hover:bg-white/5
        p-2 rounded-md
        flex items-center gap-2 "
        >
          Logout
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
