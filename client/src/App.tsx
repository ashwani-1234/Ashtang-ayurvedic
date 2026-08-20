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
import { BlogPage } from './pages/BlogPage';
import { AdminDashboard } from './components/AdminDashboard';
import { SeasonalWellness } from './components/SeasonalWellness';
import { AnimatedBackground } from './components/AnimatedBackground';
import { PatientResources } from './components/PatientResources';
import { VisualSymptomLocator } from './components/VisualSymptomLocator';
import { ShareButton } from './components/ShareButton';

const HomePage: React.FC = () => (
  <>
    <Hero />
    <PatientResources />
    <PrakritiTest />
    <ConditionsWeManage />
    <VisualSymptomLocator />
    <Services />
    <DoctorBio />
    <SeasonalWellness />
    <HealthBlog previewMode={true} />
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
            <Route path="/blog" element={<BlogPage />} />
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

        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
          {/* The Smart Share Button! */}
          <ShareButton
            title="Ayurvedic Diet for Monsoon"
            text="Read this amazing article by Dr. Maurya on what to eat during the rainy season!"
            className="p-2.5"
          />

          <a
            href="https://www.instagram.com/ashtang.ayurved?igsh=Y3lwb2JsaXEzbml3"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Instagram"
            className="group relative bg-[#E4405F] text-white p-2.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center justify-center"
          >
            <span className="pointer-events-none absolute right-full mr-2 hidden rounded-full bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:block group-hover:opacity-100">
              Instagram
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="text-white">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5Zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5Zm5.5-.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
            </svg>
          </a>

          <a
            href="https://www.facebook.com/share/1K5oAjXTjL/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Facebook"
            className="group relative bg-[#1877F2] text-white p-2.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center justify-center"
          >
            <span className="pointer-events-none absolute right-full mr-2 hidden rounded-full bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:block group-hover:opacity-100">
              Facebook
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="text-white">
              <path d="M13.5 22V13.25h2.84l.43-3.33h-3.27V7.44c0-.96.27-1.62 1.67-1.62h1.79V2.12A24.18 24.18 0 0 0 14.3 2c-2.98 0-5.02 1.82-5.02 5.16v2.88H6.5v3.33h2.78V22h4.22Z" />
            </svg>
          </a>

          <a
            href="https://wa.me/918052899698"
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="group relative bg-[#25d366] text-white p-2.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center justify-center"
          >
            <span className="pointer-events-none absolute right-full mr-2 hidden rounded-full bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:block group-hover:opacity-100">
              WhatsApp
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </a>
        </div>
      </div>
    </Router>
  );
}