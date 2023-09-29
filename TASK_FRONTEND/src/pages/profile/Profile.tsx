import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [auth,setAuth] = useState({
    token:"",
    user:{
      _id:"",
      name:"",
      email:"",
    }
  })

  useEffect(()=>{
    console.log("hello")
    const authString = localStorage.getItem("auth");
    const authLocal = authString && JSON.parse(authString);
    if(!authLocal){
      navigate("/login",{
        replace:true
      })
    }
    setAuth(authLocal);
  },[navigate])

  const logout = ()=>{
    localStorage.removeItem("auth");
    navigate("/login",{
      replace:true
    })
  }
  return (
    <div>
      <div className="bg-gray-950 w-full flex justify-center items-center">
        <div className=" max-w-sm flex flex-col gap-4 text-white p-8 rounded-lg ">
          <header className=" text-center">
            <h1 className="font-bold text-2xl">Profile</h1>
            <p className="">Datos del usuario</p>
          </header>
          <label htmlFor="email">
            <span className="block text-gray-700 text-sm mb-1">Email</span>
            <input disabled autoFocus required className="
            bg-gray-900
            border-2 border-gray-800
             p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" type="email" name="email" id="email"
             defaultValue={auth.user.email}
            />
          </label>
          <label htmlFor="name">
            <span className=" block text-gray-700 text-sm mb-1">Name</span>
            <input
              required
              className="
              bg-gray-900
              border-2 border-gray-800 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              type="text"
              name="name"
              id="name"
              defaultValue={auth.user.name}
            />
          </label>

 <button onClick={logout} className="text-white font-bold rounded-md px-4 py-2 
           hover:bg-white/10
          ">
            Logout
          </button>
</div>
</div>
    </div>
  )
}