import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoadingPage from './pages/loading/LoadingPage';
import RoleSelectionPage from './pages/Roles/RoleSelectionPage';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import { useAuthStore } from './store/auth.store';
import { useEffect } from 'react';

/**
 * App Component
 * Main application with routing and authentication check
 */
function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Root route - handles loading -> role selection */}
        <Route path="/" element={<LoadingPage />} />
        
        {/* Login page */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        
        {/* Dashboard (protected) */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
        />
        
        {/* Catch-all redirect to root */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
