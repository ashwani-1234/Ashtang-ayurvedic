import React from 'react';

export function AnimatedBackground() {
  return (
    // Notice: bg-transparent instead of solid green! It sits quietly in the back (z-[0]).
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden bg-transparent">
      
      {/* 1. Top-Left Soft Sage Green Glow */}
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] animate-pulse"
        style={{ animationDuration: '8s' }}
      />

      {/* 2. Middle-Right Warm Ayurvedic Gold Glow */}
      <div 
        className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-[140px] animate-pulse"
        style={{ animationDuration: '12s', animationDelay: '2s' }}
      />

      {/* 3. Bottom-Left Soft Herbal Glow */}
      <div 
        className="absolute -bottom-32 -left-20 w-[28rem] h-[28rem] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"
        style={{ animationDuration: '10s', animationDelay: '4s' }}
      />

      {/* 4. Tiny Floating Gold Healing Particles */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 bg-amber-500 rounded-full blur-[1px] animate-bounce" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/2 left-2/3 w-1 h-1 bg-amber-400 rounded-full blur-[0.5px] animate-ping" style={{ animationDuration: '8s' }} />
        <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-emerald-600/40 rounded-full blur-[1px] animate-pulse" style={{ animationDuration: '5s' }} />
      </div>

    </div>
  );
}