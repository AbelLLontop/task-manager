import { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  registerRequest,
  veriryTokenRequest,
} from "../services/AuthService";
import { CredentialsLogin, CredentialsRegister } from "../interfaces/Auth";
import Cookies from "js-cookie";
import { User } from "../interfaces/user.interface";
export const AuthContext = createContext<{
  signup: (credentials: CredentialsRegister) => void;
  signin: (credentials: CredentialsLogin) => void;
  logout:()=>void;
  user: User;
  isAuthenticated: boolean;
  errors: string[];
  loading: boolean;
}>({
  signup: () => {
    ("");
  },
  signin: () => {
    ("");
  },
  logout: () => {("")},
  user: {
    id: "",
    username: "",
    email: "",
    createAt:"",
    updateAt:"",
  },
  isAuthenticated: false,
  errors: [],
  loading: true,
});
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

const EmptyUser: User = {
  id: "",
  username: "",
  email: "",
  createAt:"",
  updateAt:"",
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(EmptyUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);
  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(EmptyUser);
      }
      try {
        const res = await veriryTokenRequest();
        if (!res.data) {
          setLoading(false);
          setIsAuthenticated(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        setIsAuthenticated(false);
        setUser(EmptyUser);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);
  const signup = async (credentials: CredentialsRegister) => {
    try {
      const res = await registerRequest(credentials as CredentialsRegister);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error: unknown) {
      const errorAxios = error as { response: { data: string[] } };
      setErrors(errorAxios.response.data);
      setIsAuthenticated(false);
    }
  };

  const signin = async (credentials: CredentialsLogin) => {
    try {
      const res = await loginRequest(credentials as CredentialsLogin);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error: unknown) {
      const errorAxios = error as { response: { data: string[] } };
      setErrors(errorAxios.response.data);
      setIsAuthenticated(false);
    }
  };
  const logout = ()=>{
    Cookies.remove("token");
    setUser(EmptyUser);
    setIsAuthenticated(false);
  }
  return (
    <AuthContext.Provider
      value={{ signup, user, isAuthenticated, errors, signin, loading,logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
