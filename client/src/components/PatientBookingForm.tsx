import React from 'react';
import { MessageCircle, Phone, Stethoscope } from 'lucide-react';

export const PatientBookingForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const handleContact = () => {
    onSuccess?.();
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-t-4 border-accent-gold max-w-xl mx-auto">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-accent-gold/15 rounded-full flex items-center justify-center mx-auto mb-3 text-primary-green">
          <Stethoscope size={24} />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary-green">
          Consultation Booking
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
          Booking is currently handled directly through WhatsApp for a faster and simpler response.
        </p>
      </div>

      <div className="space-y-3">
        <a
          href="https://wa.me/918052899698?text=नमस्ते%20डॉक्टर,%20मैं%20परामर्श%20के%20लिए%20संपर्क%20करना%20चाहता/चाहती%20हूं।"
          target="_blank"
          rel="noreferrer"
          onClick={handleContact}
          className="flex items-center justify-center gap-2 w-full bg-[#25d366] text-white font-bold py-3.5 rounded-lg shadow-md hover:brightness-110 transition"
        >
          <MessageCircle size={18} />
          Chat on WhatsApp
        </a>

        <a
          href="tel:+918052899698"
          onClick={handleContact}
          className="flex items-center justify-center gap-2 w-full border border-gray-200 text-primary-green font-semibold py-3 rounded-lg hover:bg-gray-50 transition"
        >
          <Phone size={18} />
          Call Clinic
        </a>
      </div>
    </div>
  );
};