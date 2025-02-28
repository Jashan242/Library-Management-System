import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BookIssue() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    bookId: "",
    author: "",
    issueDate: new Date().toISOString().split("T")[0],
    returnDate: "",
    remarks: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`http://localhost:3030/books/available`, {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date();
    const maxReturnDate = new Date();
    maxReturnDate.setDate(today.getDate() + 15);
    const selectedReturnDate = new Date(formData.returnDate);

    if (selectedReturnDate > maxReturnDate) {
      alert("Return date cannot exceed 15 days from issue date.");
      return;
    }

    const response = await fetch("http://localhost:3030/books/issue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Book issued successfully!");
      setFormData({ bookId: "", author: "", returnDate: "", remarks: "" });
    } else {
      alert("Failed to issue book");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-purple-500 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">📚 Issue a Book</h1>

        {/* Issue Book Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Enter Book Name</label>
            <select
              name="bookId"
              value={formData.bookId}
              onChange={handleChange}
              className="p-3 border rounded w-full"
              required
            >
              <option value="">Select a Book</option>
              {books.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Enter Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="p-3 border rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Issue Date</label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              className="p-3 border rounded w-full bg-gray-200"
              readOnly
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Return Date</label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className="p-3 border rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Remarks (Optional)</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="p-3 border rounded w-full"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
            >
              Back
            </button>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
            >
              Issue Book
            </button>
          </div>
        </form>

        
      </div>
    </div>
  );
}

export default BookIssue;
