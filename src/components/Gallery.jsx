import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Camera } from 'lucide-react';

const Gallery = ({ items }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(items.map(item => item.category))];
  const filteredItems = filter === 'All' ? items : items.filter(item => item.category === filter);

  return (
    <section id="gallery" className="gallery-section section-padding">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h6 className="flex items-center gap-2 text-green-600 font-bold uppercase tracking-[0.2em] text-xs mb-4">
              <Camera size={16} /> Visual Journey
            </h6>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">Fieldwork Gallery</h2>
            <p className="text-gray-500 max-w-xl text-lg font-medium leading-relaxed">
              Capturing moments from the field—mission assessments, community advocacy, and capacity-building workshops across the globe.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-masonry">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="gallery-item group"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative overflow-hidden rounded-3xl cursor-pointer">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <span className="text-green-400 text-xs font-bold uppercase tracking-widest mb-2">{item.category}</span>
                    <h4 className="text-white font-bold text-xl mb-1">{item.title}</h4>
                    <p className="text-white/60 text-sm">{item.location}</p>
                    <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full max-h-full flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title} 
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="mt-8 text-center">
                <span className="text-green-500 font-bold uppercase tracking-widest text-sm">{selectedImage.category}</span>
                <h3 className="text-white text-3xl font-bold mt-2">{selectedImage.title}</h3>
                <p className="text-white/40 mt-1">{selectedImage.location}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
