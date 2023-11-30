import {  CredentialsLogin, CredentialsRegister } from "../interfaces/Auth";
import { User } from '../interfaces/user.interface';
import { apiManager } from "./api.config";


export const loginRequest = async(credentials:CredentialsLogin)=>{
   return await apiManager.post("/login",credentials);
}
export const registerRequest = async(credentials:CredentialsRegister)=>{
    return await apiManager.post("/register",credentials);
}

export const veriryTokenRequest = async()=> await apiManager.get<User>("/verify");
