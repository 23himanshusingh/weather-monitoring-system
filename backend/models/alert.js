const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
    },
    alertType: {
        type: String,
        required: true,
        enum: ['Temperature', 'Weather Condition'], // Additional alert types can be added here
    },
    condition: {
        type: String,
        required: true,
    },
    thresholdValue: {
        type: Number,
        required: true,
    },
    currentValue: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Alert', alertSchema);
