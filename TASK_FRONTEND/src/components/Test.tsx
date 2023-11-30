import { useEffect, useState } from "react"
import AuthService from "../services/AuthService";

const Test = () => {
    const [token,setToken] = useState("");
    const fetchToken = async ()=>{
        const {data} = await AuthService.login({
            email:"admin@gmail.com",
            password:"admin"
        });
        setToken(data.token);
    }
    useEffect(()=>{
        try{
            fetchToken();
        }catch(e){
            console.log(e);

        }
    },[])
  return (
    <div>Test

        <h1 className="text-4xl">{token}</h1>
    </div>
  )
}
export default Test