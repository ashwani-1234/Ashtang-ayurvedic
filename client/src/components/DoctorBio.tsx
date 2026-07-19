import React from 'react';
import { PhoneCall } from 'lucide-react';

export const DoctorBio: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-bg-cream border-y border-accent-gold/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-accent-gold rounded-2xl -z-10 bg-accent-gold/10"></div>
              <img 
                src="Dr BP Maurya.jpeg" 
                alt="Dr. Brahma Prakash Maurya" 
                className="rounded-2xl shadow-lg w-full max-w-sm object-cover aspect-[4/5]"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <span className="text-accent-gold font-bold uppercase tracking-widest text-xs">Expert Care</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary-green mt-2 mb-6">
              Ashtang Ayurveda Clinic Specialist
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong className="text-primary-green font-semibold">Dr. Brahma Prakash Maurya (B.A.M.S.)</strong> is a dedicated Consultant Ayurvedic Physician and Panchakarma Expert and the Founder of Ashtang Ayurveda Clinic, Sitapur, Uttar Pradesh. He is committed to delivering authentic Ayurvedic healthcare by combining the timeless principles of Ayurveda with a patient-centered approach to diagnosis and treatment. <p className="text-gray-700 leading-relaxed mb-6"><strong className="text-primary-green font-semibold">Dr. Maurya</strong> believes that every individual is unique, and effective treatment begins with understanding the patient's Prakriti (body constitution), Dosha imbalance, lifestyle, and underlying cause of illness. Rather than focusing only on symptom relief, he aims to restore the body's natural balance and promote long-term health through personalized Ayurvedic care.</p>
            </p>
            <p className="font-serif font-bold text-xl text-primary-green mb-8">
              — Dr. Brahma Prakash Maurya
            </p>
            
            <a 
              href="tel:+918052899698" 
              className="inline-flex items-center gap-2 bg-primary-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-green/90 transition shadow-md"
            >
              <PhoneCall size={18} className="text-accent-gold" />
              Call for Appointment
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};