import { AdminDashboard } from './components/AdminDashboard';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { DoctorBio } from './components/DoctorBio';
import { Location } from './components/Location';
import { Reviews } from './components/Reviews';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { BookingPage } from './components/BookingPage';
import { PrakritiTest } from './components/PrakritiTest';
import { ConditionsWeManage } from './components/ConditionsWeManage';
import { HealthBlog } from './components/HealthBlog';
// Homepage Component Wrapper
const HomePage: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => (
  <>
    <Hero />
    <PrakritiTest onOpenBooking={onOpenModal} />
    <ConditionsWeManage onOpenBooking={() => setIsModalOpen(true)} />
    <Services />
    <DoctorBio />
    <HealthBlog onOpenBooking={() => setIsBookingOpen(true)} />
    <Location />
    <Reviews />
  </>
);

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-bg-cream font-sans text-text-dark selection:bg-accent-gold selection:text-primary-green flex flex-col justify-between">
        
        {/* Navbar stays visible across all pages! */}
        <Navbar onOpenBooking={() => setIsModalOpen(true)} />
        
        <main className="flex-grow">
          <Routes>
            {/* Route 1: Main Landing Page */}
            <Route path="/" element={<HomePage onOpenModal={() => setIsModalOpen(true)} />} />
            
            {/* Route 2: Standalone Booking Page */}
            <Route path="/book" element={<BookingPage />} />
            {/* Route 3: Doctor Admin Dashboard */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        
        <Footer onOpenBooking={() => setIsModalOpen(true)} />

        {/* Interactive Booking Modal (For quick popup bookings on Home) */}
        <BookingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />

        {/* Floating WhatsApp Action Button */}
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