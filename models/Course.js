const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    domain: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
