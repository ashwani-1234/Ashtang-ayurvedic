import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
/*import { StaffLogin } from './pages/StaffLogin';
import { StaffDashboard } from './pages/StaffDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';*/
import { AdminDashboard } from './components/AdminDashboard';
import { SeasonalWellness } from './components/SeasonalWellness';
import { AnimatedBackground } from './components/AnimatedBackground';
import { PatientResources } from './components/PatientResources';
import { VisualSymptomLocator } from './components/VisualSymptomLocator';
import { ShareButton } from './components/ShareButton';
import { LakhimpurBranch } from './pages/LakhimpurBranch';
import { CaseStudies } from './components/CaseStudies';
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
    <section className="bg-[#1a3b2b] border-t border-[#c59e5e]/20 px-4 py-10 text-center sm:py-12">
      <div className="mx-auto max-w-3xl">
        <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#c59e5e]">
          Real Clinical Results
        </span>
        <h2 className="mb-6 font-serif text-3xl font-bold text-white sm:text-4xl">
          Don't just take our word for it.
        </h2>
        <p className="mb-10 text-lg leading-relaxed text-gray-300">
          Read detailed medical case studies on how we successfully treat severe Arthritis, Sciatica, and Skin Disorders using root-cause Ayurveda.
        </p>
        <Link
          to="/case-studies"
          className="inline-block rounded-full bg-[#c59e5e] px-8 py-4 font-bold text-[#1a3b2b] shadow-lg transition-all hover:-translate-y-1 hover:bg-[#b08d53] hover:shadow-xl"
        >
          Read Healing Journeys -&gt;
        </Link>
      </div>
    </section>
  </>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg-cream font-sans text-text-dark selection:bg-accent-gold selection:text-primary-green flex flex-col justify-between">
        <AnimatedBackground/>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/lakhimpur-kheri" element={<LakhimpurBranch />}/>
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />

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