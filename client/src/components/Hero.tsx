import React from 'react';
import { Award, Calendar, Users, Leaf } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Banner Section */}
      <header className="h-[70vh] bg-gradient-to-r from-primary-green/90 to-black/50 bg-cover bg-center flex items-center justify-center text-center px-4" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=80')` }}>
        <div className="max-w-3xl">
          <h2 className="font-serif text-4xl sm:text-6xl text-white font-bold leading-tight mb-4">
            Ancient Wisdom for <br /><span className="text-accent-gold">Modern Healing</span>
          </h2>
          <p className="text-white/90 text-base sm:text-lg max-w-xl mx-auto font-sans">
            Specialized Ayurvedic treatments for chronic diseases in Sitapur.
          </p>
        </div>
      </header>

      {/* Trust Metrics Overlay Banner */}
      <section className="max-w-6xl mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-xl shadow-xl border-b-4 border-accent-gold p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-accent-gold/10 rounded-xl flex items-center justify-center text-primary-green shrink-0">
              <Award size={28} />
            </div>
            <div>
              <h4 className="font-bold text-primary-green text-sm sm:text-base">BAMS, Panchkarma Specialist</h4>
              <p className="text-gray-500 text-xs">Govt. Registered Practitioner</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6">
            <div className="w-14 h-14 bg-accent-gold/10 rounded-xl flex items-center justify-center text-primary-green shrink-0">
              <Calendar size={28} />
            </div>
            <div>
              <h4 className="font-bold text-primary-green text-sm sm:text-base">3+ Years</h4>
              <p className="text-gray-500 text-xs">Clinical Experience</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6">
            <div className="w-14 h-14 bg-accent-gold/10 rounded-xl flex items-center justify-center text-primary-green shrink-0">
              <Users size={28} />
            </div>
            <div>
              <h4 className="font-bold text-primary-green text-sm sm:text-base">500+</h4>
              <p className="text-gray-500 text-xs">Happy Patients</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6">
            <div className="w-14 h-14 bg-accent-gold/10 rounded-xl flex items-center justify-center text-primary-green shrink-0">
              <Leaf size={28} />
            </div>
            <div>
              <h4 className="font-bold text-primary-green text-sm sm:text-base">100% Natural</h4>
              <p className="text-gray-500 text-xs">Ayurvedic Protocols</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};