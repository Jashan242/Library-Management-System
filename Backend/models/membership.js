const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    contactAddress: {
        type: String,
        required: true
    },
    aadharCardNo: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['6months', '1year', '2years'],
        default: '6months'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active'
    },
    amountPending: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Membership', membershipSchema);
