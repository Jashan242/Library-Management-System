import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Fetch Books from Backend
  useEffect(() => {
    fetch("http://localhost:3030/books/all", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setBooks(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Error fetching books:", error);
        setBooks([]);
      });
  }, []);

  // Handle Delete Book
  const handleDeleteBook = async (id) => {
    const response = await fetch(`http://localhost:3030/books/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      credentials: "include",
    });

    if (response.ok) {
      setBooks(books.filter((book) => book._id !== id));
    } else {
      console.error("Failed to delete book");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center bg-gradient-to-br from-blue-200 to-purple-500">
      <div className="container mx-auto bg-white shadow-xl rounded-lg p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <Link to="/maintenance" className="text-blue-600 hover:underline font-semibold">
            Maintenance
          </Link>
          <Link to="/report" className="text-blue-600 hover:underline font-semibold">
            Reports
          </Link>
          <Link to="/transaction" className="text-blue-600 hover:underline font-semibold">
            Transactions
          </Link>
        </div>

        {/* Book List Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">📚 Books List</h2>
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-blue-100">
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Author</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Serial Number</th>
                <th className="border px-4 py-2">Code No From</th>
                <th className="border px-4 py-2">Code No To</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{book.title}</td>
                  <td className="border px-4 py-2">{book.author}</td>
                  <td className="border px-4 py-2">{book.category}</td>
                  <td className="border px-4 py-2">{book.serialNumber}</td>
                  <td className="border px-4 py-2">{book.codeNoFrom}</td>
                  <td className="border px-4 py-2">{book.codeNoTo}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDeleteBook(book._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
