import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContest";

const initialAuth = {
  token:"",
  user:{
    _id:"",
    name:"",
    email:"",
  }
}

export default function ProfilePage() {
  const {changeImage,user} = useUserContext();
  const navigate = useNavigate();
  const [auth,setAuth] = useState(initialAuth)
  const refFile = useRef<HTMLInputElement>(null);

  const handleFile = async (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0];
    if(!file) return;
    changeImage("",file);
    // const formData = new FormData();
    // formData.append("file",file);
    // const res = await fetch("http://localhost:3001/upload",{
    //   method:"POST",
    //   body:formData
    // })
    // const data = await res.json();
    // console.log(data);


  }

  useEffect(()=>{
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
          <div>
            <input onChange={handleFile} ref={refFile} type="file" className="
            absolute
            opacity-0
            cursor-pointer
            h-0
            w-0
            
            " />
            <div 
            onClick={()=>refFile.current?.click()}
            className="cursor-pointer w-28 h-28 rounded-full  mx-auto
            bg-gray-800
            after:bg-gray-900/50
            after:rounded-full
            hover:after:opacity-100
            after:opacity-0
            after:content-['Edit']
            after:w-full
            after:h-full
            after:flex
            after:justify-center
            after:items-center
            after:z-10
            after:absolute
            after:top-0
            after:left-0
            relative
            ">
              {user.image&&(
                <img className="w-full h-full rounded-full object-cover absolute left-0 top-0" src={user.image} alt="" />
              )}
           </div>
           {user.image&&(
           <button className=" 
           w-full
           mt-4
           bg-blue-600 p-2 px-4 rounded cursor-pointer
         hover:outline-blue-600
         outline-none">
              Save
           </button>
           )}
            

          </div>
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