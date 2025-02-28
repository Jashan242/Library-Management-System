const mongoose = require('mongoose');

const bookIssueSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    issueDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },
    actualReturnDate: {
        type: Date
    },
    fine: {
        type: Number,
        default: 0
    },
    finePaid: {
        type: Boolean,
        default: false
    },
    remarks: String,
    status: {
        type: String,
        enum: ['issued', 'returned'],
        default: 'issued'
    }
}, { timestamps: true });

module.exports = mongoose.model('BookIssue', bookIssueSchema); 