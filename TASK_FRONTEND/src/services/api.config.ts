import axios from "axios";
const DOMAIN = import.meta.env.VITE_API_URL as string;

export const apiManager = axios.create({
    baseURL: DOMAIN,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials:true
})



// type MessageByCode<T> = {
//     [key:string]:T
// }

// const getValidateErrorsCode = (code:string)=>{
//     const messagesByCode:MessageByCode<string> = {
//         ERR_BAD_REQUEST: 'Error en la petición',
//         ERR_NETWORK: 'Error de red',
//     }
//     return messagesByCode[code] || 'Error desconocido'
// }


// apiManager.interceptors.request.use((request)=>{
//     console.log("REQUEST",request)
//     if(request.url?.includes("login"))return request;
//     return request;
// });

// apiManager.interceptors.response.use((response:AxiosResponse)=>{
//     console.log("RESPONSE",response)
//     return response;
// },
// (error:AxiosError)=>{
//     console.log('error:',getValidateErrorsCode(error.code||'UNDEFINED'));
//     return Promise.reject(error);

// }
// )