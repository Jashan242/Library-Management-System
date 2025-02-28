const BookIssue = require('../models/bookIssue');
const Book = require('../models/book');
const User = require('../models/user');

// Calculate fine based on return date
exports.calculateFine = async (req, res) => {
    try {
        const { issueId } = req.params;
        const bookIssue = await BookIssue.findById(issueId)
            .populate('bookId', 'title author');

        if (!bookIssue) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        const returnDate = new Date(bookIssue.returnDate);
        const today = new Date();
        let fine = 0;

        // Calculate fine if book is overdue (₹10 per day)
        if (today > returnDate) {
            const daysLate = Math.ceil((today - returnDate) / (1000 * 60 * 60 * 24));
            fine = daysLate * 10;
        }

        // Update fine amount in database
        bookIssue.fine = fine;
        await bookIssue.save();

        res.json({
            bookTitle: bookIssue.bookId.title,
            author: bookIssue.bookId.author,
            issueDate: bookIssue.issueDate,
            returnDate: bookIssue.returnDate,
            daysOverdue: Math.max(0, Math.ceil((today - returnDate) / (1000 * 60 * 60 * 24))),
            fine: fine
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Process fine payment
exports.payFine = async (req, res) => {
    try {
        const { issueId } = req.params;
        const bookIssue = await BookIssue.findById(issueId)
            .populate('bookId');

        if (!bookIssue) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Check if fine is already paid
        if (bookIssue.finePaid) {
            return res.status(400).json({ message: 'Fine is already paid' });
        }

        // Mark fine as paid and update book status
        bookIssue.finePaid = true;
        bookIssue.status = 'returned';
        bookIssue.actualReturnDate = new Date();
        await bookIssue.save();

        // Update book availability
        await Book.findByIdAndUpdate(bookIssue.bookId._id, { isAvailable: true });

        res.json({
            message: 'Fine paid successfully',
            transaction: {
                bookTitle: bookIssue.bookId.title,
                fineAmount: bookIssue.fine,
                returnDate: bookIssue.actualReturnDate
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get fine history for a user
exports.getFineHistory = async (req, res) => {
    try {
        const fineHistory = await BookIssue.find({
            userId: req.user.id,
            fine: { $gt: 0 }
        })
        .populate('bookId', 'title author')
        .sort({ createdAt: -1 });

        const formattedHistory = fineHistory.map(record => ({
            bookTitle: record.bookId.title,
            author: record.bookId.author,
            issueDate: record.issueDate,
            returnDate: record.returnDate,
            actualReturnDate: record.actualReturnDate,
            fine: record.fine,
            status: record.finePaid ? 'Paid' : 'Pending'
        }));

        res.json(formattedHistory);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get transaction history for a user
exports.getTransactionHistory = async (req, res) => {
    try {
        const transactions = await BookIssue.find({ userId: req.user.id })
            .populate('bookId', 'title author')
            .sort({ createdAt: -1 });

        const formattedTransactions = transactions.map(transaction => ({
            id: transaction._id,
            bookTitle: transaction.bookId.title,
            author: transaction.bookId.author,
            issueDate: transaction.issueDate,
            returnDate: transaction.returnDate,
            actualReturnDate: transaction.actualReturnDate,
            status: transaction.status,
            fine: transaction.fine,
            finePaid: transaction.finePaid,
            remarks: transaction.remarks
        }));

        res.json(formattedTransactions);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get active transactions (books currently issued)
exports.getActiveTransactions = async (req, res) => {
    try {
        const activeTransactions = await BookIssue.find({
            userId: req.user.id,
            status: 'issued'
        })
        .populate('bookId', 'title author')
        .sort({ issueDate: -1 });

        const formattedTransactions = activeTransactions.map(transaction => ({
            id: transaction._id,
            bookTitle: transaction.bookId.title,
            author: transaction.bookId.author,
            issueDate: transaction.issueDate,
            returnDate: transaction.returnDate,
            daysRemaining: Math.ceil(
                (new Date(transaction.returnDate) - new Date()) / (1000 * 60 * 60 * 24)
            )
        }));

        res.json(formattedTransactions);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
