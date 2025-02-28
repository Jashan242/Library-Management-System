const validateBookIssue = (req, res, next) => {
    const { bookId, returnDate } = req.body;
    
    if (!bookId) {
        return res.status(400).json({ message: 'Book selection is required' });
    }

    const today = new Date();
    const returnDateObj = new Date(returnDate);
    
    if (returnDateObj < today) {
        return res.status(400).json({ message: 'Return date cannot be in the past' });
    }

    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 15);
    
    if (returnDateObj > maxDate) {
        return res.status(400).json({ message: 'Return date cannot exceed 15 days' });
    }

    next();
};

const validateMembership = (req, res, next) => {
    const { type } = req.body;
    
    if (!['6months', '1year', '2years'].includes(type)) {
        return res.status(400).json({ message: 'Invalid membership type' });
    }

    next();
};

module.exports = {
    validateBookIssue,
    validateMembership
}; 