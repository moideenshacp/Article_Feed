import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../redux/Store";

const PrivateRoute = () => {
    const { user } = useSelector((state: RootState) => state.user);
  
    return user ? <Outlet /> : <Navigate to="/sign-in" replace />;
  };
  


export  {PrivateRoute};
