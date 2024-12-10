import React, { useState, useContext } from "react"; // Import useContext
import { Link } from "react-router-dom";
import { Captainconetxtdata } from "../Context/Captaincontext"; // Context data
import axios from "axios";
import { toast } from "react-toastify";

function CaptainSignup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Use useContext to access the context data
  const { backend_url, token, setToken } = useContext(Captainconetxtdata);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newcaptain = {
      fullname: { firstname, lastname },
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${backend_url}/api/captains/captain/register`,
        newcaptain
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        toast.success("User registered successfully!");
      } else {
        toast.error("Failed to register user. Please try again!");
      }

      console.log(response.data);
      // Reset form fields
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(
        "Error during signup:",
        error.response?.data || error.message
      );
    }
  };

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
            Captain Signup
          </h2>

          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

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
            Already have an account?{" "}
            <Link
              to="/captainlogin"
              className="text-blue-500 font-semibold hover:underline"
            >
              Login as Captain
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CaptainSignup;
