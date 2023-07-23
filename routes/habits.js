const express = require('express');
const router = express.Router();

const habitController = require('../controllers/habit_controller');

// This is for creating habit
router.post('/createHabit', habitController.createHabit);

// This is for toggleing status
router.get('/toggleStatus', habitController.toggleStatus);

// This is toggleing favorite
router.get('/favorite', habitController.toggleFavourite);

// This is for deleting habit
router.get('/remove', habitController.removeHabit);

module.exports = router;