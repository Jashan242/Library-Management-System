const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const { validateMembership } = require('../middleware/validation');
const { createMembership } = require('../controller/membershipController');
const { updateMembership } = require('../controller/membershipController');
const { getMembershipById } = require('../controller/membershipController');
const { getAllMemberships } = require('../controller/membershipController');

// Protected routes
router.post('/add', verifyToken, validateMembership, createMembership);
router.put('/update', verifyToken, validateMembership, updateMembership);
router.get('/status', verifyToken, getMembershipById);
router.get('/', verifyToken, getAllMemberships);

module.exports = router; 