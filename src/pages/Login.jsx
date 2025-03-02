import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { baseBackendUrl } from "../assets/connect";

const Login = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  // const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userid || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    const { data } = await axios.post(
      `${baseBackendUrl}/api/v1/user/login`,
      {
        userid,
        password,
      }
    );

    if (data?.success) {
      // console.log(data);
      localStorage.setItem("name", JSON.stringify(data?.euser?.name));
      localStorage.setItem("role", JSON.stringify(data?.euser?.role));
      
      toast.success(data?.message);
      window.location.reload();

      navigate("/");
    } else {
      toast.error(data?.message);
    }

  };

  return (
    <>
      <div className="block md:flex justify-center  items-center  gap-4">
        <div className="order-2">
          <img src="/login2.svg" alt="image" height={350} width={350} />
        </div>
        <div className="min-h-screen flex items-center justify-center ">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl uppercase drop-shadow-xl font-extrabold text-gray-900">
                Log in
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Welcome back!
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input
                type="number"
                required={true}
                id="number"
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="User ID"
                value={userid}
                onChange={(e) => setUserid(e.target.value)}
              />
              <input
                type="password"
                id="password"
                required={true}
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && (
                <p className="text-red-500 text-center">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Log in
              </button>
              <p>
                Not yet registered ?{" "}
                <Link
                  to={"/signup"}
                  className={` text-purple-600 disabled text-md font-bold `}
                >
                  Signup
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
