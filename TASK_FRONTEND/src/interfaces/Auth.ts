export interface CredentialsLogin{
    email:string;
    password:string;
}
export interface CredentialsRegister extends CredentialsLogin{
    username:string;
}

export interface AuthResponse{
    token:string;
}