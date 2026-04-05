import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, Briefcase, Calendar, Tag, ChevronRight, Building2 } from 'lucide-react';

/* ─── Constants ─────────────────────────────────────────── */
const START_YEAR = 1996;
const END_YEAR   = 2025;
const YEARS      = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i);

/* ─── Helpers ────────────────────────────────────────────── */
const pct = (year) => ((year - START_YEAR) / (END_YEAR - START_YEAR)) * 100;

/* ─── Category chip colour map ───────────────────────────── */
const catColor = {
  Research:         { bg: '#ede9fe', text: '#6d28d9' },
  Evaluation:       { bg: '#dbeafe', text: '#1d4ed8' },
  Assessment:       { bg: '#fce7f3', text: '#9d174d' },
  Survey:           { bg: '#d1fae5', text: '#065f46' },
  Advisory:         { bg: '#fef3c7', text: '#92400e' },
  Gender:           { bg: '#fce7f3', text: '#9d174d' },
  'Capacity Building': { bg: '#e0f2fe', text: '#0369a1' },
  'DRR/Survey':     { bg: '#ffedd5', text: '#9a3412' },
};

/* ─── Detail Panel ───────────────────────────────────────── */
const DetailPanel = ({ item, onClose }) => (
  <AnimatePresence>
    {item && (
      <>
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="exp-overlay"
        />
        <motion.div
          key="panel"
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="exp-panel"
        >
          <button className="exp-panel-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>

          {/* colour bar top */}
          <div className="exp-panel-accent" style={{ background: item.color }} />

          <div className="exp-panel-body">
            <span className="exp-period-badge">
              <Calendar size={12} /> {item.period}
            </span>
            <h3 className="exp-panel-role">{item.role}</h3>
            <p className="exp-panel-company">
              <Building2 size={14} style={{ display: 'inline', marginRight: 6 }} />
              {item.company}
            </p>
            <p className="exp-panel-details">{item.details}</p>
            <div className="exp-tags">
              {item.tech.map((t) => (
                <span key={t} className="exp-tag">{t}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

/* ─── Consultancy Card ───────────────────────────────────── */
const ConsultCard = ({ c, i }) => {
  const cc = catColor[c.category] || { bg: '#f3f4f6', text: '#374151' };
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: i * 0.04 }}
      className="consult-card"
    >
      <span className="consult-cat-chip" style={{ background: cc.bg, color: cc.text }}>
        {c.category}
      </span>
      <p className="consult-title">{c.title}</p>
      <div className="consult-meta">
        <span className="consult-role">
          <ChevronRight size={12} /> {c.role}
        </span>
        <span className="consult-client">{c.client}</span>
        <span className="consult-year">{c.year}</span>
      </div>
    </motion.div>
  );
};

/* ─── Main Component ─────────────────────────────────────── */
const ExperienceCalendar = ({ experience = [], consultancies = [] }) => {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState('gantt');  // 'gantt' | 'consult'
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="exp-section">
      {/* ─── Header ─── */}
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="exp-header"
        >
          <div>
            <h2 className="exp-heading">Experience</h2>
            <p className="exp-subheading">
              30+ years across grassroots to international advisory — rendered as a living calendar.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="exp-tabs">
            <button
              className={`exp-tab${activeTab === 'gantt' ? ' active' : ''}`}
              onClick={() => setActiveTab('gantt')}
            >
              <Briefcase size={14} /> Career Timeline
            </button>
            <button
              className={`exp-tab${activeTab === 'consult' ? ' active' : ''}`}
              onClick={() => setActiveTab('consult')}
            >
              <Tag size={14} /> Consultancies
            </button>
          </div>
        </motion.div>

        {/* ─── Gantt Calendar View ─── */}
        <AnimatePresence mode="wait">
          {activeTab === 'gantt' && (
            <motion.div
              key="gantt"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Year ruler */}
              <div className="gantt-ruler-wrap">
                <div className="gantt-label-col" />
                <div className="gantt-ruler">
                  {YEARS.filter((y) => y % 5 === 0 && y !== END_YEAR).map((y) => (
                    <div
                      key={y}
                      className="gantt-year-tick"
                      style={{ left: `${pct(y)}%` }}
                    >
                      {y}
                    </div>
                  ))}
                  {/* Today marker at the very end */}
                  <div
                    className="gantt-today"
                    style={{ left: `100%`, opacity: 1, borderLeftColor: '#22c55e' }}
                  >
                    <span className="gantt-today-label" style={{ transform: 'translateX(-110%)', marginLeft: '-4px', color: '#16a34a' }}>
                      Current Progress
                    </span>
                  </div>
                </div>
              </div>

              {/* Rows */}
              <div className="gantt-rows">
                {experience.map((item, i) => {
                  const left  = pct(item.startYear);
                  const width = Math.max(pct(item.endYear + 1) - pct(item.startYear), 1.5);
                  return (
                    <motion.div
                      key={item.id}
                      className="gantt-row"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Left label */}
                      <div className="gantt-label-col">
                        <p className="gantt-label-role">{item.role}</p>
                        <p className="gantt-label-org">{item.company}</p>
                      </div>

                      {/* Bar track */}
                      <div className="gantt-track">
                        {/* background grid lines */}
                        {YEARS.filter((y) => y % 2 === 0).map((y) => (
                          <div
                            key={y}
                            className="gantt-grid-line"
                            style={{ left: `${pct(y)}%` }}
                          />
                        ))}

                        <motion.button
                          className="gantt-bar"
                          style={{
                            left: `${left}%`,
                            width: `${width}%`,
                            background: item.color,
                          }}
                          whileHover={{ scaleY: 1.18, filter: 'brightness(1.12)' }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setSelected(item)}
                          title={`${item.role} — ${item.period}`}
                        >
                          <span className="gantt-bar-label">{item.company}</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <p className="gantt-hint">Click any bar to see details →</p>
            </motion.div>
          )}

          {/* ─── Consultancies Grid ─── */}
          {activeTab === 'consult' && (
            <motion.div
              key="consult"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="consult-grid"
            >
              {consultancies.map((c, i) => (
                <ConsultCard key={i} c={c} i={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Slide-in Detail Panel ─── */}
      <DetailPanel item={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default ExperienceCalendar;
