const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['book', 'movie'],
        default: 'book'
    },
    codeNoFrom: {
        type: String,
        required: true,
        unique: true // Ensuring uniqueness for book codes
    },
    codeNoTo: {
        type: String,
        required: true
    },
    serialNumber: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ['Available', 'Issued', 'Reserved'],
        default: 'Available'
    },
    cost: {
        type: Number, 
        required: true
    },
    procurementDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
