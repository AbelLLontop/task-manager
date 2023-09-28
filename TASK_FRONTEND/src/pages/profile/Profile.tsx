import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem("auth");
    navigate("/login",{
      replace:true
    })
  }
  return (
    <div>ProfilePage
 <button onClick={logout} className="text-white font-bold rounded-md px-4 py-2 
           hover:bg-white/10
          ">
            Logout
          </button>

    </div>
  )
}