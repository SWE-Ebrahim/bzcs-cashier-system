import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * RoleNavbar Component
 * Functional navigation bar with working buttons
 * Matches SelectRoleUI.html exactly
 */
const RoleNavbar: React.FC = () => {
  const navigate = useNavigate();

  const handleNotifications = () => {
    console.log('🔔 Notifications clicked');
    // TODO: Open notifications panel
  };

  const handleHelp = () => {
    console.log('❓ Help clicked');
    // TODO: Open help modal or navigate to support
  };

  const handlePowerOff = () => {
    console.log('⏻ Power off clicked');
    // Navigate back to loading page (simulates app restart)
    navigate('/');
  };

  return (
    <header
      className="bg-white fixed top-0 w-full z-40"
      style={{ borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
    >
    <div className="flex items-center justify-between w-full" style={{ height: 64, paddingLeft: 24, paddingRight: 24 }}>

      {/* ── Left: Logo ── */}
      <div className="flex items-center" style={{ gap: 8 }}>
        <span style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: 20,
          fontWeight: 900,
          letterSpacing: '-0.05em',
          color: '#006c49',
        }}>
          BilliardPro
        </span>
        <span style={{
          fontSize: 13,
          fontWeight: 500,
          color: '#45464d',
          background: '#e5eeff',
          padding: '2px 8px',
          borderRadius: 6,
          lineHeight: '20px',
        }}>
          POS
        </span>
      </div>

      {/* ── Right: Desktop ── */}
      <div className="hidden md:flex items-center" style={{ gap: 20 }}>

        {/* Terminal Status */}
        <div className="flex flex-col items-end" style={{ gap: 1 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#45464d',
            lineHeight: 1,
          }}>
            Terminal ID: BP-772
          </span>
          <span style={{
            fontSize: 13,
            fontWeight: 700,
            color: '#006c49',
            lineHeight: 1,
          }}>
            Operational
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 32, background: '#c6c6cd' }} />

        {/* User Info */}
        <div className="flex items-center" style={{ gap: 12 }}>
          <div className="flex flex-col items-end" style={{ gap: 2 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#0b1c30', lineHeight: 1 }}>
              Guest
            </p>
            <p style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#45464d',
              lineHeight: 1,
            }}>
              Unauthorized Session
            </p>
          </div>

          {/* Avatar */}
          <div
            className="flex items-center justify-center overflow-hidden"
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: '#dce9ff',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#c6c6cd',
              flexShrink: 0,
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 20, color: '#45464d' }}
            >
              person
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center" style={{ gap: 4 }}>
          {/* Notifications */}
          <button
            onClick={handleNotifications}
            className="flex items-center justify-center rounded-lg transition-colors cursor-pointer"
            style={{ width: 36, height: 36, background: 'transparent', borderWidth: 0, borderStyle: 'none', borderColor: 'transparent', color: '#45464d' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>notifications</span>
          </button>

          {/* Help */}
          <button
            onClick={handleHelp}
            className="flex items-center justify-center rounded-lg transition-colors cursor-pointer"
            style={{ width: 36, height: 36, background: 'transparent', borderWidth: 0, borderStyle: 'none', borderColor: 'transparent', color: '#45464d' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>help</span>
          </button>

          {/* Power */}
          <button
            onClick={handlePowerOff}
            className="flex items-center justify-center rounded-lg transition-colors cursor-pointer"
            style={{ width: 36, height: 36, background: 'transparent', borderWidth: 0, borderStyle: 'none', borderColor: 'transparent', color: '#ba1a1a' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#ffdad6')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>settings_power</span>
          </button>
        </div>
      </div>

      {/* ── Mobile: just power button ── */}
      <div className="flex md:hidden items-center" style={{ gap: 8 }}>
        <button
          onClick={handlePowerOff}
          className="flex items-center justify-center rounded-lg cursor-pointer"
          style={{ width: 36, height: 36, background: 'transparent', borderWidth: 0, borderStyle: 'none', borderColor: 'transparent', color: '#ba1a1a' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>settings_power</span>
        </button>
      </div>

    </div>
  </header>
  );
};

export default RoleNavbar;