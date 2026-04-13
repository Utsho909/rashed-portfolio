import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = ({ data }) => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Tea Field Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
        style={{
          backgroundImage: "url('/hero.jpg')",
        }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-0 bg-black/40" />

      <div className="container relative z-10 text-center text-white flex-1 flex flex-col justify-center items-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[1.1] drop-shadow-2xl"
          >
            {data.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.8 }}
            className="text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-lg opacity-90"
          >
            "Passionate about inclusive, rights-based, and climate-resilient development."
          </motion.p>
        </div>
      </div>

      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 15, 0] }}
        transition={{
          opacity: { duration: 1, delay: 3.5 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut", delay: 3.5 }
        }}
        className="absolute bottom-12 z-20 text-white/50 hover:text-white transition-colors cursor-pointer flex flex-col items-center justify-center p-4 rounded-full bg-black/10 hover:bg-black/30 backdrop-blur-sm shadow-xl"
        aria-label="Scroll Down"
      >
        <ChevronDown size={36} />
      </motion.button>
    </section>
  );
};

export default Hero;
