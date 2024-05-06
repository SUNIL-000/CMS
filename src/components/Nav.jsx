import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Nav = () => {
  const [auth, setAuth] = useState({
    name: null,
    role: "",
  });
  useEffect(() => {
    const parseName = JSON.parse(localStorage.getItem("name"));
    const parseRole = JSON.parse(localStorage.getItem("role"));

    if (parseName) {
      // console.log(parseData)
      setAuth({
        ...auth,
        name: parseName,
        role: parseRole,
      });
    }
  }, []);
  console.log(auth);
  const handleLogout = () => {
    try {
      localStorage.clear();
      window.location.reload();
      // useEffect(()=>{},[])
    } catch (error) {}
  };
  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-2 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        {}
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <Link aria-current="page" className="flex items-center" to="/">
              <img className="h-7 w-auto" src="/cms.jpg" alt="navimaage" />
              <p className="sr-only">Home</p>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            <Link
              aria-current="page"
              className="inline-block rounded-lg px-2 py-1 text-sm font-bold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              to=""
            >
              Home
            </Link>
            <Link
              className="inline-block rounded-lg px-2 py-1 text-md font-bold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              to="#"
            >
              Contact us
            </Link>
          </div>
          {auth?.name ? (
            <span className=" text-xl flex justify-center items-center gap-2 text-gray-500 capitalize font-bold">
              {" "}
              <FaUser />
              {auth?.name}
              <button
                onClick={handleLogout}
                className="px-4 py-2 min-w-[120px] text-center text-white 
               bg-gray-600 border border-gray-600 rounded-full active:text-gray-500 hover:bg-transparent hover:text-gray-600 "
              >
                Logout
              </button>
            </span>
          ) : (
            <div className="flex items-center justify-end gap-3">
              <Link
                className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded-full active:text-violet-500 hover:bg-transparent hover:text-violet-600 "
                to="/signup"
              >
                Sign up
              </Link>
              <Link
                className="px-6 py-2 min-w-[120px] text-center text-violet-600 border border-violet-600 rounded-full hover:bg-violet-600 hover:text-white active:bg-indigo-500 "
                to="/login"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Nav;
