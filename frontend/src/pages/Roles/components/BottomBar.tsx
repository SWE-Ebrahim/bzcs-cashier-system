import React from 'react';

/**
 * BottomBar Component
 * Fixed bottom context bar with system information
 * Matches SelectRoleUI.html exactly (lines 264-268)
 */
const BottomBar: React.FC = () => (
  <div
    className="fixed bottom-0 left-0 w-full px-6 flex justify-between items-center"
    style={{
      background: '#d3e4fe',
      padding: '4px 24px',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: '#45464d',
      opacity: 0.75,
    }}
  >
    <span>BilliardPro v4.2.0-stable</span>
    <span>Environment: Production</span>
    <span>Last Ping: Just now</span>
  </div>
);

export default BottomBar;
