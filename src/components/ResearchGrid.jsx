import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

const ResearchCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05 }}
      className="group relative bg-white soft-border soft-shadow-hover p-8 md:p-10 rounded-3xl transition-all duration-500 overflow-hidden"
    >
      <div className="flex justify-between items-start mb-8">
        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-widest">
          {item.year} <span className="opacity-50 mx-1">/</span> {item.category}
        </span>
        <div className="text-gray-300 group-hover:text-green-600 transition-colors">
          <ExternalLink size={20} />
        </div>
      </div>

      <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mb-6 leading-tight group-hover:text-green-800 transition-colors">
        {item.title}
      </h3>
      
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-10">
        Client: {item.client}
      </p>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <div className="relative z-10 flex items-center gap-3 text-green-700 font-bold text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
        <span>View Details</span>
        <ArrowRight size={16} />
      </div>
    </motion.div>
  );
};

const ResearchGrid = ({ data }) => {
  return (
    <section id="research" className="section-padding bg-white relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="container">
        <div className="max-w-4xl mb-16 text-center mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            Research & Consultancies
          </h2>
          <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
            Over 100 research and evaluation reports presented at national forums. Highlighting key thematic areas in human rights and development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((item, index) => (
            <ResearchCard key={index} item={item} index={index} />
          ))}
        </div>
        
        <div className="mt-20 flex justify-center">
          <button className="flex items-center gap-3 px-8 py-4 bg-white soft-border soft-shadow text-gray-900 font-bold rounded-full hover:bg-gray-50 transition-all hover:-translate-y-1 group">
            See All 100+ Reports
            <ArrowRight size={18} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResearchGrid;
