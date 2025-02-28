import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SearchBookAvailability({ userType }) {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useState({ title: "", author: "" });

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const query = new URLSearchParams(searchParams).toString();
      const response = await fetch(`http://localhost:3030/books/available?${query}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-purple-500 p-6">

      {/* Search Section */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">📖 Book Availability</h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="title"
            placeholder="Enter Book Name"
            value={searchParams.title}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="author"
            placeholder="Enter Author"
            value={searchParams.author}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300"
        >
          🔍 Check Availability
        </button>
      </div>

      {/* Book List Table */}
      {books.length > 0 && (
        <div className="w-full max-w-4xl mt-6 overflow-x-auto bg-white shadow-md rounded-lg p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="border px-4 py-2">📚 Book Name</th>
                <th className="border px-4 py-2">✍️ Author</th>
                <th className="border px-4 py-2">🔢 Serial No.</th>
                <th className="border px-4 py-2">✅ Available</th>
                <th className="border px-4 py-2">📌 Select</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.serialNumber} className="hover:bg-gray-100 transition-all duration-200">
                  <td className="border px-4 py-2">{book.title}</td>
                  <td className="border px-4 py-2">{book.author}</td>
                  <td className="border px-4 py-2">{book.serialNumber}</td>
                  <td className="border px-4 py-2">{book.isAvailable ? "✅ Yes" : "❌ No"}</td>
                  <td className="border px-4 py-2 text-center">
                    {book.isAvailable && <input type="radio" name="selectedBook" className="w-5 h-5" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SearchBookAvailability;
