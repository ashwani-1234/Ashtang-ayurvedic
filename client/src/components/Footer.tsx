import { useState } from 'react';

export function Footer() {
  const [tapCount, setTapCount] = useState(0);

  const handleSecretTap = () => {
    const nextCount = tapCount + 1;
    setTapCount(nextCount);
    
    // If tapped 3 times rapidly, transport directly to the Admin Portal!
    if (nextCount === 3) {
      setTapCount(0);
      window.location.href = '/admin';
    }

    // Safety feature: Auto-reset tap count after 2 seconds
    setTimeout(() => {
      setTapCount(0);
    }, 2000);
  };

  return (
    <footer className="bg-emerald-950 text-white py-10 text-center border-t border-emerald-900">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* ========================================== */}
        {/* MEDICAL DISCLAIMER SECTION */}
        {/* ========================================== */}
        <div className="bg-emerald-900/30 border border-emerald-800/40 rounded-lg p-5 mb-8 text-left sm:text-center shadow-inner">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            Medical Disclaimer
          </h4>
          <p className="text-xs text-gray-300/80 leading-relaxed">
            The information provided by Ashtang Ayurved, Sitapur, is for educational and holistic purposes only. Our treatments (including Panchkarma and Agni Karma) are complementary to modern medicine and should not replace professional medical advice, diagnosis, or treatment. Results may vary based on individual Prakriti (body type) and lifestyle. Please consult with our specialists before starting any new treatment protocol.
          </p>
        </div>

        {/* Other footer links or clinic info can sit here... */}

        {/* ========================================== */}
        {/* SECRET TRIPLE-TAP TRIGGER AREA */}
        {/* ========================================== */}
        <div className="pt-2">
          <p 
            onClick={handleSecretTap} 
            className="text-xs text-emerald-400/60 hover:text-emerald-300 cursor-pointer select-none transition-colors inline-block px-6 py-2"
          >
            © {new Date().getFullYear()} Ashtang Ayurved Clinic. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}