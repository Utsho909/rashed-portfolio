import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Download } from 'lucide-react';

const BookCard = ({ book, onClick }) => {
  return (
    <motion.div 
      className="book-card"
      whileHover={{ y: -10 }}
      onClick={() => onClick(book)}
    >
      <div className="book-cover-wrapper">
        <div className="book-spine" />
        <img src={book.cover} alt={book.title} className="book-cover-img" />
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-year">{book.year} • {book.publisher}</p>
      </div>
    </motion.div>
  );
};

const BookReader = ({ book, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div 
      className="book-overlay flex flex-col justify-center items-center py-6 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute top-4 left-6 right-6 flex justify-between items-center z-50">
         <h2 className="text-white font-bold text-xl drop-shadow-lg truncate max-w-[60%]">{book.title}</h2>
         <div className="flex items-center gap-4">
            <a href={book.pdfUrl} download className="flex items-center gap-2 text-white hover:text-white transition-colors text-sm font-bold bg-white/20 hover:bg-white/30 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30 shadow-xl">
              <Download size={18} /> Download
            </a>
            <button className="flex items-center justify-center w-10 h-10 bg-black/40 hover:bg-red-500 rounded-full text-white transition-colors" onClick={onClose}>
              <X size={20} />
            </button>
         </div>
      </div>

      {/* Main Native Reader Container */}
      <div className="w-full h-full max-w-7xl mt-12 mb-4 bg-white rounded-xl shadow-2xl overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
            <Loader2 size={48} className="text-green-600 animate-spin mb-4" />
            <p className="text-gray-500 font-bold animate-pulse">Loading Document...</p>
          </div>
        )}
        <iframe 
          src={book.pdfUrl} 
          title={book.title}
          className="w-full h-full border-0 bg-gray-100"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </motion.div>
  );
};

const BookSection = ({ publications }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <section id="publications" className="books-section">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-4">Publications</h2>
            <p className="text-gray-500 max-w-xl text-lg font-medium">
              High-performance research and evaluation reports. Click to open the document viewer.
            </p>
          </div>
        </div>

        <div className="books-grid">
          {publications.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              onClick={setSelectedBook} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedBook && (
          <BookReader 
            book={selectedBook} 
            onClose={() => setSelectedBook(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default BookSection;
