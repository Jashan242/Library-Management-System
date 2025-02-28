import React, { useEffect, useState } from "react";

const MasterList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/books/all")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-purple-300 p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-5xl">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          📚 Master List of Books
        </h2>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead className="bg-blue-600 text-white sticky top-0">
              <tr>
                <th className="py-3 px-4 border">Serial No</th>
                <th className="py-3 px-4 border">Title</th>
                <th className="py-3 px-4 border">Author</th>
                <th className="py-3 px-4 border">Category</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Cost</th>
                <th className="py-3 px-4 border">Procurement Date</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book, index) => (
                  <tr
                    key={book._id}
                    className={`text-center border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-all`}
                  >
                    <td className="py-3 px-4 border">{book.serialNumber}</td>
                    <td className="py-3 px-4 border">{book.title}</td>
                    <td className="py-3 px-4 border">{book.author}</td>
                    <td className="py-3 px-4 border">{book.category}</td>
                    <td className="py-3 px-4 border">
                      <span className={`px-3 py-1 rounded-md text-white font-semibold ${book.status === "Available" ? "bg-green-500" : "bg-red-500"}`}>
                        {book.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 border">₹{book.cost}</td>
                    <td className="py-3 px-4 border">
                      {new Date(book.procurementDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-6 text-gray-600 text-lg text-center">
                    No records found 📖
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => window.history.back()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
          >
            Back
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterList;
