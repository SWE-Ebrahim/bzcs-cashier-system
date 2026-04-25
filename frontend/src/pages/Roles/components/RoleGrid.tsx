import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoleCard from './RoleCard';

/**
 * RoleGrid Component
 * Grid layout for all role selection cards with navigation
 * Matches SelectRoleUI.html exactly (lines 154-245)
 */
const RoleGrid: React.FC = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    console.log(`✅ Selected role: ${role}`);
    // Navigate to login page with role parameter
    navigate(`/login?role=${role.toLowerCase()}`);
  };

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3"
      style={{ gap: 40, marginTop: 40 }}
    >
      {/* Owner Card */}
      <RoleCard
        role="Owner"
        subtitle="Full Administrative Access"
        icon="shield"
        features={[
          'Full Financial Auditing & Reporting',
          'Manage All System Configurations',
          'Staff Hiring & Payroll Access',
        ]}
        onClick={() => handleRoleSelect('Owner')}
      />

      {/* Manager Card */}
      <RoleCard
        role="Manager"
        subtitle="Operations Management"
        icon="work"
        features={[
          'Table & Staff Scheduling',
          'Inventory Management & Ordering',
          'Process Daily Shift Overrides',
        ]}
        onClick={() => handleRoleSelect('Manager')}
      />

      {/* Cashier Card */}
      <RoleCard
        role="Cashier"
        subtitle="Standard Point of Sale"
        icon="point_of_sale"
        features={[
          'Session Entry & Payments',
          'Process Sales & Member Renewals',
          'Print Receipts & Settlement Reports',
        ]}
        onClick={() => handleRoleSelect('Cashier')}
      />
    </div>
  );
};

export default RoleGrid;
