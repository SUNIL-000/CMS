import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { baseBackendUrl } from "../assets/connect";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setFormErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validate = () => {
    const { name, email, password, confirmPassword } = formData;
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;

    if (!name.trim()) errors.name = "Name is required.";
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be at least 6 characters, include an uppercase letter, number, and special character.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const { name, email, password } = formData;

      const { data } = await axios.post(`${baseBackendUrl}/api/v1/user/signup`, {
        name,
        email,
        password,
        role: "user",
      });

      if (data?.success) {
        toast.success(`✅ Registered Successfully!\n🆔 Your User ID: ${data.userid}`);
        alert(`🎉 Note this down!\nYour User ID: ${data.userid}`);
        navigate("/login");
      } else {
        toast.error(data?.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="block md:flex justify-center items-center gap-4">
      <div className="order-2 md:order-2">
        <img src="/signup.svg" alt="signup" height={70} width={450} />
      </div>

      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-6">
          <h2 className="mt-0 text-center text-3xl font-extrabold uppercase text-gray-700">
            Sign Up
          </h2>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full rounded-md border py-3 px-4 ${
                  formErrors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-md border py-3 px-4 ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full rounded-md border py-3 px-4 ${
                  formErrors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
            </div>

            <div>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full rounded-md border py-3 px-4 ${
                  formErrors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.confirmPassword && (
                <p className="text-red-500">{formErrors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign Up
            </button>

            <p className="text-center">
              Already registered?{" "}
              <Link to="/login" className="text-purple-600 font-bold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
