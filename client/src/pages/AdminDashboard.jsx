import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    durationInMinutes: ''
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Peli select ki hui file
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Jab image bhejni hoti hai, toh hume FormData ka use karna padta hai (normal JSON nahi chalta)
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('durationInMinutes', formData.durationInMinutes);
    data.append('image', image);

    try {
      await API.post('/services', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Service Added Successfully! 🎉');
      setFormData({ name: '', description: '', price: '', durationInMinutes: '' });
      setImage(null);
    } catch (error) {
      setMessage('Error adding service: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'admin') {
    return <div className="text-white text-center mt-20 text-2xl">Access Denied. Admins Only.</div>;
  }

  return (
    <div className="min-h-[calc(100vh-76px)] bg-dark text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">Admin Dashboard</h1>

        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold mb-6 text-white border-b border-gray-700 pb-2">Add New Salon Service</h2>

          {message && <div className="mb-4 p-3 bg-gray-800 border border-primary text-primary rounded">{message}</div>}

          <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="name" placeholder="Service Name (e.g. Haircut)" value={formData.name} onChange={handleInputChange} className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-primary focus:outline-none w-full" required />
            <input type="number" name="price" placeholder="Price (₹)" value={formData.price} onChange={handleInputChange} className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-primary focus:outline-none w-full" required />
            <input type="number" name="durationInMinutes" placeholder="Duration (Minutes)" value={formData.durationInMinutes} onChange={handleInputChange} className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-primary focus:outline-none w-full" required />
            <input type="file" accept="image/*" onChange={handleImageChange} className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-primary focus:outline-none w-full" required />

            <div className="md:col-span-2">
              <textarea name="description" placeholder="Short Description..." value={formData.description} onChange={handleInputChange} rows="3" className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-primary focus:outline-none w-full" required></textarea>
            </div>

            <div className="md:col-span-2">
              <button type="submit" disabled={loading} className="w-full bg-primary text-dark font-bold py-3 rounded hover:bg-yellow-600 transition disabled:opacity-50">
                {loading ? 'Uploading & Adding...' : 'Add Service'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
