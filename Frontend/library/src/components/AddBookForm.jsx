import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBookForm = ({ setBooks, books }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    type: "book",
    serialNumber: "",
    codeNoFrom: "",
    codeNoTo: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Add Book
  const handleAddBook = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3030/books/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const newBook = await response.json();
      setBooks([...books, newBook.book]);
      setFormData({
        title: "",
        author: "",
        category: "",
        type: "book",
        serialNumber: "",
        codeNoFrom: "",
        codeNoTo: "",
      });
    } else {
      console.error("Failed to add book");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-300 to-purple-500 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">📚 Add New Book</h2>

        <form onSubmit={handleAddBook} className="space-y-4">
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="input-field" required />
          <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} className="input-field" required />
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="input-field" required />
          
          <select name="type" value={formData.type} onChange={handleChange} className="input-field">
            <option value="book">📖 Book</option>
            <option value="movie">🎥 Movie</option>
          </select>

          <input type="text" name="serialNumber" placeholder="Serial Number" value={formData.serialNumber} onChange={handleChange} className="input-field" required />
          <input type="text" name="codeNoFrom" placeholder="Code No From" value={formData.codeNoFrom} onChange={handleChange} className="input-field" required />
          <input type="text" name="codeNoTo" placeholder="Code No To" value={formData.codeNoTo} onChange={handleChange} className="input-field" required />

          <div className="flex justify-between">
            <button type="button" onClick={() => navigate(-1)} className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300">
              Back
            </button>

            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300">
               Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
