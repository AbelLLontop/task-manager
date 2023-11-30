import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/UserContext";

const ProtectedRouter = () => {
  const { isAuthenticated,loading } = useAuthContext();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if(loading) return (<div>Loading...</div>)
  if(!loading && !isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};
export default ProtectedRouter;
