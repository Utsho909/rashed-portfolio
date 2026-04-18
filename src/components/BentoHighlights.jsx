import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, BarChart2, Globe, FlaskConical, Laptop2 } from 'lucide-react';

const BentoCard = ({ children, className = '', initial, delay = 0 }) => (
  <motion.div
    initial={initial}
    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -6, transition: { duration: 0.2 } }}
    className={`rounded-[2rem] p-8 overflow-hidden relative ${className}`}
  >
    {children}
  </motion.div>
);

// Direction helpers
const fromLeft = { opacity: 0, x: -80, y: 0, scale: 1 };
const fromRight = { opacity: 0, x: 80, y: 0, scale: 1 };
const popUp = { opacity: 0, x: 0, y: 0, scale: 0.7 };

const BentoHighlights = () => {
  const skills = ['SPSS', 'STATA', 'CSPro', 'MySQL', 'Power BI', 'SurveyCTO', 'ODK', 'KoBoToolbox'];
  const themes = ['Human Rights', 'Rights of Women and Children', 'Labor and Migrant Workers\'   Rights', 'Gender Equality', 'Disability Inclusion', 'SRHR', 'WASH', 'Education', 'Livelihoods', 'DRR', 'Climate Adaptation', 'CVE', 'Governance'];
  const partners = ['UNICEF', 'UNDP', 'UNFPA', 'USAID', 'CBM Global', 'Oxfam GB', 'BRAC', 'Diakonia', 'TIB', 'SCI'];

  return (
    <section className="section-padding bg-[#f0f4f0]">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">At a Glance</h2>
          <div className="w-24 h-1.5 bg-green-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-auto gap-5">

          {/* Box 1 — Large (2×2): Thematic Areas — FROM LEFT */}
          <BentoCard className="col-span-2 row-span-2 bg-green-700 text-white" initial={fromLeft} delay={0}>
            <div className="flex items-center gap-3 mb-6">
              <Globe size={28} className="opacity-70" />
              <span className="text-sm font-bold uppercase tracking-widest opacity-70">Core Thematic Areas</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {themes.map((t) => (
                <span key={t} className="bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  {t}
                </span>
              ))}
            </div>
            {/* Layered animated decorative circles for better visibility */}
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-8 -right-8 w-56 h-56 rounded-full bg-white/10 blur-xl px-4" 
            />
            <motion.div 
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.05, 0.15, 0.05]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-white/10 blur-lg" 
            />
          </BentoCard>
 
          {/* Box 2 — Tall (1×2): Years of Experience — POP UP */}
          <BentoCard className="col-span-1 row-span-2 bg-gray-900 text-white flex flex-col justify-end" initial={popUp} delay={0.1}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-auto"
            >
              <BarChart2 size={32} className="text-green-400" />
            </motion.div>
            <div>
              <p className="text-7xl font-black leading-none mb-2">25<span className="text-green-400">+</span></p>
              <p className="text-sm font-bold uppercase tracking-widest opacity-60">Years of Experience</p>
            </div>
          </BentoCard>

          {/* Box 3 — Square: Publications — FROM RIGHT */}
          <BentoCard className="col-span-1 bg-white soft-border" initial={fromRight} delay={0.1}>
            <BookOpen size={28} className="text-green-700 mb-4" />
            <p className="text-5xl font-black text-gray-900 mb-1">100<span className="text-green-600">+</span></p>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Research Reports</p>
          </BentoCard>

          {/* Box 4 — Square: Staff Trained — FROM RIGHT */}
          <BentoCard className="col-span-1 bg-green-50 soft-border" initial={fromRight} delay={0.2}>
            <Users size={28} className="text-green-700 mb-4" />
            <p className="text-5xl font-black text-gray-900 mb-1">300<span className="text-green-600">+</span></p>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Staff Trained</p>
          </BentoCard>

          {/* Box 5 — Wide (2×1): Tech & Software — FROM LEFT */}
          <BentoCard className="col-span-2 bg-white soft-border" initial={fromLeft} delay={0.25}>
            <div className="flex items-center gap-3 mb-5">
              <Laptop2 size={24} className="text-green-700" />
              <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Tech & Software</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <motion.span 
                  key={skill} 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-gray-100 text-gray-700 text-xs font-bold px-4 py-2 rounded-full hover:bg-green-100 hover:text-green-800 transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </BentoCard>

          {/* Box 6 — Wide (2×1): Global Partners — FROM RIGHT */}
          <BentoCard className="col-span-2 bg-gray-900 text-white" initial={fromRight} delay={0.3}>
            <div className="flex items-center gap-3 mb-5">
              <FlaskConical size={24} className="text-green-400" />
              <span className="text-sm font-bold uppercase tracking-widest opacity-60">Global Partners</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {partners.map((p) => (
                <motion.span 
                  key={p} 
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  className="bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors cursor-default"
                >
                  {p}
                </motion.span>
              ))}
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
};

export default BentoHighlights;
