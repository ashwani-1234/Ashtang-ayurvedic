import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111] text-[#999] py-16 text-center border-t border-gray-800">
      <div className="max-w-3xl mx-auto px-6">
        <h4 className="text-accent-gold font-bold uppercase tracking-widest text-sm mb-4">
          Medical Disclaimer
        </h4>
        <p className="text-xs sm:text-sm leading-relaxed mb-8 opacity-80 text-gray-400">
          The information provided by Ashtang Ayurved, Sitapur, is for educational and holistic purposes only. Our treatments (including Panchkarma and Agni Karma) are complementary to modern medicine and should not replace professional medical advice, diagnosis, or treatment. Results may vary based on individual Prakriti (body type) and lifestyle. Please consult with our specialists before starting any new treatment protocol.
        </p>
        <div className="border-t border-gray-800 my-6"></div>
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Ashtang Ayurved, Sitapur. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};