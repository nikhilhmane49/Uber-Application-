import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Captainconetxtdata } from "../Context/Captaincontext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CaptainSignup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState(1);
  const [vehicleType, setVehicleType] = useState("car");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [status, setStatus] = useState("inactive");

  const { backend_url, token, setToken } = useContext(Captainconetxtdata);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newcaptain = {
      fullname: { firstname, lastname },
      email,
      password,
      status,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType,
      },
      location: {
        lat: latitude,
        log: longitude,
      },
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
        navigate("/");
      } else {
        toast.error("Failed to register user. Please try again!");
      }

      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setVehicleColor("");
      setVehiclePlate("");
      setVehicleCapacity(1);
      setVehicleType("car");
      setLatitude("");
      setLongitude("");
      setStatus("inactive");
    } catch (error) {
      console.error(
        "Error during signup:",
        error.response?.data || error.message
      );
      toast.error("An error occurred during signup. Please try again.");
    }
  };


    useEffect(() => {
      if (token) {
        console.log("token is thier");
        
      }
    }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col ">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center">
            <img
              className="w-28"
              src="https://www.svgrepo.com/show/505031/uber-driver.svg"
              alt="Logo"
            />
          </div>
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

      <div className="flex-grow flex items-center justify-center mt-16">
        <form
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          <h2 className="col-span-2 text-3xl font-bold text-center text-blue-500">
            Captain Signup
          </h2>

          {/* Full Name */}
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

          {/* Email and Password */}
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

          {/* Vehicle Details */}
          <div>
            <label className="block text-gray-700">Vehicle Color</label>
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700">Vehicle Plate</label>
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700">Vehicle Capacity</label>
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-gray-700">Vehicle Type</label>
            <select
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          

          {/* Status */}
          <div>
            <label className="block text-gray-700">Status</label>
            <select
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="inactive">Inactive</option>
              <option value="active">Active</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              type="submit"
            >
              Sign Up
            </button>

            <p className="text-center text-gray-600 mt-6  text-xl">
              Already have an account?{" "}
              <Link
                to="/captainlogin"
                className="text-blue-500 font-semibold hover:underline"
              >
                Login as Captain
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CaptainSignup;


