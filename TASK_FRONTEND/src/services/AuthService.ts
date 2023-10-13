const API_URL = import.meta.env.VITE_API_URL

type Credentials = {
    email:string
    password:string
}
type CredentialsRegister = {
    email:string
    password:string
    name:string
}
export const login = async(credentials:Credentials)=>{
    const response = await fetch(`${API_URL}/user/login`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(credentials)
    })
    const data = await response.json()
    return data
}

export const register = async(credentials:CredentialsRegister)=>{
    const response = await fetch(`${API_URL}/user/register`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(credentials)
    })
    const data = await response.json();
    return data;
}