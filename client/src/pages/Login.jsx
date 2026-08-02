import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/'); // Login successful, go to Home
    } else {
      setError(res.message); // Show error message
    }
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-dark flex items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-800">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Welcome Back</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input type="email" placeholder="Email Address" className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-primary focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-primary focus:outline-none" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="bg-primary text-dark font-bold py-3 rounded mt-2 hover:bg-yellow-600 transition">Sign In</button>
        </form>
        <p className="text-gray-400 mt-6 text-center">New to Faiz Salon? <Link to="/register" className="text-primary hover:underline">Create an account</Link></p>
      </div>
    </div>
  );
};

export default Login;
