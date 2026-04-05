import React, { useState, useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import BentoHighlights from './components/BentoHighlights'
import LogoCarousel from './components/LogoCarousel'
import ExperienceCalendar from './components/ExperienceCalendar'
import ResearchGrid from './components/ResearchGrid'
import BookSection from './components/BookSection'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import EyeOpening from './components/EyeOpening'
import { cvData } from './data/cvData'
import './App.css'

function App() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.08
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-white text-gray-900 min-h-screen font-body overflow-x-hidden selection:bg-green-200">
      <EyeOpening onComplete={() => setIntroDone(true)} />
      <Navbar />
      <Hero data={cvData} />
      <About />
      <BentoHighlights />
      <LogoCarousel />
      <ExperienceCalendar experience={cvData.experience} consultancies={cvData.consultancies} />
      <BookSection publications={cvData.publications} />
      <Gallery items={cvData.gallery} />
      <Contact data={cvData} />
    </main>
  )
}

export default App
