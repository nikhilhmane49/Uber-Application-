import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Captainconetxtdata } from "../Context/Captaincontext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Captainlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { backend_url, token, setToken } = useContext(Captainconetxtdata);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const logincaptain = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${backend_url}/api/captains/captain/login`,
        logincaptain
      );
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        toast.success("User Login successfully!");
        navigate("/");

      } else {
        toast.error("Failed to Login user. Please try again!");
      }
    } catch (error) {
      console.error(
        "Error during signup:",
        error.response?.data || error.message
      );
    }

    setEmail("");
    setPassword("");
  };

  // useEffect(() => {
  //   if (token) {
  //     navigate("/");
  //   }
  // }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center">
            <img
              className="w-28"
              src="https://www.svgrepo.com/show/505031/uber-driver.svg"
              alt="Logo"
            />
          </div>

          {/* Navigation Links */}
          <nav className="space-x-6">
            <Link
              to="/"
              className="text-lg font-semibold text-gray-700 hover:text-blue-500"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-lg font-semibold text-gray-700 hover:text-blue-500"
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Signup Form */}
      <div className="flex-grow flex items-center justify-center">
        <form
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center  text-blue-500">
            Captain Login
          </h2>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            type="submit"
          >
            Sign Up
          </button>
          <p className="text-center text-gray-600 mt-6">
            Create an account?{" "}
            <Link
              to="/captainsignup"
              className="text-blue-500 font-semibold hover:underline"
            >
              Create as Captain
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Captainlogin;
