import React from 'react';

/**
 * TerminalFooter Component
 * System information and security status footer
 * Matches LoadingPageUI.html exactly
 */
const TerminalFooter: React.FC = () => (
  <div className="flex flex-col items-center" style={{ marginTop: 40, gap: 16 }}>
    <div 
      className="flex items-center rounded-full border"
      style={{ background: '#0b1c30', color: '#f8f9ff', borderColor: '#76777d', gap: 4, padding: '4px 16px' }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>
        verified_user
      </span>
      <span 
        className="uppercase tracking-widest"
        style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }}
      >
        Secure Environment Active
      </span>
    </div>

    <div 
      className="grid grid-cols-3 w-full text-center"
      style={{ borderTop: '1px solid rgba(198,198,205,0.3)', paddingTop: 24, gap: 40 }}
    >
      {[
        { label: 'OS ARCH', value: 'X64_STABLE' },
        { label: 'ENCRYPTION', value: 'AES-256-GCM' },
        { label: 'LATENCY', value: '14ms' },
      ].map(({ label, value }) => (
        <div key={label} style={{ marginBottom: 4 }}>
          <p 
            className="uppercase tracking-widest"
            style={{ fontSize: 12, fontWeight: 600, color: '#7c839b', letterSpacing: '0.05em', marginBottom: 4 }}
          >
            {label}
          </p>
          <p className="font-mono" style={{ fontSize: 14, color: '#0b1c30', fontWeight: 500 }}>{value}</p>
        </div>
      ))}
    </div>
  </div>
);

export default TerminalFooter;
