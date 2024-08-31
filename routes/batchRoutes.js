const express = require('express');
const Batch = require('../models/Batch');
const Course = require('../models/Course');

const router = express.Router();

// Create a new batch
router.post('/', async (req, res) => {
    try {
        const { courseId, startDate, endDate, studentIds } = req.body;

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

        await batch.save();
        res.status(201).send(batch);
    } catch (error) {
        res.status(400).send({ message: 'Error creating batch', error: error.message });
    }
});

// Assign students to a batch
router.post('/:id/assign', async (req, res) => {
    try {
        const batch = await Batch.findById(req.params.id);

        if (!batch) {
            return res.status(404).send({ message: 'Batch not found' });
        }

        const { studentIds } = req.body;
        batch.studentIds.push(...studentIds);
        await batch.save();

        res.send({ message: 'Students assigned successfully', batch });
    } catch (error) {
        res.status(400).send({ message: 'Error assigning students', error: error.message });
    }
});

module.exports = router;
