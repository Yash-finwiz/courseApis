const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Course name is required'],
        trim: true,
        minlength: [3, 'Course name must be at least 3 characters long'],
        maxlength: [100, 'Course name must be less than 100 characters'],
    },
    type: {
        type: String,
        required: [true, 'Course type is required'],
        enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    category: {
        type: String,
        required: [true, 'Course category is required'],
        enum: ['Development', 'Design', 'Marketing', 'Business'], // Example categories
    },
    domain: {
        type: String,
        required: [true, 'Course domain is required'],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description must be less than 500 characters'],
    },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
