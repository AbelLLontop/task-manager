import { Navigate, Outlet, RouteObject } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import ProfilePage from "./pages/profile/Profile";
import { Suspense, lazy } from "react";
import MyListTask from "./pages/tasks/MyListTask";
import NewTaskPage from "./pages/tasks/newTask";
import UserProvider from "./context/UserContext";

const ListTaskPage = lazy(()=>import("./pages/tasks/ListTask"))
const PrivateLayout = lazy(()=>import("./pages/layout/PrivateLayout"))

const AuthGuard = () => {
  console.log("ENTRO A AUTH GUARD");
  const auth = localStorage.getItem("auth");
  if (auth) {
    return <UserProvider>
      <Outlet />
    </UserProvider>
    
    ;
  } else {
    return <Navigate to="/login" />;
  }
};

const PublicGuard = () => {
  const auth = localStorage.getItem("auth");
  if (!auth) {
    return <Outlet />;
  } else {
    return <Navigate to="/tasks"/>;
  }
};

const NotFoundRoutes: RouteObject = {
  path: "*",
  element: <h1>Not Found</h1>,
};

const TaskRoutes: RouteObject = {
  path: "tasks",
  children: [
    {
      index: true,
      element: <Navigate to={"list"} />,
    },
    {
      path: "list",
      element: <Suspense fallback={<div>CARGANDOO ELEMENTO....</div>}><ListTaskPage /></Suspense>,
    },
    {
      path:"my-list",
      element:<MyListTask/>
    }
    ,
    {
      path:"create",
      element:<NewTaskPage/>
    }
  ],
};

const UserRouter: RouteObject = {
  path: "user",
  children: [
    {
      index: true,
      element: <Navigate to={"profile"} />,
    },
    {
      path: "profile",
      element: <ProfilePage />,
    },
  ],
};

const PrivateRoutes: RouteObject = {
  path: "/",
  element:<AuthGuard/>,
  children: [
    {
      element: <Suspense fallback={<div>CARGANDOO PAGINA....</div>}><PrivateLayout /></Suspense>,
      // element: <PrivateTemplate/>,
      children: [TaskRoutes, UserRouter],
    },
  ],
};

const PublicRoutes: RouteObject = {
  path: "/",
  element: <PublicGuard />,
  children: [
    {
      index: true,
      element: <LoginPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ],
};

const AppRoutes: RouteObject[] = [NotFoundRoutes, PublicRoutes, PrivateRoutes];

export default AppRoutes;
