import { Create, Login, Logout, NoteAdd } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useGetAdmin from "../hooks/highLevelHooks/accounts/admin/useGetAdmin";

const Header = () => {
  const navigate = useNavigate();
  const { adminData } = useGetAdmin(localStorage.getItem("authTokenAdmin"));
  const logoutAsAdmin = () => {
    localStorage.removeItem("authTokenAdmin");
    navigate("/");
  };
  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };
  return (
    <header className="p-10 bg-charcoal text-white">
      <div className="flex 700px:flex-row items-center flex-col gap-y-5 w-full justify-between">
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer text-2xl font-bold"
        >
          BlogSphere
        </h1>
        <div className="flex 550px:flex-row flex-col  items-center gap-2">
          {!localStorage?.getItem("authToken") ? (
            <>
              <a
                href="#"
                onClick={() => navigate("/register")}
                className="  btn btn1"
              >
                <Login className="mr-2" />
                Signup
              </a>
              <a
                href="#"
                onClick={() => navigate("/login")}
                className="  btn btn1"
              >
                <Login className="mr-2" />
                Login
              </a>{" "}
            </>
          ) : (
            <button className="btn btn1" onClick={logout}>
              <Logout /> <span className=""> Logout</span>
            </button>
          )}
          {!localStorage?.getItem("authTokenAdmin") ? (
            <a
              href="#"
              onClick={() => navigate("/adminLogin")}
              className="  btn btn2 mx-5"
            >
              <Login className="mr-2" />
              Login As Admin
            </a>
          ) : (
            <>
              <button className="btn btn1" onClick={logoutAsAdmin}>
                <Logout /> <span className=""> Logout</span> As Admin
              </button>
              <button
                onClick={() => navigate("/createBlog")}
                className="btn btn2"
              >
                <Create className="mr-1" />
                <span className=""> Create Blog</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
