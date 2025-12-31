import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { authLogin, authLogout } from "./store/authSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://todobackend-p71y.onrender.com/api/v1/users/get-user", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data) {
          dispatch(authLogin(response.data.data.user));
        } else {
          dispatch(authLogout());
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <div className=" min-h-screen  flex items-center justify-center ">
        {!loading ? (
          <Outlet />
        ) : (
          <h1 className=" text-center text-red-600">Loading ...</h1>
        )}
      </div>
    </>
  );
}

export default App;
