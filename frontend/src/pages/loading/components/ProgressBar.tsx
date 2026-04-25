import React from 'react';

interface ProgressBarProps {
  percentage: number;
}

/**
 * ProgressBar Component
 * Displays system initialization progress with animated bar
 * Matches LoadingPageUI.html exactly
 */
const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => (
  <div style={{ marginBottom: 8 }}>
    <div className="flex justify-between items-end" style={{ marginBottom: 4 }}>
      <span 
        className="uppercase tracking-widest"
        style={{ fontSize: 12, fontWeight: 600, color: '#7c839b', letterSpacing: '0.05em' }}
      >
        System Initialization
      </span>
      <span 
        className="font-bold"
        style={{ fontFamily: 'Manrope, sans-serif', fontSize: 24, color: '#006c49' }}
      >
        {percentage}%
      </span>
    </div>
    <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: '#e5eeff' }}>
      <div
        className="h-full rounded-full transition-all duration-300 ease-out progress-glow"
        style={{ width: `${percentage}%`, background: '#006c49' }}
      />
    </div>
    <p className="text-center" style={{ fontSize: 14, color: '#45464d', lineHeight: 1.5, marginTop: 16 }}>
      Please do not disconnect power or terminate the application process.
    </p>
  </div>
);

export default ProgressBar;
