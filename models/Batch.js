const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Course ID is required'],
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
        validate: {
            validator: function(value) {
                return value >= new Date();
            },
            message: 'Start date must be in the future',
        },
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required'],
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: 'End date must be after the start date',
        },
    },
    studentIds: {
        type: [Number], // Assuming student IDs are numbers
        validate: {
            validator: function(value) {
                return Array.isArray(value) && value.every(Number.isInteger);
            },
            message: 'Student IDs must be an array of integers',
        },
        default: [],
    },
});

const Batch = mongoose.model('Batch', batchSchema);

module.exports = Batch;
