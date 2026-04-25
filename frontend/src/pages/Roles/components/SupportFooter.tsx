import React from 'react';

/**
 * SupportFooter Component
 * Support information section with functional action buttons
 * Matches SelectRoleUI.html exactly (lines 247-261)
 */
const SupportFooter: React.FC = () => {
  const handleSupportCenter = () => {
    console.log('📞 Support Center clicked');
    // TODO: Open support center modal or navigate to support page
    window.open('https://support.example.com', '_blank');
  };

  const handleEmergencyLockout = () => {
    console.log(' Emergency Lockout clicked');
    // TODO: Trigger emergency lockout procedure
    if (window.confirm('Are you sure you want to trigger emergency lockout? This will secure all terminals.')) {
      alert('Emergency lockout activated. All terminals are now secured.');
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between"
      style={{
        marginTop: 64,
        gap: 24,
        background: '#eff4ff',
        padding: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#c6c6cd',
      }}
    >
      {/* Left: Info Icon + Text */}
      <div className="flex items-center" style={{ gap: 16 }}>
        <div
          className="flex items-center justify-center rounded-lg"
          style={{
            width: 48,
            height: 48,
            background: '#ffffff',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            flexShrink: 0,
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 24, color: '#45464d' }}
          >
            info
          </span>
        </div>
        <div>
          <h4
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#0b1c30',
              marginBottom: 4,
            }}
          >
            Need help with access?
          </h4>
          <p
            style={{
              fontSize: 14,
              color: '#45464d',
              lineHeight: 1.5,
            }}
          >
            Contact your system administrator or technical support.
          </p>
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex" style={{ gap: 16 }}>
        <button
          onClick={handleSupportCenter}
          className="font-semibold rounded-lg active:scale-95 transition-all cursor-pointer hover:bg-slate-50"
          style={{
            padding: '8px 24px',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#76777d',
            background: 'transparent',
            color: '#0b1c30',
            fontSize: 14,
          }}
        >
          Support Center
        </button>
        <button
          onClick={handleEmergencyLockout}
          className="font-semibold rounded-lg active:scale-95 transition-all cursor-pointer"
          style={{
            padding: '8px 24px',
            borderWidth: 0,
            borderStyle: 'none',
            borderColor: 'transparent',
            background: '#000000',
            color: '#ffffff',
            fontSize: 14,
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Emergency Lockout
        </button>
      </div>
    </div>
  );
};

export default SupportFooter;
