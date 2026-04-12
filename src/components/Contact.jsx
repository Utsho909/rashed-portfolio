import React from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Linkedin = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Contact = ({ data }) => {
  return (
    <footer id="contact" className="section-padding bg-[#f4f7f4] text-gray-900 border-t border-gray-200">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8">
              Let's Connect
            </h2>
            <p className="text-lg text-gray-600 font-medium max-w-md leading-relaxed">
              Passionate about inclusive, rights-based, and climate-resilient development. Always open to discussing new opportunities or collaborating.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6 group cursor-pointer bg-white p-6 rounded-3xl soft-border soft-shadow-hover transition-all">
              <div className="w-12 h-12 bg-green-50 text-green-700 rounded-full flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                <p className="text-lg font-bold text-gray-800">{data.contact.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group cursor-pointer bg-white p-6 rounded-3xl soft-border soft-shadow-hover transition-all">
              <div className="w-12 h-12 bg-green-50 text-green-700 rounded-full flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Phone</p>
                <p className="text-lg font-bold text-gray-800">{data.contact.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group cursor-pointer bg-white p-6 rounded-3xl soft-border soft-shadow-hover transition-all">
              <div className="w-12 h-12 bg-green-50 text-green-700 rounded-full flex items-center justify-center shrink-0">
                <Linkedin size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">LinkedIn</p>
                <p className="text-lg font-bold text-gray-800">{data.contact.linkedin}</p>
              </div>
            </div>


          </div>
        </div>

        {/* Big CTA */}
        <div className="mt-32 pt-16 border-t border-gray-200 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-2xl">
            <h3 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
              Interested in a detailed profile?
            </h3>
            <a href="/cv.pdf" download className="flex items-center gap-4 px-8 py-5 bg-green-700 text-white rounded-full font-bold shadow-xl shadow-green-900/20 hover:scale-105 transition-all w-fit">
              <span>Download Full Curriculum Vitae</span>
              <ArrowRight size={20} />
            </a>
          </div>

          <div className="text-left md:text-right text-gray-500">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] mb-2 text-gray-400">© 2026</p>
            <p className="text-lg font-bold text-gray-700">A M Rasheduzzaman Khan</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
