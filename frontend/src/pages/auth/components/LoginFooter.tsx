import React from 'react';

const LoginFooter: React.FC = () => (
  <div
    className="flex flex-col sm:flex-row justify-between items-center gap-4"
    style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid #c6c6cd' }}
  >
    {/* Terminal ID */}
    <div
      className="flex items-center gap-2 rounded-full"
      style={{ color: '#45464d', background: '#eff4ff', padding: '6px 16px', border: '1px solid rgba(198,198,205,0.3)' }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>terminal</span>
      <span style={{ fontSize: 12, fontWeight: 600 }}>Terminal ID: BP-772</span>
    </div>

    {/* Support */}
    <a
      href="#"
      className="flex items-center gap-2 transition-colors"
      style={{ color: '#006c49', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}
      onMouseEnter={e => (e.currentTarget.style.color = '#4edea3')}
      onMouseLeave={e => (e.currentTarget.style.color = '#006c49')}
    >
      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>support_agent</span>
      Contact Support
    </a>
  </div>
);

export default LoginFooter;