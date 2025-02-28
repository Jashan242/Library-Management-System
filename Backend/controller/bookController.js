const Book = require("../models/book");
const BookIssue = require("../models/bookIssue");

// ✅ Search Available Books
const searchAvailableBooks = async (req, res) => {
    try {
        const { title, author, category, serialNumber } = req.query;
        let query = { isAvailable: true, status: "Available" };

        if (title) query.title = new RegExp(title, "i");
        if (author) query.author = new RegExp(author, "i");
        if (category) query.category = category;
        if (serialNumber) query.serialNumber = serialNumber;

        const books = await Book.find(query);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Issue Book
const issueBook = async (req, res) => {
    try {
        const { bookId, returnDate, remarks } = req.body;
        const userId = req.user.id;

        // Validate return date (not more than 15 days)
        const maxReturnDate = new Date();
        maxReturnDate.setDate(maxReturnDate.getDate() + 15);

        if (new Date(returnDate) > maxReturnDate) {
            return res.status(400).json({ message: "Return date cannot exceed 15 days" });
        }

        const book = await Book.findById(bookId);
        if (!book || !book.isAvailable) {
            return res.status(400).json({ message: "Book is not available" });
        }

        const bookIssue = new BookIssue({
            userId,
            bookId,
            issueDate: new Date(),
            returnDate,
            remarks
        });

        await bookIssue.save();
        book.isAvailable = false;
        book.status = "Issued";
        await book.save();

        res.status(201).json({ message: "Book issued successfully", bookIssue });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Add Book (Admin only)
const addBook = async (req, res) => {
    try {
        const { title, author, category, type, codeNoFrom, codeNoTo, serialNumber, cost, procurementDate } = req.body;

        // Check for missing fields
        if (!title || !author || !category || !type || !codeNoFrom || !codeNoTo || !serialNumber || !cost) {
            return res.status(400).json({ message: "All fields including serialNumber and cost are required" });
        }

        // Ensure uniqueness of codeNoFrom
        const existingBook = await Book.findOne({ codeNoFrom });
        if (existingBook) {
            return res.status(400).json({ message: "Code No From must be unique" });
        }

        const book = new Book({
            title,
            author,
            category,
            type,
            codeNoFrom,
            codeNoTo,
            serialNumber,
            cost,
            procurementDate: procurementDate || new Date(),
            isAvailable: true,
            status: "Available"
        });

        await book.save();
        res.status(201).json({ message: "Book added successfully", book });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Update Book
const updateBook = async (req, res) => {
    try {
        const { title, author, category, type, codeNoFrom, codeNoTo, serialNumber, cost, isAvailable } = req.body;
        const bookId = req.params.id;

        const book = await Book.findByIdAndUpdate(
            bookId,
            { title, author, category, type, codeNoFrom, codeNoTo, serialNumber, cost, isAvailable },
            { new: true }
        );

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({ message: "Book updated successfully", book });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Delete Book
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get All Books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Return Book
const returnBook = async (req, res) => {
    try {
        const { bookId } = req.body;
        const userId = req.user.id;

        // Find the active book issue
        const bookIssue = await BookIssue.findOne({
            bookId,
            userId,
            status: "issued"
        }).populate("bookId");

        if (!bookIssue) {
            return res.status(404).json({ message: "No active issue found for this book" });
        }

        // Calculate fine if applicable
        const today = new Date();
        const returnDate = new Date(bookIssue.returnDate);
        let fine = 0;

        if (today > returnDate) {
            const daysLate = Math.ceil((today - returnDate) / (1000 * 60 * 60 * 24));
            fine = daysLate * 10; // ₹10 per day fine
            bookIssue.fine = fine;
        }

        // Update book issue status
        bookIssue.actualReturnDate = today;
        bookIssue.status = fine > 0 ? "pending_fine" : "returned";
        await bookIssue.save();

        // If no fine, mark book as available
        if (fine === 0) {
            await Book.findByIdAndUpdate(bookId, { isAvailable: true, status: "Available" });
        }

        res.json({
            message: fine > 0 ? "Book returned with fine pending" : "Book returned successfully",
            fine,
            bookIssue
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    searchAvailableBooks,
    issueBook,
    addBook,
    updateBook,
    deleteBook,
    getAllBooks,
    returnBook
};
