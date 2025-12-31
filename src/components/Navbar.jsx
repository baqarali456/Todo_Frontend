import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authLogout } from "../store/authSlice";

function Navbar() {
  const authStatus = useSelector((state) => state.authStatus);
  const dispatch = useDispatch();

  const navItems = [
    {
      path: "/",
      name: "Home",
      show: true,
    },
    {
      path: "/login",
      name: "Login",
      show: !authStatus,
    },
    {
      path: "/SignUp",
      name: "SignUp",
      show: !authStatus,
    },
    {
      path: "/addTodo",
      name: "AddTodo",
      show: authStatus,
    },
  ];

  const handleLogout = async () => {
    try {
      await axios.post(
        `https://todobackend-p71y.onrender.com/api/v1/users/logout-user`,
        '',
        {
          withCredentials: true,
        }
      );
      dispatch(authLogout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <nav className="flex items-center bg-green-500 text-white justify-between p-4">
        <h1 className=" text-2xl font-bold ">Todo</h1>
        <ul className=" flex items-center gap-5">
          {
          navItems.map(
            (item) =>
              item.show && (
                <li
                  key={item.name}
                  className=" rounded px-2 py-2 hover:bg-orange-400"
                >
                  <Link to={item.path}>{item.name}</Link>
                </li>
              )
          )}
          {authStatus && (
            <li className=" rounded px-2 py-2 hover:bg-orange-400">
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
