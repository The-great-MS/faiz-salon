const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff'
    },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true }, // e.g., "10:30 AM"
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
