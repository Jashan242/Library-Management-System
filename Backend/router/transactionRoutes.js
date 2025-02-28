const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { calculateFine, payFine, getTransactionHistory, getActiveTransactions, getFineHistory } = require('../controller/transactionController');
// Fine related routes
router.get('/fine/calculate/:issueId', verifyToken, calculateFine);
router.post('/fine/pay/:issueId', verifyToken, payFine);
router.get('/fine/history', verifyToken, getFineHistory);

router.get('/history', verifyToken, getTransactionHistory);
router.get('/active', verifyToken, getActiveTransactions);

module.exports = router; 