const express = require('express');
const router = express.Router();
const { getStaff, addStaff } = require('../controllers/staffController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.get('/', getStaff);
router.post('/', protect, admin, addStaff);

module.exports = router;
