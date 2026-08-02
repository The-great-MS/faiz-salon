const cloudinary = require('cloudinary'); // Yahan se .v2 hata diya hai
const multerStorageCloudinary = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

const CloudinaryStorage = multerStorageCloudinary.CloudinaryStorage || multerStorageCloudinary;

// Configuration ke time hum manually .v2 use karenge
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary, // Ab hum main package pass kar rahe hain, jisme library khud .v2 dhoondh legi
    params: {
        folder: 'faiz_salon_services',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    },
});

const upload = multer({ storage: storage });

module.exports = { upload };
