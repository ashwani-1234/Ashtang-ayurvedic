import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PhoneCall, X } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { DoctorBio } from './components/DoctorBio';
import { Location } from './components/Location';
import { Footer } from './components/Footer';
import { PrakritiTest } from './components/PrakritiTest';
import { ConditionsWeManage } from './components/ConditionsWeManage';
import { HealthBlog } from './components/HealthBlog';
import { AdminDashboard } from './components/AdminDashboard';
import { SeasonalWellness } from './components/SeasonalWellness';
import { AnimatedBackground } from './components/AnimatedBackground';
import { PatientResources } from './components/PatientResources';

const HomePage: React.FC = () => (
  <>
    <Hero />
    <PrakritiTest />
    <ConditionsWeManage />
    <Services />
    <DoctorBio />
    <SeasonalWellness />
    <PatientResources />
    <HealthBlog />
    <Location />
  </>
);

export default function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowPopup(true), 800);
    return () => window.clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-bg-cream font-sans text-text-dark selection:bg-accent-gold selection:text-primary-green flex flex-col justify-between">
        <AnimatedBackground/>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />

        {showPopup && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-6">
            <div className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-white p-6 shadow-2xl sm:p-8">
              <button
                onClick={handleClose}
                className="absolute right-3 top-3 rounded-full bg-[#f9f5ea] p-2 text-[#3d4f3c] transition hover:bg-[#efe5ca]"
                aria-label="Close popup"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 text-[#3d4f3c]">
                <div className="rounded-full bg-[#f6e8b9] p-3 text-[#8f6d1a]">
                  <PhoneCall size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8f6d1a]">
                    New Branch Coming Soon
                  </p>
                  <h2 className="text-2xl font-bold text-[#3d4f3c]">We’re coming soon in Lakhimpur Kheri</h2>
                </div>
              </div>

              <p className="mt-4 text-base leading-7 text-[#4f5c4a]">
                Our new clinic branch will soon be available in Lakhimpur Kheri. For early details, appointments, or location updates, please call us directly.
              </p>

              <div className="mt-6 flex justify-center sm:justify-start">
                <a
                  href="tel:+915862315289"
                  className="inline-flex items-center justify-center rounded-full bg-[#3d4f3c] px-5 py-3 font-semibold text-white transition hover:bg-[#2f3f2f]"
                >
                  Call us now
                </a>
              </div>
            </div>
          </div>
        )}

        <a
          href="https://wa.me/918052899698"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 bg-[#25d366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-200 z-50 flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="fill-current">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </a>
      </div>
    </Router>
  );
}