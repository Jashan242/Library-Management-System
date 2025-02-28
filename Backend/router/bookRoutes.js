const express = require('express');
const router = express.Router();
const { 
    searchAvailableBooks, 
    issueBook, 
    addBook, 
    updateBook, 
    deleteBook, 
    getAllBooks,
    returnBook  // Add returnBook to imports
} = require('../controller/bookController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const { validateBookIssue } = require('../middleware/validation');

// Public routes
router.get('/search', searchAvailableBooks);

// Protected routes (requires authentication)
router.get('/available', verifyToken, searchAvailableBooks);
router.post('/issue', verifyToken, validateBookIssue, issueBook);
router.post('/return', verifyToken, returnBook);  // Use imported returnBook function
// router.get('/my-books', verifyToken, bookController.getUserBooks);

// Admin only routes
router.post('/add', verifyToken, isAdmin, addBook);
router.put('/update/:id', verifyToken, isAdmin, updateBook);
router.delete('/delete/:id', verifyToken, isAdmin, deleteBook);
router.get('/all', getAllBooks);

module.exports = router; 