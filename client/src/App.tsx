import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const HomePage: React.FC = () => (
  <>
    <Hero />
    <PrakritiTest />
    <ConditionsWeManage />
    <Services />
    <DoctorBio />
    <HealthBlog />
    <Location />
  </>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg-cream font-sans text-text-dark selection:bg-accent-gold selection:text-primary-green flex flex-col justify-between">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />

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