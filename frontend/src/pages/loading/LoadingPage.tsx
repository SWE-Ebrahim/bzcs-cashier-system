import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LoadingHeader, InitSteps, ProgressBar, TerminalFooter } from './components';
import useLoadingProgress from './components/useLoadingProgress';
import RoleSelectionPage from '../Roles/RoleSelectionPage';

const LoadingPage: React.FC = () => {
  const { percentage, activeStep, showRoleSelection } = useLoadingProgress();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // When loading completes, trigger smooth transition
  React.useEffect(() => {
    if (showRoleSelection) {
      setIsTransitioning(true);
    }
  }, [showRoleSelection]);

  // Show role selection page after transition animation
  if (showRoleSelection && !isTransitioning) {
    return <RoleSelectionPage />;
  }

  return (
    <>
      {/* Loading Screen */}
      {!showRoleSelection && (
        <motion.div
          key="loading-screen"
          className="min-h-screen flex flex-col items-center justify-center geometric-bg relative"
          style={{ backgroundColor: '#f8f9ff' }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          transition={{ 
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          <LoadingHeader />
          
          <main className="w-full relative z-10" style={{ maxWidth: 520, padding: '0 24px' }}>
            <div className="bg-white rounded-xl shadow-sm" style={{ border: '1px solid #c6c6cd', padding: 40 }}>
              <InitSteps activeStep={activeStep} />
              <ProgressBar percentage={percentage} />
            </div>
            
            <TerminalFooter />
          </main>

          <div 
            className="fixed bottom-0 left-0 w-full h-px opacity-30" 
            style={{ background: 'linear-gradient(to right, transparent, #006c49, transparent)' }}
          />
        </motion.div>
      )}

      {/* Role Selection Page with entrance animation */}
      {showRoleSelection && (
        <motion.div
          key="role-selection"
          initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            filter: 'blur(0px)'
          }}
          transition={{ 
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
          }}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50 }}
        >
          <RoleSelectionPage />
        </motion.div>
      )}
    </>
  );
};

export default LoadingPage;