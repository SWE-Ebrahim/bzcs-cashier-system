import React from 'react';

interface RoleCardProps {
  role: string;
  subtitle: string;
  icon: string;
  features: string[];
  onClick?: () => void;
}

/**
 * RoleCard Component
 * Reusable role selection card with icon, features, and action button
 * Matches SelectRoleUI.html exactly (lines 156-184, 186-214, 216-244)
 */
const RoleCard: React.FC<RoleCardProps> = ({ role, subtitle, icon, features, onClick }) => (
  <div
    className="flex flex-col h-full transition-shadow duration-300 hover:shadow-lg"
    style={{
      background: '#ffffff',
      borderRadius: 12,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#e2e8f0',
      padding: 24,
      boxShadow: '0px 4px 6px rgba(15,23,42,0.05)',
    }}
  >
    {/* Icon */}
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: 80,
          height: 80,
          background: '#6cf8bb',
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: 36,
            color: '#006c49',
          }}
        >
          {icon}
        </span>
      </div>
    </div>

    {/* Title & Subtitle */}
    <div style={{ textAlign: 'center', marginBottom: 24 }}>
      <h2
        style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: 24,
          fontWeight: 700,
          color: '#0b1c30',
          marginBottom: 4,
          letterSpacing: '-0.01em',
        }}
      >
        {role}
      </h2>
      <p
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: '#00714d',
          lineHeight: 1,
        }}
      >
        {subtitle}
      </p>
    </div>

    {/* Features List */}
    <div style={{ flexGrow: 1, marginBottom: 40 }}>
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex items-start"
          style={{ gap: 16, marginBottom: index < features.length - 1 ? 16 : 0 }}
        >
          <span
            className="material-symbols-outlined flex-shrink-0"
            style={{ fontSize: 20, color: '#006c49' }}
          >
            check_circle
          </span>
          <p
            style={{
              fontSize: 16,
              color: '#45464d',
              lineHeight: 1.5,
            }}
          >
            {feature}
          </p>
        </div>
      ))}
    </div>

    {/* Action Button */}
    <button
      onClick={onClick}
      className="w-full font-semibold flex items-center justify-center active:scale-[0.98] transition-all hover:brightness-110 cursor-pointer"
      style={{
        background: '#006c49',
        color: '#ffffff',
        padding: '16px 24px',
        borderRadius: 8,
        fontSize: 16,
        gap: 8,
        borderWidth: 0,
        borderStyle: 'none',
        borderColor: 'transparent',
      }}
    >
      Select {role}
      <span
        className="material-symbols-outlined"
        style={{ fontSize: 18 }}
      >
        arrow_forward
      </span>
    </button>
  </div>
);

export default RoleCard;
