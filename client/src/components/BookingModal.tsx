import React from 'react';
import { X } from 'lucide-react';
import { PatientBookingForm } from './PatientBookingForm';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 animate-fadeIn">
        {/* Floating Close Button */}
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 sm:-right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-md transition cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Render our standalone form inside the modal! */}
        <div className="max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl">
          <PatientBookingForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
};