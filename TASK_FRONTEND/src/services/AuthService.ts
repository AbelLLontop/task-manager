const API_URL = import.meta.env.VITE_API_URL

type Credentials = {
    email:string
    password:string
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