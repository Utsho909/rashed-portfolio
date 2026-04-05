import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, Building2, User, CheckCircle2 } from 'lucide-react';
import { cvData } from '../data/cvData';

const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-300 font-bold text-sm uppercase tracking-wider ${
      active 
        ? 'bg-green-600 text-white shadow-xl shadow-green-100 scale-105' 
        : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-gray-100'
    }`}
  >
    <Icon size={18} />
    {label}
  </button>
);

const About = () => {
  const [activeTab, setActiveTab] = useState('bio');

  const tabContent = {
    bio: (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6 text-gray-700 leading-relaxed text-lg"
      >
        <p>
          With Master’s degrees in Economics and Development Studies, I bring over 25 years of experience in the development sector, working from grassroots to senior advisory roles with national and international organizations.
        </p>
        <p>
          My expertise includes program design and management, monitoring, evaluation and learning (MEL), research, advocacy, and capacity development across diverse thematic areas such as human rights, gender equality, child rights, disability inclusion, and climate change adaptation.
        </p>
        <p>
          I am currently pursuing a Postgraduate Diploma in Disaster Management at The Academy of Environmental Explore (AEE), expected June 2026.
        </p>
      </motion.div>
    ),
    education: (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="grid gap-6"
      >
        {cvData.education.map((edu, idx) => (
          <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-xl text-green-600">
              <GraduationCap size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-xl">{edu.degree}</h4>
              <p className="text-gray-600 font-medium">{edu.institution}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-400">
                {edu.year}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    ),
    training: (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="grid gap-4"
      >
        {cvData.training.map((trn, idx) => (
          <div key={idx} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 soft-shadow">
            <CheckCircle2 className="text-green-600 shrink-0" size={20} />
            <div>
               <p className="font-bold text-gray-900">{trn.name}</p>
               <p className="text-sm text-gray-500">{trn.institution} • {trn.year}</p>
            </div>
          </div>
        ))}
      </motion.div>
    ),

  };

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50" />
      
      <div className="container relative z-10">
        <div className="max-w-4xl mb-16">
          <h6 className="text-green-600 font-bold uppercase tracking-[0.3em] text-xs mb-4">Discovery</h6>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">About Me</h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            A seasoned professional with over two decades of experience in the international development and human rights landscape.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr,2fr] gap-12 items-start">
          {/* Tabs Sidebar */}
          <div className="flex flex-col gap-4">
            <TabButton 
              active={activeTab === 'bio'} 
              onClick={() => setActiveTab('bio')} 
              icon={User} 
              label="Biography" 
            />
            <TabButton 
              active={activeTab === 'education'} 
              onClick={() => setActiveTab('education')} 
              icon={GraduationCap} 
              label="Education" 
            />
            <TabButton 
              active={activeTab === 'training'} 
              onClick={() => setActiveTab('training')} 
              icon={Award} 
              label="Training" 
            />

          </div>

          {/* Content Area */}
          <div className="min-h-[400px] bg-gray-50/50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100">
            <AnimatePresence mode="wait">
              <div key={activeTab}>
                {tabContent[activeTab]}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
