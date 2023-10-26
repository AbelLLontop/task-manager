import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface User {
  image: string;
  name:string;
  email:string; 

}
const initialUser = {
  image: "",
  name:"",
  email:"",
}
interface IUserContext{
  user: User;
  changeImage: (image: string, file: File) => void;
}

export const UserContext = createContext<IUserContext>({
  user: initialUser,
  changeImage: () => {""},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user,setUser] = useState<User>(initialUser)
  const navigate = useNavigate();


  useEffect(() => {
    fetch("http://localhost:3000/perfile.png")
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setUser((prev)=>({...prev,image:url}));
      });
  }, []);
  useEffect(()=>{
    const authLocalStorage = localStorage.getItem("auth")
    if(authLocalStorage){
      let authObject;
      try{
        authObject = JSON.parse(authLocalStorage)
      }catch(error){
        authObject = {};
      }
      const userObject:User = authObject.user;
      if(userObject){
        setUser((prev)=>({...prev,
        email:userObject.email,
        name:userObject.name
        }))
      }else{
        navigate("/login",{replace:true});
      }
    }else{
      navigate("/login",{replace:true});
    }

  },[navigate])

  const changeImage = (image: string, file: File) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);
      setUser((prev)=>({...prev,image:imageUrl}));
    } else {
      setUser((prev)=>({...prev,image:image}));
    }
  };
  return (
    <UserContext.Provider value={{ user, changeImage }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
