import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSelectionPage from '../../Roles/RoleSelectionPage';

/**
 * useLoadingProgress Hook
 * Manages loading progress animation with smooth transitions
 */
const useLoadingProgress = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  useEffect(() => {
    // Faster interval for quicker loading (60ms)
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2; // Larger increments for faster progress
        
        // Step progression with visible gaps
        if (next < 20) setActiveStep(0);
        else if (next < 45) setActiveStep(1);
        else if (next < 70) setActiveStep(2);
        else if (next < 95) setActiveStep(3);

        if (next >= 100) {
          clearInterval(interval);
          // Show role selection page after completion
          setTimeout(() => {
            setShowRoleSelection(true);
          }, 500); // Brief pause to see 100% before transition
          return 100;
        }
        return next;
      });
    }, 60); // Faster speed
    return () => clearInterval(interval);
  }, [navigate]);

  const percentage = Math.min(progress, 100);

  return { percentage, activeStep, showRoleSelection };
};

export default useLoadingProgress;
