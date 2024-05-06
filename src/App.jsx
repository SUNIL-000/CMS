import { Toaster } from "react-hot-toast";
import "./App.css";
import Nav from "./components/Nav";
import CriminalRecord from "./pages/CriminalRecord";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllCriminalrecord from "./pages/AllCriminalrecord";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Editrecord from "./pages/Editrecord";
import AdminRecord from "./pages/AdminRecord";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useEffect, useState } from "react";

function App() {
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
  // const name = JSON.parse(localStorage.getItem("login"));
  // const role = JSON.parse(localStorage.getItem("role"));

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            path="/login"
            element={auth?.name ? <Navigate to={"/"} /> : <Login />}
          />

          <Route
            path="/"
            element={
              <ProtectedRoutes isAuthenticate={auth?.name ? true : false}>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/signup"
            element={auth?.name ? <Navigate to={"/"} /> : <Signup />}
          />
          <Route
            path="/add"
            element={
              <ProtectedRoutes isAuthenticate={auth?.name ? true : false}>
                <CriminalRecord />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/show-admin"
            element={
              <ProtectedRoutes
                isAuthenticate={auth?.name ? true : false}
                // isAdmin={auth?.role == "admin" ? true : false}
              >
                <AdminRecord />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/show-record"
            element={
              <ProtectedRoutes isAuthenticate={auth?.name ? true : false}>
                <AllCriminalrecord />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/edit-record/:id"
            element={
              <ProtectedRoutes isAuthenticate={auth?.name ? true : false}>
                <Editrecord />
              </ProtectedRoutes>
            }
          />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
