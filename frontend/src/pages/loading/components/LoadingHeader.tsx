import React from 'react';

/**
 * LoadingHeader Component
 * Brand header with billiard ball icon and version info
 * Matches LoadingPageUI.html exactly
 */
const LoadingHeader: React.FC = () => (
  <header className="flex flex-col items-center relative z-10" style={{ marginBottom: 40 }}>
    <div className="flex items-center" style={{ gap: 8, marginBottom: 4 }}>
      <span
        className="material-symbols-outlined"
        style={{ fontSize: 48, color: '#006c49', fontVariationSettings: "'FILL' 1" }}
      >
        sports_handball
      </span>
    </div>
    <h1 
      className="font-bold tracking-tight" 
      style={{ fontFamily: 'Manrope, sans-serif', fontSize: 40, letterSpacing: '-0.02em', color: '#0b1c30' }}
    >
      BilliardPro
    </h1>
    <p 
      className="uppercase tracking-widest"
      style={{ fontSize: 12, fontWeight: 600, color: '#7c839b', letterSpacing: '0.05em' }}
    >
      Management Suite v4.2
    </p>
  </header>
);

export default LoadingHeader;
