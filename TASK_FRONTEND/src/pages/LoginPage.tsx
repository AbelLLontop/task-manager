import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/logolabelito.png";
import { CredentialsLogin } from "../interfaces/Auth";


export default function LoginPage() {  
  const { register, handleSubmit, formState } = useForm();

  const { signin,isAuthenticated ,errors} = useAuthContext();
  const navigate = useNavigate();
  useEffect(()=>{
    if(isAuthenticated){
      navigate("/tasks");
    }
  },[isAuthenticated])
  const onSubmit = handleSubmit(async (values) => {
    const credentials = values as CredentialsLogin;
    signin(credentials);
  });
  return (
    <main className="bg-gray-950 w-full h-screen flex justify-center items-center">
      <form  onSubmit={onSubmit} className=" max-w-sm flex flex-col gap-4 text-white p-8 rounded-lg ">
        <img src={logo} className="w-24 mx-auto" alt="" />
        <div className="flex flex-col gap-2">
          {errors.map((error: string,i:number) => (
            <div key={i} className="bg-red-500 text-white text-sm p-2 rounded-md">
              {error}
            </div>
          ))}
        </div>
        <header className=" text-center">
          <h1 className="font-bold text-2xl">Login Tasks</h1>
          <p className="">Ingresa tus datos para iniciar sesión</p>
        </header>
        <label htmlFor="email">
          <span
            className=" block text-gray-700 text-sm mb-1
        "
          >
            Email
          </span>
          <input
            {...register("email", {
              required: true,
            })}
            placeholder="Email"
            className="
       bg-gray-900
       border-2 border-gray-800
        p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          {formState.errors.email && (
            <div className="text-red-500  text-sm p-2 rounded-md">
              El email es requerido
            </div>
          )}
        </label>
        <label htmlFor="password">
          <span
            className=" block text-gray-700 text-sm mb-1
        "
          >
            Password
          </span>
          <input
            {...register("password", {
              required: true,
            })}
            placeholder="Password"
            className="
                  bg-gray-900
                  border-2 border-gray-800
                   p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          {formState.errors.password && (
            <div className="text-red-500  text-sm p-2 rounded-md">
              El Password es requerido
            </div>
          )}
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
