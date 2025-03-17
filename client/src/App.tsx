import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./components/authetication/SignIn";
import SignUp from "./components/authetication/SignUp";
import "antd/dist/reset.css"; 
import Home from "./components/Home/Home";
import { PrivateRoute } from "./routes/PrivateRoute";


import { useSelector } from "react-redux";
import { RootState } from "./redux/Store";
import Profile from "./components/profile/Profile";

function App() {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/home" : "/sign-in"} replace />} />
        <Route path="/sign-in" element={user ? <Navigate to="/home" replace /> : <SignIn />} />
        <Route path="/sign-up" element={user ? <Navigate to="/home" replace /> : <SignUp />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
