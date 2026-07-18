import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenBooking?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to handle booking action cleanly depending on what page the user is on
  const handleBookingClick = () => {
    setIsOpen(false);
    if (onOpenBooking) {
      onOpenBooking(); // Open modal if provided
    } else {
      navigate('/book'); // Otherwise redirect to dedicated /book page
    }
  };

  return (
    <nav className="bg-primary-green sticky top-0 z-50 border-b-3 border-accent-gold py-3 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* Logo Section - Links back to Home */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-accent-gold/20 rounded-full flex items-center justify-center text-accent-gold font-serif font-bold text-2xl shrink-0">
            A
          </div>
          <div className="min-w-0">
            <span className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide block truncate">
              Ashtang <span className="text-accent-gold">Ayurvedic</span>
            </span>
            <p className="text-[#a0aec0] text-[0.65rem] uppercase tracking-[2px] -mt-0.5 truncate">
              clinic, Sitapur
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-6 xl:space-x-8 font-sans font-semibold text-sm shrink-0">
          <li><Link to="/" className="text-white hover:text-accent-gold transition">HOME</Link></li>
          <li><a href="/#about" className="text-white hover:text-accent-gold transition">THE DOCTOR</a></li>
          <li><a href="/#services" className="text-white hover:text-accent-gold transition">TREATMENTS</a></li>
          <li><a href="/#location" className="text-white hover:text-accent-gold transition">FIND US</a></li>
          <li>
            <button 
              onClick={handleBookingClick}
              type="button"
              className="bg-accent-gold text-primary-green px-4 py-2.5 rounded font-bold uppercase hover:brightness-110 transition shadow-sm whitespace-nowrap block cursor-pointer"
            >
              Book Consultation
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="lg:hidden text-accent-gold focus:outline-none shrink-0 ml-4"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-primary-green border-b border-accent-gold px-4 pt-2 pb-6 space-y-3 text-center">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-white py-2 font-semibold hover:text-accent-gold transition">HOME</Link>
          <a href="/#about" onClick={() => setIsOpen(false)} className="block text-white py-2 font-semibold hover:text-accent-gold transition">THE DOCTOR</a>
          <a href="/#services" onClick={() => setIsOpen(false)} className="block text-white py-2 font-semibold hover:text-accent-gold transition">TREATMENTS</a>
          <a href="/#location" onClick={() => setIsOpen(false)} className="block text-white py-2 font-semibold hover:text-accent-gold transition">FIND US</a>
          
          <button 
            onClick={handleBookingClick} 
            type="button"
            className="inline-block bg-accent-gold text-primary-green px-6 py-2.5 rounded font-bold uppercase w-full mt-2 whitespace-nowrap cursor-pointer"
          >
            Book Consultation
          </button>
        </div>
      )}
    </nav>
  );
};