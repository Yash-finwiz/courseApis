const express = require('express');
const Course = require('../models/Course');

const router = express.Router();

// Create a new course with validation
router.post('/', async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.validate(); // Explicit validation to catch any validation errors
        await course.save();
        res.status(201).send(course);
    } catch (error) {
        res.status(400).send({ message: 'Error creating course', error: error.message });
    }
});

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.send(courses);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching courses', error: error.message });
    }
});

module.exports = router;
