import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ data }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      {/* Tea Field Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
        style={{
          backgroundImage: "url('/tea-field.jpg')",
        }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-0 bg-black/40" />

      <div className="container relative z-10 text-center text-white">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[1.1] drop-shadow-2xl mt-12"
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
    </section>
  );
};

export default Hero;
