import React from 'react';
import { motion } from 'framer-motion';

const TOKEN = 'pk_Um-vMvqaQCigRL7KPksHIw';
const logoUrl = (name) => `https://img.logo.dev/name/${encodeURIComponent(name)}?token=${TOKEN}&size=100`;

const orgs = [
  { name: 'UNICEF', query: 'UNICEF' },
  { name: 'UNDP', query: 'undp' },
  { name: 'UNFPA', query: 'UNFPA' },
  { name: 'USAID', query: 'USAID' },
  { name: 'Oxfam', query: 'Oxfam' },
  { name: 'BRAC', query: 'BRAC' },
  { name: 'World Vision', query: 'World Vision Bangladesh' },
  { name: 'Save the Children', query: 'Save the Children' },
  { name: 'GIZ', query: 'GIZ' },
  { name: 'Winrock International', query: 'Winrock International' },
  { name: 'CBM Global', query: 'CBM Global Disability' },
  { name: 'Diakonia', query: 'Diakonia' },
  { name: 'Caritas', query: 'Caritas Bangladesh' },
  { name: 'Swiss Red Cross', query: 'redcross.ch' },
  { name: 'Right Livelihood', query: 'Right Livelihood Foundation' },
  { name: 'Nippon Foundation', query: 'Nippon Foundation' },
  { name: 'YWCA', query: 'YWCA' },
  { name: 'Comilla University', query: 'Comilla University' },
  { name: 'TIB', query: 'Transparency International Bangladesh' },
  { name: 'ASK', query: 'Ain o Salish Kendra' },
  { name: 'GSS', query: 'Gonoshahajjo Sangstha' },
  { name: 'MJF', query: 'Manusher Jonno Foundation' },
  { name: 'MSF', query: 'Manabadhikar Shongskriti Foundation' },
  { name: 'BNWLA', query: 'Bangladesh National Women Lawyers Association' },
  { name: 'BNPS', query: 'Bangladesh Nari Progati Sangha' },
  { name: 'CDD', query: 'Centre for Disability in Development' },
  { name: 'NRECA International', query: 'NRECA International' },
  { name: 'FNF', query: 'Friedrich Naumann Foundation' },
  { name: 'Human Dynamics', query: 'Human Dynamics' },
  { name: 'Baptist Aid', query: 'Baptist Aid' },
  { name: 'World Concern', query: 'World Concern' },
  { name: 'Lepra', query: 'Lepra' },
];

const doubled = [...orgs, ...orgs];

const OrgLogo = ({ org }) => {
  const [imgFailed, setImgFailed] = React.useState(false);

  return (
    <div className="group flex-shrink-0 flex flex-col items-center justify-center gap-2 mx-6 w-36 h-24 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 px-4 overflow-hidden">
      {!imgFailed ? (
        <img
          src={logoUrl(org.query)}
          alt={`${org.name} logo`}
          onError={() => setImgFailed(true)}
          className="max-h-10 max-w-[110px] object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-300"
        />
      ) : (
        <span className="text-sm font-black text-gray-500 group-hover:text-green-700 text-center leading-tight transition-colors">
          {org.name}
        </span>
      )}
    </div>
  );
};

const LogoCarousel = () => {
  return (
    <section className="py-20 bg-gray-50/80 overflow-hidden border-y border-gray-100">
      <div className="container mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 mb-4">Collaborated With</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Trusted by Leading Organizations
          </h2>
        </motion.div>
      </div>

      {/* Row 1 — scroll left */}
      <div className="relative mb-4 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {doubled.map((org, i) => <OrgLogo key={`r1-${i}`} org={org} />)}
        </motion.div>
      </div>

      {/* Row 2 — scroll right */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {[...doubled].reverse().map((org, i) => <OrgLogo key={`r2-${i}`} org={org} />)}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoCarousel;
