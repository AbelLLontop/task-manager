import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logolabelito.png"
import { login } from "../../services/AuthService";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const credentials ={
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    
    login(credentials)
    .then((res)=>{
      if(res.status=="error"){
        alert(res.message)
        setLoading(false);
        // console.clear();
        return;
      }
      setLoading(false);
      const auth = JSON.stringify(res.data);
      localStorage.setItem("auth", auth);
      navigate("/tasks");
    })
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
          <input disabled={loading} autoFocus required className="
          bg-gray-900
          border-2 border-gray-800
           p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" type="email" name="email" id="email"
          />
        </label>
        <label htmlFor="password">
          <span className=" block text-gray-700 text-sm mb-1">Password</span>
          <input
          disabled={loading}
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
        disabled={loading}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Ingresar
        </button>
        {/* loading */}
        <div className="flex justify-center">
          {loading && (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          )}
        </div>
        {!loading&&(
        <div className="text-center text-sm hover:underline">
          <Link to="/register" className="text-blue-500">
            Crear cuenta
          </Link>
        </div>
        )}
      </form>
    </main>
  );
}
