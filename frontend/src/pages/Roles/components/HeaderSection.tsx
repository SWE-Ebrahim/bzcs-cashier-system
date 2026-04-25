import React from 'react';

/**
 * HeaderSection Component
 * Page title and description for role selection
 * Matches SelectRoleUI.html exactly (lines 149-152)
 */
const HeaderSection: React.FC = () => (
  <div style={{ textAlign: 'center', marginBottom: 40 }}>
    <h1 style={{
      fontFamily: 'Manrope, sans-serif',
      fontSize: 40,
      fontWeight: 800,
      letterSpacing: '-0.02em',
      color: '#0b1c30',
      marginBottom: 8,
      lineHeight: 1.2,
    }}>
      Select Access Level
    </h1>
    <p style={{
      fontFamily: 'Inter, sans-serif',
      fontSize: 18,
      fontWeight: 400,
      color: '#45464d',
      lineHeight: 1.6,
      maxWidth: 672,
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      Please select your primary role to continue. Access levels are restricted based on security credentials.
    </p>
  </div>
);

export default HeaderSection;
