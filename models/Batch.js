const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    studentIds: {
        type: [Number], // Assuming student IDs are numbers
        default: [],
    },
});

const Batch = mongoose.model('Batch', batchSchema);

module.exports = Batch;
