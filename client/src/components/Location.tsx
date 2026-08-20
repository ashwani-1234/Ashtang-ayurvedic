import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface BranchInfo {
  id: 'sitapur' | 'lakhimpur';
  name: string;
  mapSrc: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export const Location: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<'sitapur' | 'lakhimpur'>('sitapur');

  const branches: Record<'sitapur' | 'lakhimpur', BranchInfo> = {
    sitapur: {
      id: 'sitapur',
      name: 'Sitapur Branch',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.8578748717464!2d80.67232437491805!3d27.566921031671956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399ed7002615977b%3A0xf498e1e6c9c379ab!2sAshtang%20ayurvedic%20clinic!5e0!3m2!1sen!2sin!4v1783910893569!5m2!1sen!2sin',
      address: 'House no 43, infront of SBI agri bank, Civil Lines, near Siddheswar Nath Mandir, Prem Nagar, Sitapur, UP 261001',
      phone: '+91 5862315289',
      email: 'info@ashtangayurved.com',
      hours: 'Mon - Sat: 10:00 AM - 7:00 PM'
    },
    lakhimpur: {
      id: 'lakhimpur',
      name: 'Lakhimpur Branch',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3524.9881308258596!2d80.78353157452905!3d27.933009115504202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399f35ab7ec4a1a1%3A0xfe56d22186e6c51c!2sAshtang%20Ayurveda%20clinic!5e0!3m2!1sen!2sin!4v1786421624928!5m2!1sen!2sin',
      address: 'Kalkari hospital k piche, Nahariya Rd, behind Awas vikas colony, near jawa agency, Awas Vikas Colony, Lakhimpur, Uttar Pradesh 262701',
      phone: '+91 5862315289',
      email: 'info@ashtangayurved.com',
      hours: 'Every Sunday: 10:00 AM - 6:00 PM'
    }
  };

  const currentBranch = branches[selectedBranch];

  return (
    <section id="location" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-serif text-3xl sm:text-4xl font-bold text-primary-green mb-8 sm:mb-10 lg:mb-12">
          Visit Our Clinic
        </h2>

        {/* Branch Selector Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full bg-gray-100 p-1 border border-gray-200">
            {Object.values(branches).map((branch) => (
              <button
                key={branch.id}
                onClick={() => setSelectedBranch(branch.id)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  selectedBranch === branch.id
                    ? 'bg-primary-green text-white shadow-md'
                    : 'bg-transparent text-gray-700 hover:text-primary-green'
                }`}
              >
                {branch.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Map Frame */}
          <div className="lg:col-span-7 bg-gray-100 rounded-2xl overflow-hidden shadow-md h-[400px]">
            <iframe 
              title={`${currentBranch.name} Location`}
              src={currentBranch.mapSrc}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>

          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-bg-cream p-8 rounded-2xl border-t-4 border-accent-gold shadow-lg space-y-6">
            <h3 className="font-serif text-2xl font-bold text-primary-green">{currentBranch.name}</h3>
            
            <div className="flex items-start gap-4 text-sm sm:text-base">
              <MapPin className="text-accent-gold shrink-0 mt-1" size={22} />
              <div>
                <strong className="block text-primary-green">Address:</strong>
                <span className="text-gray-600">{currentBranch.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm sm:text-base">
              <Phone className="text-accent-gold shrink-0" size={22} />
              <div>
                <strong className="block text-primary-green">Phone:</strong>
                <a href={`tel:${currentBranch.phone.replace(/\s+/g, '')}`} className="text-gray-600 hover:text-primary-green">
                  {currentBranch.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm sm:text-base">
              <Mail className="text-accent-gold shrink-0" size={22} />
              <div>
                <strong className="block text-primary-green">Email:</strong>
                <a href={`mailto:${currentBranch.email}`} className="text-gray-600 hover:text-primary-green">
                  {currentBranch.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm sm:text-base">
              <Clock className="text-accent-gold shrink-0" size={22} />
              <div>
                <strong className="block text-primary-green">Hours:</strong>
                <span className="text-gray-600">{currentBranch.hours}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 text-xs text-gray-500 italic">
              *Prior booking is highly recommended for Panchkarma and Agni Karma sessions.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};