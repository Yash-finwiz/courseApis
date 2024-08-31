const express = require('express');
const Batch = require('../models/Batch');
const Course = require('../models/Course');

const router = express.Router();

// Create a new batch with validation
router.post('/', async (req, res) => {
    try {
        const { courseId, startDate, endDate, studentIds } = req.body;

        // Validate course existence
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).send({ message: 'Course not found' });
        }

        const batch = new Batch({
            course: courseId,
            startDate,
            endDate,
            studentIds,
        });

        await batch.validate(); // Explicit validation to catch any validation errors
        await batch.save();
        res.status(201).send(batch);
    } catch (error) {
        res.status(400).send({ message: 'Error creating batch', error: error.message });
    }
});

// Assign students to a batch with validation
router.post('/:id/assign', async (req, res) => {
    try {
        const batch = await Batch.findById(req.params.id);

        if (!batch) {
            return res.status(404).send({ message: 'Batch not found' });
        }

        const { studentIds } = req.body;
        if (!Array.isArray(studentIds) || !studentIds.every(Number.isInteger)) {
            return res.status(400).send({ message: 'Student IDs must be an array of integers' });
        }

        batch.studentIds.push(...studentIds);
        await batch.save();

        res.send({ message: 'Students assigned successfully', batch });
    } catch (error) {
        res.status(400).send({ message: 'Error assigning students', error: error.message });
    }
});

// Get a batch by ID with course details populated
router.get('/:id', async (req, res) => {
    try {
        const batch = await Batch.findById(req.params.id).populate('course');

        if (!batch) {
            return res.status(404).send({ message: 'Batch not found' });
        }

        res.send(batch);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching batch', error: error.message });
    }
});

// Get all batches with course details populated
router.get('/', async (req, res) => {
    try {
        const batches = await Batch.find().populate('course');
        res.send(batches);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching batches', error: error.message });
    }
});

module.exports = router;
