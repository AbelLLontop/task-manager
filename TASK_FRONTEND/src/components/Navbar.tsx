import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContest";

const Navbar = () => {
  const { user } = useUserContext();

  return (
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
      <Link
        to={"tasks/create"}
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
          to={"user/profile"}
          className="
        hover:bg-white/5
        p-2 rounded-md
        flex items-center gap-2 "
        >
          <div className="w-10 h-10 flex-grow-0 flex-shrink-0 rounded-full bg-gray-800 relative">
            {user.image && (
              <img
                className="w-full h-full rounded-full object-cover absolute left-0 top-0"
                src={user.image}
                alt=""
              />
            )}
          </div>

          <div className="text-sm">
            <div>{user.name}</div>
            <div className="text-white/50">{user.email}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
