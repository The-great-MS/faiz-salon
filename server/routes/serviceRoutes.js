const express = require('express');
const router = express.Router();
const { getServices, createService } = require('../controllers/serviceController');
const { protect, admin } = require('../middlewares/authMiddleware');
const { upload } = require('../config/cloudinary');

// Public route to get all services
router.get('/', getServices);

// Admin only route to create service. 'upload.single('image')' middleware file handle karega
router.post('/', protect, admin, upload.single('image'), createService);

module.exports = router;
