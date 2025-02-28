import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Transactions = () => {
  const navigate = useNavigate();

  const transactionOptions = [
    { name: "Is Book Available?", path: "/transactions/check-availability" },
    { name: "Issue Book", path: "/transactions/issue-book" },
    { name: "Return Book", path: "/transactions/return-book" },
    { name: "Pay Fine", path: "/transactions/pay-fine" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-purple-500 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">🔄 Library Transactions</h1>

        {/* Transactions List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {transactionOptions.map((option, index) => (
            <Link
              key={index}
              to={option.path}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold p-4 rounded-lg shadow-md text-center cursor-pointer transition-all duration-300"
            >
              {option.name}
            </Link>
          ))}
        </div>

        {/* Buttons Section */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
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

export default Transactions;
