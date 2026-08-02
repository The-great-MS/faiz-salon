const express = require('express');
const router = express.Router();
const { bookAppointment, getMyAppointments, getAllAppointments } = require('../controllers/appointmentController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Customer routes
router.post('/', protect, bookAppointment);
router.get('/my', protect, getMyAppointments);

// Admin route
router.get('/', protect, admin, getAllAppointments);

module.exports = router;
