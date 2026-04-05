import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Layers, List, ChevronDown, ChevronUp } from 'lucide-react';

const TimelineItem = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <div ref={ref} className="relative pl-12 pb-20 group">
      {/* Connector Line */}
      <div className="absolute left-[5.5px] top-4 bottom-0 w-[2px] bg-gray-200 group-last:bg-transparent" />
      
      {/* Node */}
      <motion.div 
        style={{ scale, opacity }}
        className="absolute left-0 top-4 w-3 h-3 bg-green-600 rounded-full border-2 border-white shadow-sm z-10"
      />

      <div className="flex flex-col gap-2 bg-white soft-border soft-shadow-hover p-6 hover:bg-green-50/50 transition-colors cursor-pointer rounded-3xl" onClick={() => setIsExpanded(!isExpanded)}>
        <span className="text-xs font-bold text-green-700 uppercase tracking-widest bg-green-100 self-start px-3 py-1 rounded-full">
          {item.period}
        </span>
        
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mt-2">
          {item.role}
        </h3>
        
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{item.company}</p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-4"
            >
              <div className="pt-4 border-t border-gray-100">
                <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
                  {item.details}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span key={t} className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-1 text-xs font-bold text-gray-400 mt-2">
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
    </div>
  );
};

const MasonryGrid = ({ data }) => {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {data.map((item, i) => (
        <motion.div 
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.1 }}
          className="bg-white soft-border soft-shadow p-6 break-inside-avoid hover:-translate-y-1 hover:shadow-xl transition-all rounded-3xl group"
        >
          <span className="text-[10px] font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
            {item.period}
          </span>
          <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2 leading-tight group-hover:text-green-700 transition-colors">
            {item.role}
          </h3>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">{item.company}</p>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            {item.details.length > 100 ? item.details.substring(0, 100) + '...' : item.details}
          </p>
          <div className="flex flex-wrap gap-2">
            {item.tech.slice(0, 2).map((t) => (
              <span key={t} className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const Timeline = ({ data }) => {
  const [view, setView] = useState('chrono'); // 'chrono' or 'grid'

  return (
    <section id="experience" className="section-padding bg-[#fafafa]">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-4">Experience</h2>
            <p className="text-gray-500 max-w-xl text-lg font-medium">
              A journey spanning 25 years in development advocacy.
            </p>
          </div>
          
          <div className="flex p-1.5 bg-gray-100 rounded-full shadow-inner">
            <button 
              onClick={() => setView('chrono')}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-full transition-all ${view === 'chrono' ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <List size={16} /> Chronological
            </button>
            <button 
              onClick={() => setView('grid')}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-full transition-all ${view === 'grid' ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Layers size={16} /> Masonry Grid
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'chrono' ? (
            <motion.div 
              key="chrono"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              {data.map((item, i) => (
                <TimelineItem key={item.id} item={item} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MasonryGrid data={data} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Timeline;
