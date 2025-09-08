// client/src/routes/AppRouter.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import all high-level Page components
import WelcomePage from '../pages/WelcomePage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import DashboardPage from '../pages/DashboardPage';

// Import the security gatekeeper component
import ProtectedRoute from '../components/Auth/ProtectedRoute';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Routes --- */}
        {/* These paths are accessible to anyone, logged in or not. */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* --- Protected Routes --- */}
        {/* The <ProtectedRoute /> acts as a wrapper. Any <Route> nested inside
            it will only be rendered if the user is authenticated. If not, the
            ProtectedRoute component will automatically redirect them to "/login". */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* If you add more protected pages later (e.g., /settings),
              you would add their routes here. */}
        </Route>
        
        {/* Optional: Add a catch-all 404 route later if you wish */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;