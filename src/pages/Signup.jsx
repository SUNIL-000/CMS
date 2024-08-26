import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const navigate =useNavigate();
  const [email, setEmail] = useState("");
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !name ||
        !email ||
        !userid ||
        !password ||
        password != confirmPassword
      ) {
        setErrorMessage(
          "Please fill in all fields and ensure passwords match."
        );
        return;
      }

      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/signup",
        {
          name,
          userid,
          email,
          password,
          role: "user",
        }
      );

      if(data?.success){
        toast.success(data?.message)
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <div className="block md:flex justify-center  items-center  gap-4">
    <div className="order-2 md:order-2">
      <img src="/signup.svg" alt="image" height={70} width={450}/>
    </div>
    <div className="min-h-screen flex items-center  justify-center ">
      <div className="max-w-md w-full space-y-6">
        <div>
          <h2 className="mt-0 drop-shadow-2xl text-center text-3xl font-extrabold uppercase text-gray-700">
            Sign Up
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            id="email"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            id="userid"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="User ID"
            value={userid}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="password"
            id="password"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            id="confirmPassword"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
          <p>Already registerd ? <Link to={"/login"} className="text-purple-600 text-md font-bold">Login</Link></p>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Signup;
