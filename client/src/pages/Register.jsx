import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    const res = await register(formData);
    if (res.success) {
      navigate('/'); // Register successful, go to Home
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-dark flex items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-800">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Create Account</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-primary focus:outline-none" required />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-primary focus:outline-none" required />
          <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-primary focus:outline-none" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-primary focus:outline-none" required />
          <button type="submit" className="bg-primary text-dark font-bold py-3 rounded mt-2 hover:bg-yellow-600 transition">Sign Up</button>
        </form>
        <p className="text-gray-400 mt-6 text-center">Already have an account? <Link to="/login" className="text-primary hover:underline">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;
