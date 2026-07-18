import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Location: React.FC = () => {
  return (
    <section id="location" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-serif text-3xl sm:text-4xl font-bold text-primary-green mb-12">
          Visit Our Clinic
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Map Frame */}
          <div className="lg:col-span-7 bg-gray-100 rounded-2xl overflow-hidden shadow-md h-[400px]">
            <iframe 
              title="Ashtang Ayurved Clinic Location"
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.8578748717464!2d80.67232437491805!3d27.566921031671956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399ed7002615977b%3A0xf498e1e6c9c379ab!2sAshtang%20ayurvedic%20clinic!5e0!3m2!1sen!2sin!4v1783910893569!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy"
            ></iframe>
          </div>

          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-bg-cream p-8 rounded-2xl border-t-4 border-accent-gold shadow-lg space-y-6">
            <h3 className="font-serif text-2xl font-bold text-primary-green">Contact Information</h3>
            
            <div className="flex items-start gap-4 text-sm sm:text-base">
              <MapPin className="text-accent-gold shrink-0 mt-1" size={22} />
              <div>
                <strong className="block text-primary-green">Address:</strong>
                <span className="text-gray-600">House no 43, infront of SBI agri bank, Civil Lines, near Siddheswar Nath Mandir, Prem Nagar, Sitapur, UP 261001</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm sm:text-base">
              <Phone className="text-accent-gold shrink-0" size={22} />
              <div>
                <strong className="block text-primary-green">Phone:</strong>
                <a href="tel:+918052899698" className="text-gray-600 hover:text-primary-green">+91 8052899698</a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm sm:text-base">
              <Mail className="text-accent-gold shrink-0" size={22} />
              <div>
                <strong className="block text-primary-green">Email:</strong>
                <span className="text-gray-600">info@ashtangayurved.com</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm sm:text-base">
              <Clock className="text-accent-gold shrink-0" size={22} />
              <div>
                <strong className="block text-primary-green">Hours:</strong>
                <span className="text-gray-600">Mon - Sat: 10:00 AM - 7:00 PM</span>
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