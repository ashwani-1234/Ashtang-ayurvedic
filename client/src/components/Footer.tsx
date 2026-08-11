import { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onOpenBooking?: () => void;
}

export function Footer({ onOpenBooking }: FooterProps) {
  const [tapCount, setTapCount] = useState(0);

  const handleSecretTap = () => {
    const nextCount = tapCount + 1;
    setTapCount(nextCount);
    
    if (nextCount === 3) {
      setTapCount(0);
      window.location.href = '/admin';
    }

    setTimeout(() => {
      setTapCount(0);
    }, 2000);
  };

  return (
    <footer className="bg-primary-green text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          
          {/* Left Section: Brand & Description */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <h2 className="font-serif text-2xl font-bold text-accent-gold mb-2">
                Ashtang Ayurveda
              </h2>
              <p className="text-sm text-white/90 font-semibold uppercase tracking-widest text-accent-gold/80">
                Clinic, Sitapur
              </p>
            </div>
            <p className="text-sm leading-relaxed text-white/80">
              Traditional Ayurvedic healing combined with personalized care. We specialize in Panchkarma, Agni Karma, and holistic wellness treatments based on your unique Prakriti.
            </p>
            <p className="text-xs text-white/60 mt-4 italic">
              Ayurveda the way of life!
            </p>
          </div>

          {/* Middle Section: Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-lg font-bold text-accent-gold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-white/80 hover:text-accent-gold transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#services" className="text-white/80 hover:text-accent-gold transition-colors duration-200">
                  Services
                </a>
              </li>
              <li>
                <a href="/#conditions" className="text-white/80 hover:text-accent-gold transition-colors duration-200">
                  Conditions We Manage
                </a>
              </li>
              <li>
                <a href="/#blog" className="text-white/80 hover:text-accent-gold transition-colors duration-200">
                  Health Blog
                </a>
              </li>
              <li>
                <a href="/#location" className="text-white/80 hover:text-accent-gold transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section: Contact Information */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-lg font-bold text-accent-gold mb-6">Contact</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-accent-gold shrink-0 mt-0.5" />
                <div>
                  <a 
                    href="tel:+915862315289" 
                    className="text-white/80 hover:text-accent-gold transition-colors duration-200"
                  >
                    +91 5862315289
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="text-accent-gold shrink-0 mt-0.5" />
                <div>
                  <a 
                    href="mailto:info@ashtangayurved.com" 
                    className="text-white/80 hover:text-accent-gold transition-colors duration-200 break-all"
                  >
                    info@ashtangayurved.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-accent-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Civil Lines, Sitapur, UP 261001, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8"></div>

        {/* Bottom Section: Copyright & Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/70">
          <p 
            onClick={handleSecretTap} 
            className="cursor-pointer hover:text-white transition-colors select-none"
          >
            © {new Date().getFullYear()} Ashtang Ayurved Clinic. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            <a href="#" className="text-white/70 hover:text-accent-gold transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-white/70 hover:text-accent-gold transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Medical Disclaimer Bar */}
      <div className="bg-primary-green/80 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-white/75 leading-relaxed">
            <span className="font-semibold text-accent-gold">Medical Disclaimer:</span> The information provided by Ashtang Ayurved is for educational and holistic purposes only. Our treatments are complementary to modern medicine and should not replace professional medical advice. Please consult with our specialists before starting any treatment.
          </p>
        </div>
      </div>
    </footer>
  );
}