import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Loader2, Download } from 'lucide-react';

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

const PDFPage = ({ pdf, pageNumber, side }) => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pdf) return;

    const renderPage = async () => {
      try {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;
        
        setLoading(false);
      } catch (err) {
        console.error("Error rendering PDF page:", err);
      }
    };

    renderPage();
  }, [pdf, pageNumber]);

  return (
    <div className={`book-page book-page-${side} flex items-center justify-center bg-white`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
          <Loader2 className="animate-spin text-green-600" size={24} />
        </div>
      )}
      <canvas ref={canvasRef} className="max-w-full max-h-full object-contain" />
      <span className="book-page-num">{pageNumber < 10 ? `0${pageNumber}` : pageNumber}</span>
    </div>
  );
};

const BookReader = ({ book, onClose }) => {
  const [pdf, setPdf] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const response = await fetch(book.pdfUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        
        // Diagnostic: check signature
        const signature = new TextDecoder().decode(new Uint8Array(arrayBuffer.slice(0, 5)));
        console.log(`PDF Loaded from ${book.pdfUrl}. Signature: [${signature}]. Length: ${arrayBuffer.byteLength}`);

        const loadingTask = window.pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
        const pdfDoc = await loadingTask.promise;
        setPdf(pdfDoc);
        setNumPages(pdfDoc.numPages);
      } catch (err) {
        console.error("Error loading PDF:", err);
      }
    };
    loadPdf();
  }, [book.pdfUrl]);

  const nextPage = () => {
    if (currentPage + 2 <= numPages) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 2);
        setIsFlipping(false);
      }, 600);
    }
  };

  const prevPage = () => {
    if (currentPage - 2 >= 1) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 2);
        setIsFlipping(false);
      }, 600);
    }
  };

  return (
    <motion.div 
      className="book-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative group/reader">
        <div className="flex justify-between items-center mb-6 absolute -top-16 left-0 right-0">
           <h2 className="text-white font-bold text-lg truncate pr-8 max-w-[70%]">{book.title}</h2>
           <div className="flex items-center gap-4">
              <a href={book.pdfUrl} download className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-bold bg-white/10 px-4 py-2 rounded-full border border-white/20">
                <Download size={16} /> Download
              </a>
              <button className="flex items-center gap-2 text-white hover:text-green-400 font-bold transition-colors" onClick={onClose}>
                <X size={24} />
              </button>
           </div>
        </div>

        {currentPage > 1 && (
          <button className="book-nav-btn book-nav-prev" onClick={prevPage}>
            <ChevronLeft size={30} />
          </button>
        )}

        {currentPage + 1 < numPages && (
          <button className="book-nav-btn book-nav-next" onClick={nextPage}>
            <ChevronRight size={30} />
          </button>
        )}

        <motion.div 
          className="book-reader"
          initial={{ scale: 0.8, rotateY: -30, opacity: 0 }}
          animate={{ scale: 1, rotateY: 0, opacity: 1 }}
          exit={{ scale: 0.8, rotateY: 30, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Spine shadow effect via middle border */}
          <div className="absolute inset-y-0 left-1/2 w-8 -ml-4 bg-gradient-to-r from-black/20 via-black/5 to-black/20 z-20 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPage}
              className="flex w-full h-full"
              initial={{ rotateY: isFlipping ? -90 : 0, opacity: 0.8 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0.8 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <PDFPage pdf={pdf} pageNumber={currentPage} side="left" />
              <PDFPage pdf={pdf} pageNumber={currentPage + 1 <= numPages ? currentPage + 1 : currentPage} side="right" />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        <div className="text-center mt-8">
            <p className="text-white/60 text-sm font-bold tracking-widest uppercase">
                Page {currentPage} - {Math.min(currentPage + 1, numPages)} of {numPages}
            </p>
        </div>
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
              Real-world research and evaluation reports. Click to open the 3D flipbook reader.
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
