import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';

const EyeOpening = ({ onComplete }) => {
  const [stage, setStage] = useState('closed'); // 'closed' -> 'open' -> 'done'

  useEffect(() => {
    // 1. Open the eye
    const openTimer = setTimeout(() => {
      setStage('open');
    }, 500);

    // 2. Finish intro and animate out
    const finishTimer = setTimeout(() => {
      setStage('done');
    }, 2800);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(finishTimer);
    };
  }, []); // Empty dependency array ensures this effect only runs exactly once on mount!

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white pointer-events-none"
          initial={false}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              // Simulate an eye blinking open by scaling the Y axis from 0 to 1
              initial={{ scaleY: 0, opacity: 0 }}
              animate={stage === 'open' ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-green-700"
            >
              <Eye size={80} strokeWidth={1.5} />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={stage === 'open' ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-xl md:text-2xl font-bold tracking-[0.3em] uppercase text-gray-800"
            >
              Opening Perspectives
            </motion.h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EyeOpening;
