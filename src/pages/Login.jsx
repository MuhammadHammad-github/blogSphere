import { LoginOutlined } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useLoginUser from "../hooks/highLevelHooks/accounts/user/useLoginUser";

const Login = () => {
  const navigate = useNavigate();
  const { login, fetchedData, fetching } = useLoginUser();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      await login(data);
      fetchedData.success && navigate("/");

      e.target.reset();
    } catch (error) {
      console.log(error.message);
      console.error(error);
    }
  };
  return (
    <div className="my-20 respPx20">
      <div className="900px:w-[50%] 750px:w-[60%] 650px:w-[70%] 550px:w-[80%] 450px:w-[90%] w-full border border-borderColor p-10 450px:px-10 px-5 mx-auto">
        <h1 className="font-[400] text-center text-5xl">Login</h1>
        <p className="text-lg text-center my-5">
          Don't Have an account?{" "}
          <a
            href="#"
            onClick={() => navigate("/register")}
            className="text-sage"
          >
            Create a free account
          </a>
        </p>
        <form onSubmit={handleSubmit} className="mt-20">
          <div className="flex flex-col gap-3">
            <label htmlFor="email">Enter email</label>
            <input
              type="email"
              id="email"
              className="py-3 px-3 outline-none border  focus:border-sand transitional"
              placeholder="Enter email"
              name="email"
              required
            />
          </div>
          <div className="flex my-7 flex-col gap-3">
            <div className="flex justify-between">
              <label htmlFor="password">Enter Password</label>
            </div>
            <input
              type="password"
              id="password"
              className="py-3 px-3 outline-none border border-borderColor focus:border-sand transitional"
              placeholder="Enter Password"
              name="password"
              required
            />
          </div>
          <button disabled={fetching} className="btn btn1Alt">
            {fetching ? (
              "Submitting..."
            ) : (
              <>
                <LoginOutlined /> Login
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
