import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserReports = () => {
  const [showBooks, setShowBooks] = useState(false);
  const navigate = useNavigate();

  // Static Book Data
  const books = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", issueDate: "2024-01-15", returnDate: "2024-02-15" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", issueDate: "2024-02-01", returnDate: "2024-03-01" },
    { title: "1984", author: "George Orwell", issueDate: "2024-01-20", returnDate: "2024-02-20" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-200 to-blue-300 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 text-center">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 User Reports</h2>

        {/* Buttons for Actions */}
        {!showBooks ? (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setShowBooks(true)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg"
            >
              📚 View My Books
            </button>
            <button
              onClick={() => navigate("/payFine")}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg"
            >
              💰 Pay Fine
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg"
            >
              🔙 Back
            </button>
          </div>
        ) : (
          <div>
            {/* My Books Section */}
            <h3 className="text-xl font-semibold text-gray-700 mb-4">📖 My Books</h3>
            <table className="w-full border-collapse border border-gray-300 shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">Book Name</th>
                  <th className="border px-4 py-2">Author</th>
                  <th className="border px-4 py-2">Issue Date</th>
                  <th className="border px-4 py-2">Return Date</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{book.title}</td>
                    <td className="border px-4 py-2">{book.author}</td>
                    <td className="border px-4 py-2">{book.issueDate}</td>
                    <td className="border px-4 py-2">{book.returnDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Back Button */}
            <button
              onClick={() => setShowBooks(false)}
              className="mt-6 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReports;
