const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const sendEmail = require('../utils/sendEmail');

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private (Customer only)
const bookAppointment = async (req, res) => {
    try {
        const { service_id, staff_id, date, timeSlot } = req.body;

        if (!service_id || !date || !timeSlot) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const appointment = new Appointment({
            customer_id: req.user._id,
            service_id,
            staff_id,
            date,
            timeSlot
        });

        const createdAppointment = await appointment.save();

        // --- EMAIL NOTIFICATION LOGIC START ---
        // Service details nikal lo taaki email me naam dikha sakein
        const serviceData = await Service.findById(service_id);

        const emailMessage = `
            <h2>Booking Confirmed! 🎉</h2>
            <p>Hi ${req.user.name},</p>
            <p>Your appointment at <strong>Faiz Salon</strong> has been successfully booked.</p>
            <h3>Details:</h3>
            <ul>
                <li><strong>Service:</strong> ${serviceData.name}</li>
                <li><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</li>
                <li><strong>Time:</strong> ${timeSlot}</li>
                <li><strong>Price:</strong> ₹${serviceData.price}</li>
            </ul>
            <p>Thank you for choosing us!</p>
        `;

        // Async function chalne do (background me), user ko wait nahi karwayenge
        sendEmail({
            email: req.user.email, // Logged in user ka email
            subject: 'Appointment Confirmation - Faiz Salon',
            message: emailMessage
        });
        // --- EMAIL NOTIFICATION LOGIC END ---

        res.status(201).json(createdAppointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// ... baaki neechay ke dono functions (getMyAppointments aur getAllAppointments) wese hi rahenge
const getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ customer_id: req.user._id })
            .populate('service_id', 'name price')
            .populate('staff_id', 'name');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({})
            .populate('customer_id', 'name email phone')
            .populate('service_id', 'name price')
            .populate('staff_id', 'name');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { bookAppointment, getMyAppointments, getAllAppointments };
