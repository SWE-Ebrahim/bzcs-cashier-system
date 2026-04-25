import React from 'react';

type StepStatus = 'success' | 'syncing' | 'pending';

interface InitStep {
  id: number;
  label: string;
}

interface InitStepsProps {
  steps?: InitStep[];
  activeStep: number;
}

const STEPS: InitStep[] = [
  { id: 1, label: 'Establishing Secure Connection' },
  { id: 2, label: 'Verifying Terminal BP-772' },
  { id: 3, label: 'Fetching Cloud Database' },
  { id: 4, label: 'Allocating Local Cache' },
];

const getStatus = (stepIndex: number, activeStep: number): StepStatus => {
  if (stepIndex < activeStep) return 'success';
  if (stepIndex === activeStep) return 'syncing';
  return 'pending';
};

/**
 * InitSteps Component
 * Displays initialization steps with status indicators
 * Matches LoadingPageUI.html exactly
 */
const InitSteps: React.FC<InitStepsProps> = ({ steps = STEPS, activeStep }) => (
  <div style={{ marginBottom: 40 }}>
    <div className="space-y-4">
      {steps.map((step, i) => {
        const status = getStatus(i, activeStep);
        return (
          <div
            key={step.id}
            className="flex items-center justify-between transition-opacity duration-300"
            style={{ opacity: status === 'pending' ? 0.4 : 1 }}
          >
            <div className="flex items-center" style={{ gap: 16 }}>
              {status === 'success' && (
                <span 
                  className="material-symbols-outlined" 
                  style={{ fontSize: 20, color: '#006c49', fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              )}
              {status === 'syncing' && (
                <span 
                  className="material-symbols-outlined animate-spin" 
                  style={{ fontSize: 20, color: '#006c49' }}
                >
                  sync
                </span>
              )}
              {status === 'pending' && (
                <span 
                  className="material-symbols-outlined" 
                  style={{ fontSize: 20, color: '#76777d' }}
                >
                  circle
                </span>
              )}
              <span style={{
                fontSize: 16,
                fontWeight: status === 'syncing' ? 600 : 400,
                color: '#0b1c30',
                lineHeight: 1.6,
              }}>
                {step.label}
              </span>
            </div>

            {status === 'success' && (
              <span 
                className="font-mono uppercase tracking-widest rounded"
                style={{ fontSize: 14, fontWeight: 500, color: '#00714d', background: 'rgba(108,248,187,0.2)', padding: '4px 8px' }}
              >
                SUCCESS
              </span>
            )}
            {status === 'syncing' && (
              <span className="font-mono uppercase tracking-widest" style={{ fontSize: 12, fontWeight: 700, color: '#006c49' }}>SYNCING</span>
            )}
            {status === 'pending' && (
              <span className="font-mono uppercase tracking-widest" style={{ fontSize: 12, fontWeight: 700, color: '#76777d' }}>PENDING</span>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default InitSteps;
