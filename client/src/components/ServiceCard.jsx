import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_10px_30px_rgba(234,179,8,0.15)] hover:border-primary group">

      {/* Image with zoom effect on hover */}
      <div className="overflow-hidden">
        <img
          src={service.imageUrl}
          alt={service.name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
            {service.name}
          </h3>
          <span className="text-primary font-bold text-lg bg-primary/10 px-3 py-1 rounded-full">
            ₹{service.price}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-6 line-clamp-2">
          {service.description}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-gray-500 text-sm flex items-center gap-2 font-medium bg-gray-800 px-3 py-1 rounded-md">
            ⏳ {service.durationInMinutes} Mins
          </span>
          <button
            onClick={() => navigate('/book', { state: { service } })}
            className="px-5 py-2 bg-primary text-dark font-bold rounded-lg hover:bg-yellow-500 transform active:scale-95 transition-all duration-200 shadow-[0_0_15px_rgba(234,179,8,0.4)]"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
