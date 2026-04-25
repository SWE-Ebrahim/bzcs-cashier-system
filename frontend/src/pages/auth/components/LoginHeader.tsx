import React from 'react';

interface LoginHeaderProps {
  onBack?: () => void;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ onBack }) => {
  if (!onBack) return null;
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-1 transition-colors"
      style={{ color: '#45464d', fontSize: 14, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24 }}
      onMouseEnter={e => (e.currentTarget.style.color = '#006c49')}
      onMouseLeave={e => (e.currentTarget.style.color = '#45464d')}
    >
      <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
      Back to Roles
    </button>
  );
};

export default LoginHeader;