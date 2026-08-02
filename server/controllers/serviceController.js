const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
    try {
        const services = await Service.find({});
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
const createService = async (req, res) => {
    try {
        const { name, description, price, durationInMinutes } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        // Yahan humne fallback laga diya hai, jo bhi available hoga wo le lega
        const imageUrl = req.file.path || req.file.secure_url || req.file.url;

        // Agar phir bhi link nahi milta, toh server crash hone ki jagah proper error dega
        if (!imageUrl) {
            return res.status(400).json({ message: 'Image upload issue: URL not returned from Cloudinary' });
        }

        const service = new Service({
            name,
            description,
            price: Number(price),
            durationInMinutes: Number(durationInMinutes),
            imageUrl
        });

        const createdService = await service.save();
        res.status(201).json(createdService);
    } catch (error) {
        console.error("Create Service Error:", error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

module.exports = { getServices, createService };
