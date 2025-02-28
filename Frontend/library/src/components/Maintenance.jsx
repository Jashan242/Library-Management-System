import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Maintenance = () => {
  const navigate = useNavigate();

  const maintenanceOptions = [
    { name: "Add Membership", path: "/addMember" },
    { name: "Update Membership", path: "/membership/update" },
    { name: "Add Books/Movies", path: "/books-movies/add" },
    { name: "Update Books/Movies", path: "/books-movies/update" },
    { name: "Add User", path: "/user/add" },
    { name: "Update User", path: "/user/update" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-purple-500 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Housekeeping</h1>

        {/* Maintenance Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {maintenanceOptions.map((option, index) => (
            <Link
              key={index}
              to={option.path}
              className="bg-orange-100 hover:bg-orange-200 text-orange-700 font-semibold p-4 rounded-lg shadow-md text-center cursor-pointer transition-all duration-300"
            >
              {option.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
          >
            Back
          </button>

          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
