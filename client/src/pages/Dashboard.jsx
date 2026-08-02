import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyAppointments = async () => {
      try {
        const { data } = await API.get('/appointments/my');
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchMyAppointments();
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-76px)] bg-dark text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-2">My Dashboard</h1>
        <p className="text-gray-400 mb-8">Welcome back, {user?.name}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Profile Box */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 lg:col-span-1 h-fit">
            <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Profile Details</h2>
            <div className="space-y-3 text-gray-300">
              <p><span className="text-gray-500 block text-sm">Name</span> {user?.name}</p>
              <p><span className="text-gray-500 block text-sm">Email</span> {user?.email}</p>
              <p><span className="text-gray-500 block text-sm">Phone</span> {user?.phone || 'N/A'}</p>
            </div>
          </div>

          {/* Appointments Box */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 lg:col-span-2">
            <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Upcoming Appointments</h2>

            {loading ? (
              <p className="text-primary">Loading appointments...</p>
            ) : appointments.length === 0 ? (
              <div className="text-gray-400">
                <p>You don't have any upcoming appointments.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appt) => (
                  <div key={appt._id} className="bg-gray-800 p-4 rounded flex justify-between items-center border border-gray-700 hover:border-primary transition">
                    <div>
                      <h3 className="font-bold text-lg">{appt.service_id?.name}</h3>
                      <p className="text-gray-400 text-sm">
                        📅 {new Date(appt.date).toLocaleDateString()} | ⏰ {appt.timeSlot}
                      </p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded text-xs font-bold uppercase ${
                        appt.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        appt.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                        'bg-blue-500/20 text-blue-500'
                      }`}>
                        {appt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
