import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PatientBookingForm } from './PatientBookingForm';
import { ArrowLeft, ShieldCheck, Clock, Award } from 'lucide-react';

export const BookingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Bar / Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary-green font-semibold text-sm hover:text-accent-gold transition"
          >
            <ArrowLeft size={18} />
            <span>Back to Clinic Homepage</span>
          </Link>
          <span className="text-xs uppercase tracking-widest text-gray-400 font-bold hidden sm:inline-block">
            Secure Clinical Portal
          </span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-primary-green mb-3">
            Schedule Your Consultation
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base font-sans">
            Take the first step toward natural, root-cause healing with Dr. Brahma Prakash Maurya at our Sitapur clinic.
          </p>
        </div>

        {/* Main Form Component */}
        <div className="mb-12">
          <PatientBookingForm onSuccess={() => navigate('/')} />
        </div>

        {/* Trust Badges Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-accent-gold/20 text-center">
          <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-xs border border-gray-100">
            <ShieldCheck className="w-8 h-8 text-accent-gold mb-2" />
            <h4 className="font-bold text-primary-green text-sm">100% Confidential</h4>
            <p className="text-xs text-gray-500 mt-1">Your medical symptoms and personal records are strictly protected.</p>
          </div>

          <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-xs border border-gray-100">
            <Clock className="w-8 h-8 text-accent-gold mb-2" />
            <h4 className="font-bold text-primary-green text-sm">Zero Waiting Room Time</h4>
            <p className="text-xs text-gray-500 mt-1">Pre-booked Panchkarma and Agni Karma sessions receive priority room allocation.</p>
          </div>

          <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-xs border border-gray-100">
            <Award className="w-8 h-8 text-accent-gold mb-2" />
            <h4 className="font-bold text-primary-green text-sm">Govt. Certified Practitioner</h4>
            <p className="text-xs text-gray-500 mt-1">All procedures follow authentic, standardized BAMS Ayurvedic protocols.</p>
          </div>
        </div>

      </div>
    </div>
  );
};