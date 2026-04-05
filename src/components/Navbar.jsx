import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Publications', href: '#publications' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <div className="fixed top-6 left-0 w-full z-50 pointer-events-none px-4">
      <nav 
        className={`pointer-events-auto mx-auto max-w-4xl transition-all duration-500 rounded-full ${
          scrolled ? 'bg-white/70 backdrop-blur-xl shadow-lg border border-white/20 px-8 py-3' : 'bg-black/20 backdrop-blur-md px-8 py-4 border border-white/10'
        }`}
      >
        <div className="flex justify-between items-center text-white mix-blend-difference">
          <a href="#" className="text-xl font-bold tracking-tight hover:opacity-70 transition-opacity flex items-center gap-2">
            AMRK
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium tracking-wide hover:opacity-70 transition-opacity">
                {link.name}
              </a>
            ))}
            <button className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white text-sm font-bold rounded-full hover:bg-green-700 hover:scale-105 hover:shadow-xl hover:shadow-green-200 transition-all">
              <Download size={16} /> CV
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden z-50 p-2 bg-white/10 rounded-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Screen Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 mt-20 pointer-events-auto bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-2xl flex flex-col items-center justify-center gap-8 z-40 border border-white"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-4xl font-bold tracking-tight text-gray-800 hover:text-green-700 transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="flex items-center gap-2 px-8 py-4 bg-green-700 text-white shadow-xl shadow-green-900/20 text-lg font-bold rounded-full hover:scale-105 transition-all mt-4">
              <Download size={24} /> Download CV
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
