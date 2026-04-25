import React, { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoginForm, LoginFooter, OwnerLoginForm } from './components';

/**
 * LoginPage — Tailwind v4
 * Left: dark branding panel. Right: auth form.
 * Inline styles used for all token colors to guarantee rendering.
 */
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedRole = useMemo(() => searchParams.get('role') || 'cashier', [searchParams]);

  const handleLoginSuccess = () => navigate('/dashboard');
  const handleBackToRoles  = () => navigate(-1); // Go back to previous page (stays at /)

  return (
    <main className="flex min-h-screen w-full overflow-hidden">

      {/* ── Left — Branding ── */}
      <section
        className="hidden lg:flex w-1/2 relative flex-col justify-between billiard-pattern"
        style={{ background: '#0b1c30', padding: 64 }}
      >
        {/* Top */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 32, fontWeight: 700, color: '#6ffbbe', letterSpacing: '-0.05em' }}>
              BilliardPro
            </span>
            <span
              className="rounded-full"
              style={{ padding: '4px 16px', background: 'rgba(108,248,187,0.1)', border: '1px solid rgba(108,248,187,0.2)', color: '#6ffbbe', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              Enterprise Edition 4.0
            </span>
          </div>
          <div style={{ maxWidth: 400 }}>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 40, fontWeight: 700, color: '#ffffff', lineHeight: 1.2, marginBottom: 16 }}>
              Advanced Management for Premium Venues.
            </h2>
            <p style={{ fontSize: 18, color: '#7c839b', lineHeight: 1.6 }}>
              Precision control over tables, membership, and point-of-sale operations in a single unified terminal.
            </p>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="relative z-10">
          <div className="grid grid-cols-2 gap-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24 }}>
            <div>
              <span style={{ display: 'block', fontSize: 24, fontWeight: 700, color: '#6ffbbe' }}>99.9%</span>
              <span style={{ fontSize: 14, color: '#7c839b' }}>Terminal Uptime</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: 24, fontWeight: 700, color: '#6ffbbe' }}>Real-time</span>
              <span style={{ fontSize: 14, color: '#7c839b' }}>Sync &amp; Analytics</span>
            </div>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(19,27,46,0.4) 0%, transparent 100%)' }} />
      </section>

      {/* ── Right — Form ── */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center relative" style={{ background: '#f8f9ff', padding: '0 32px' }}>

        {/* Mobile logo */}
        <div className="lg:hidden absolute" style={{ top: 40, left: 32 }}>
          <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 24, fontWeight: 700, color: '#006c49', letterSpacing: '-0.05em' }}>
            BilliardPro
          </span>
        </div>

        {/* Back button */}
        <button
          onClick={handleBackToRoles}
          className="absolute flex items-center gap-1 transition-colors"
          style={{ top: 24, left: 24, color: '#45464d', fontSize: 14, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#006c49')}
          onMouseLeave={e => (e.currentTarget.style.color = '#45464d')}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
          Back to Roles
        </button>

        <div style={{ width: '100%', maxWidth: 440 }}>
          {/* Heading */}
          <div className="mb-10 text-center lg:text-left">
            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 32, fontWeight: 600, color: '#0b1c30', marginBottom: 8, letterSpacing: '-0.01em' }}>
              Staff Authentication
            </h1>
            <p style={{ fontSize: 16, color: '#45464d', lineHeight: 1.5 }}>
              Authorized personnel only. Please verify your credentials to access the terminal.
            </p>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#00714d', marginTop: 8 }}>
              {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Access
            </p>
          </div>

          {/* Form */}
          {selectedRole === 'owner' ? (
            <OwnerLoginForm onSuccess={handleLoginSuccess} />
          ) : (
            <LoginForm onSuccess={handleLoginSuccess} role={selectedRole} />
          )}

          <LoginFooter />
        </div>

        {/* Copyright */}
        <div className="absolute text-center w-full" style={{ bottom: 16 }}>
          <p style={{ fontSize: 10, color: '#76777d', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
            © 2024 BilliardPro Systems Inc. All Rights Reserved.
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;