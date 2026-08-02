const Staff = require('../models/Staff');

// @desc    Get all active staff
// @route   GET /api/staff
// @access  Public
const getStaff = async (req, res) => {
    try {
        const staff = await Staff.find({ isActive: true });
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add new staff member
// @route   POST /api/staff
// @access  Private/Admin
const addStaff = async (req, res) => {
    try {
        const { name, role } = req.body;

        const staff = new Staff({
            name,
            role
        });

        const createdStaff = await staff.save();
        res.status(201).json(createdStaff);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getStaff, addStaff };
