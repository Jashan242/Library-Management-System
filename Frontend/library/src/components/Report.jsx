import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Reports = () => {
  const navigate = useNavigate(); // Hook for navigation

  const reports = [
    { name: "Master List of Books", path: "/master-list" },
    { name: "Master List of Movies", path: "/reports/movies" },
    { name: "Master List of Memberships", path: "/member-list" },
    { name: "Active Issues", path: "/reports/active-issues" },
    { name: "Overdue Returns", path: "/reports/overdue-returns" },
    { name: "Pending Issue Requests", path: "/reports/pending-requests" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-purple-500 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">📊 Available Reports</h1>

        {/* Reports List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report, index) => (
            <Link
              key={index}
              to={report.path}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold p-4 rounded-lg shadow-md text-center cursor-pointer transition-all duration-300"
            >
              {report.name}
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

          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
