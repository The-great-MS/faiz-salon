import { useState, useContext } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

const BookAppointment = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Agar koi bina service select kiye direct is page par aaye, toh wapas Home bhej do
  if (!location.state?.service) {
    return <Navigate to="/" />;
  }

  const service = location.state.service;

  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Aaj se pehle ki date select na ho sake isliye minDate set karenge
  const today = new Date().toISOString().split('T')[0];

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      await API.post('/appointments', {
        service_id: service._id,
        date,
        timeSlot
      });
      setMessage('Appointment Booked Successfully! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 2000); // 2 second baad dashboard par bhej do
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error booking appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-dark text-white p-8 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-primary mb-6 border-b border-gray-700 pb-2">Complete Your Booking</h2>

        {/* Service Summary */}
        <div className="flex gap-4 items-center mb-6 bg-gray-800 p-4 rounded-lg">
          <img src={service.imageUrl} alt={service.name} className="w-20 h-20 object-cover rounded" />
          <div>
            <h3 className="text-xl font-bold">{service.name}</h3>
            <p className="text-primary font-semibold">₹{service.price} <span className="text-gray-400 text-sm font-normal">| {service.durationInMinutes} mins</span></p>
          </div>
        </div>

        {message && <div className="mb-4 p-3 bg-gray-800 border border-primary text-primary rounded text-center">{message}</div>}

        <form onSubmit={handleBooking} className="flex flex-col gap-5">
          <div>
            <label className="block text-gray-400 mb-2">Select Date</label>
            <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-primary focus:outline-none" required />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Select Time</label>
            <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-primary focus:outline-none" required>
              <option value="">-- Choose a Time Slot --</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:30 AM">11:30 AM</option>
              <option value="01:00 PM">01:00 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="05:00 PM">05:00 PM</option>
              <option value="06:30 PM">06:30 PM</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="bg-primary text-dark font-bold py-3 rounded mt-4 hover:bg-yellow-600 transition disabled:opacity-50">
            {loading ? 'Confirming...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
