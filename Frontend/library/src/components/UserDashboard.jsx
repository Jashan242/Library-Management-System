import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserDashboard() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Fetch Books from Backend
  useEffect(() => {
    fetch("http://localhost:3030/books/all")
      .then((res) => res.json())
      .then((data) => setBooks(Array.isArray(data) ? data : [])) // Ensure data is an array
      .catch((error) => {
        console.error("Error fetching books:", error);
        setBooks([]);
      });
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-500 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-lg p-6">
        {/* Navigation Links */}
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <div className="flex space-x-6">
            <Link to="#" className="text-blue-600 hover:underline font-semibold">Reports</Link>
            <Link to="#" className="text-blue-600 hover:underline font-semibold">Transactions</Link>
            <Link to="/search-book" className="text-blue-600 hover:underline font-semibold">Book Availability</Link>
          </div>
          <button onClick={handleLogout} className="text-red-500 font-semibold hover:underline">
            🚪 Logout
          </button>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">User Dashboard</h1>

        {/* Book List Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">📚 Available Books</h2>
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-blue-200 text-gray-700">
                <th className="border px-4 py-2">Code No From</th>
                <th className="border px-4 py-2">Code No To</th>
                <th className="border px-4 py-2">Category</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">{book.codeNoFrom}</td>
                    <td className="border px-4 py-2 text-center">{book.codeNoTo}</td>
                    <td className="border px-4 py-2 text-center">{book.category}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">No books available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Logout Button at Bottom */}
        <div className="mt-6 text-center">
          <button onClick={handleLogout} className="text-red-600 font-semibold hover:underline">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
