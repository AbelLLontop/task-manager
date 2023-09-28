import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logolabelito.png"

export default function LoginPage() {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("auth", "true");
    navigate("/tasks");
  };
  return (
    <main className="bg-gray-950 w-full h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className=" max-w-sm flex flex-col gap-4 text-white p-8 rounded-lg ">
        
        <img src={logo} className="w-24 mx-auto" alt="" />
        <header className=" text-center">
          <h1 className="font-bold text-2xl">Login Tasks</h1>
          <p className="">Ingresa tus datos para iniciar sesión</p>
        </header>
        <label htmlFor="email">
          <span className="block text-gray-700 text-sm mb-1">Email</span>
          <input autoFocus required className="
          bg-gray-900
          border-2 border-gray-800
           p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" type="email" name="email" id="email"
          />
        </label>
        <label htmlFor="password">
          <span className=" block text-gray-700 text-sm mb-1">Password</span>
          <input
            required
            className="
            bg-gray-900
            border-2 border-gray-800 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            type="password"
            name="password"
            id="password"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Ingresar
        </button>
        <div className="text-center text-sm hover:underline">
          <Link to="/register" className="text-blue-500">
            Crear cuenta
          </Link>
        </div>
      </form>
    </main>
  );
}
