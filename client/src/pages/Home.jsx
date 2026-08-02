import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // <-- Animation library import
import API from '../services/api';
import ServiceCard from '../components/ServiceCard';

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await API.get('/services');
        setServices(data);
      } catch (error) {
        console.error("Error fetching services", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Animation variants for Staggered Cards (Ek ke baad ek aane ka effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 } // Har card 0.2s ke gap par aayega
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Niche chhupe honge
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } } // Upar aayenge
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-dark text-white overflow-hidden">

      {/* 🚀 Animated Hero Section */}
      <div className="relative flex flex-col items-center justify-center py-24 text-center px-4">
        {/* Background Glow Effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full z-0 pointer-events-none"></div>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold text-primary mb-6 z-10 drop-shadow-lg"
        >
          Faiz Salon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl text-gray-300 max-w-2xl z-10"
        >
          Premium Hair & Grooming Services. Experience the best styling in town with top-tier professionals.
        </motion.p>
      </div>

      {/* 🚀 Animated Services Section */}
      <div className="container mx-auto px-4 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold border-b-2 border-primary pb-3 inline-block">
            Our Services
          </h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center text-gray-400 text-lg">No services available right now.</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }} // Thoda scroll karne par chalega
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div key={service._id} variants={cardVariants}>
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
