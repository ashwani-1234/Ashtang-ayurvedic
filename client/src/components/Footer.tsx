import { useState } from 'react';

export default function Footer() {
  const [tapCount, setTapCount] = useState(0);

  const handleSecretTap = () => {
    const nextCount = tapCount + 1;
    setTapCount(nextCount);
    
    // If tapped 3 times rapidly, transport directly to the Admin Portal!
    if (nextCount === 3) {
      setTapCount(0);
      window.location.href = '/admin'; // Bulletproof redirect that always works!
    }

    // Safety feature: Auto-reset tap count after 2 seconds
    // This prevents random patient clicks from accumulating over time
    setTimeout(() => {
      setTapCount(0);
    }, 2000);
  };

  return (
    <footer className="bg-emerald-950 text-white py-8 text-center border-t border-emerald-900">
      {/* Your existing footer content, clinic address, or links stay here... */}

      {/* SECRET TRIPLE-TAP TRIGGER AREA */}
      <div className="mt-6 pt-4">
        <p 
          onClick={handleSecretTap} 
          className="text-xs text-emerald-400/60 hover:text-emerald-300 cursor-pointer select-none transition-colors inline-block px-6 py-2"
        >
          © {new Date().getFullYear()} Ashtang Ayurved Clinic. All rights reserved.
        </p>
      </div>
    </footer>
  );
}