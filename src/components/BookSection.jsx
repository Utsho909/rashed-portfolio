import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Download, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  // Sort publications
  const sortedPublications = [...publications].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return parseInt(b.year || 0) - parseInt(a.year || 0);
      case 'oldest':
        return parseInt(a.year || 0) - parseInt(b.year || 0);
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  // Paginate
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const paginatedBooks = sortedPublications.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(sortedPublications.length / booksPerPage);

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  // Handle page change
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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

        {/* Sort and Filter Controls */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 font-medium cursor-pointer hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>
          <div className="text-sm text-gray-600 font-medium">
            Showing {indexOfFirstBook + 1}–{Math.min(indexOfLastBook, sortedPublications.length)} of {sortedPublications.length}
          </div>
        </div>

        {/* Books Grid */}
        <div className="books-grid">
          <AnimatePresence mode="wait">
            {paginatedBooks.map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                onClick={setSelectedBook} 
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-2 rounded-lg font-medium transition-all ${
                    currentPage === page
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={20} className="text-gray-700" />
            </button>
          </div>
        )}
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
