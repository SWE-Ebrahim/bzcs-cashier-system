import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/'); // Navigate to root (loading -> role selection)
  };

  if (!user) return null;

  const stats = [
    { label: "Today's Sessions", value: '0',     icon: 'calendar_today' },
    { label: 'Active Tables',    value: '0',     icon: 'table_restaurant' },
    { label: 'Total Revenue',    value: 'AED 0', icon: 'payments' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#f8f9ff' }}>

      {/* ── Navbar ── */}
      <nav className="bg-white fixed top-0 w-full z-40" style={{ borderBottom: '1px solid #c6c6cd', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center" style={{ height: 64 }}>
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 24, fontWeight: 700, color: '#006c49', letterSpacing: '-0.05em' }}>BilliardPro</span>
            <span className="rounded-lg" style={{ fontSize: 14, color: '#45464d', fontWeight: 500, padding: '2px 8px', background: '#e5eeff' }}>POS</span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <p style={{ fontSize: 14, fontWeight: 700, color: '#0b1c30', lineHeight: 1 }}>{user.full_name}</p>
              <p style={{ fontSize: 12, color: '#45464d' }}>{user.roles?.[0] ?? 'Staff'}</p>
            </div>
            <div className="flex items-center justify-center rounded-full border" style={{ width: 40, height: 40, background: '#6cf8bb', borderColor: '#c6c6cd' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#006c49' }}>person</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 rounded-lg transition-all"
              style={{ padding: '8px 16px', color: '#45464d', fontSize: 14, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#ba1a1a'; e.currentTarget.style.background = '#ffdad6'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#45464d'; e.currentTarget.style.background = 'none'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>logout</span>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Main ── */}
      <main className="max-w-7xl mx-auto px-6" style={{ paddingTop: 96, paddingBottom: 96 }}>

        {/* Welcome Card */}
        <div className="bg-white rounded-xl flex items-center gap-6" style={{ border: '1px solid #c6c6cd', padding: 24, marginBottom: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 80, height: 80, background: '#6cf8bb', border: '2px solid rgba(0,108,73,0.2)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 36, color: '#006c49' }}>person</span>
          </div>
          <div className="flex-1">
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 32, fontWeight: 600, color: '#0b1c30', marginBottom: 4, letterSpacing: '-0.01em' }}>
              {user.full_name}
            </h2>
            <p style={{ fontSize: 16, color: '#45464d', marginBottom: 12 }}>{user.username || user.email}</p>
            <div className="flex gap-2 flex-wrap">
              {user.roles?.map((role: string) => (
                <span
                  key={role}
                  className="rounded-full capitalize"
                  style={{ padding: '4px 16px', background: 'rgba(108,248,187,0.3)', color: '#00714d', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', border: '1px solid rgba(0,108,73,0.1)' }}
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginBottom: 24 }}>
          {stats.map(({ label, value, icon }) => (
            <div key={label} className="bg-white rounded-xl flex items-center gap-4" style={{ border: '1px solid #c6c6cd', padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div className="flex items-center justify-center rounded-lg" style={{ width: 48, height: 48, background: '#dce9ff' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 24, color: '#006c49' }}>{icon}</span>
              </div>
              <div>
                <p style={{ fontSize: 14, color: '#45464d' }}>{label}</p>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 24, fontWeight: 600, color: '#0b1c30' }}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Welcome Banner */}
        <div className="rounded-xl relative overflow-hidden billiard-pattern" style={{ background: '#0b1c30', padding: 24 }}>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 24, fontWeight: 600, color: '#ffffff', marginBottom: 8 }}>
                Welcome to BilliardPro! 🎱
              </h3>
              <p style={{ fontSize: 16, color: '#7c839b', lineHeight: 1.5 }}>
                Logged in as{' '}
                <span style={{ color: '#6cf8bb', fontWeight: 600 }}>{user.full_name}</span>.
                {' '}Start managing sessions and processing payments.
              </p>
            </div>
            <span className="material-symbols-outlined hidden sm:block" style={{ fontSize: 48, color: '#6cf8bb', fontVariationSettings: "'FILL' 1" }}>
              sports_handball
            </span>
          </div>
        </div>
      </main>

      {/* ── Bottom Bar ── */}
      <div
        className="fixed bottom-0 left-0 w-full flex justify-between items-center px-6"
        style={{ background: '#d3e4fe', padding: '6px 24px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#45464d', opacity: 0.75 }}
      >
        <span>BilliardPro v4.2.0-stable</span>
        <span>Environment: Production</span>
        <span>Terminal: BP-772</span>
      </div>
    </div>
  );
};

export default DashboardPage;