import React from 'react';
import { RoleNavbar, HeaderSection, RoleGrid, BottomBar } from './components';

/**
 * RoleSelectionPage Component
 * Complete role selection dashboard - SupportFooter removed
 */
const RoleSelectionPage: React.FC = () => {
  return (
    <div 
      className="min-h-screen"
      style={{ background: '#f8f9ff', fontFamily: 'Inter, sans-serif', color: '#0b1c30' }}
    >
      {/* Top Navigation Bar */}
      <RoleNavbar />

      {/* Main Content */}
      <main style={{ paddingTop: 128, paddingBottom: 96, paddingLeft: 24, paddingRight: 24, maxWidth: 1280, marginLeft: 'auto', marginRight: 'auto' }}>
        <HeaderSection />
        <RoleGrid />
      </main>

      {/* Bottom Context Bar */}
      <BottomBar />
    </div>
  );
};

export default RoleSelectionPage;
