import React from 'react';
import 'remixicon/fonts/remixicon.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ShipsProvider } from './contexts/ShipsContext';
import { JobsProvider } from './contexts/JobsContext';
import Navbar from './pages/NavBar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ShipsPage from './pages/ShipsPage';
import ShipDetailPage from './pages/ShipDetailPage';
import AddShip from './pages/AddShip';
import JobsPage from './pages/JobsPage';
import JobForm from './components/Jobs/JobForm';
import JobCalendar from './components/Jobs/JobCalendar';

function AppContent() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to login page after logout
  };

  const ProtectedRoute = ({ element, roles }) => {
    if (!user) {
      return <Navigate to="/" />;
    }
    if (roles && !roles.includes(user.role)) {
      return <Navigate to="/dashboard" />;
    }
    return element;
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<DashboardPage />} roles={['Admin', 'Inspector', 'Engineer']} />}
        />
        <Route
          path="/ships"
          element={<ProtectedRoute element={<ShipsPage />} roles={['Admin', 'Inspector']} />}
        />
        <Route
          path="/ships/add"
          element={<ProtectedRoute element={<AddShip />} roles={['Admin']} />}
        />
        <Route
          path="/ships/:id"
          element={<ProtectedRoute element={<ShipDetailPage />} roles={['Admin', 'Inspector']} />}
        />
        <Route
          path="/jobs"
          element={<ProtectedRoute element={<JobsPage />} roles={['Admin', 'Engineer']} />}
        />
        <Route
          path="/jobs/add"
          element={<ProtectedRoute element={<JobForm />} roles={['Admin']} />}
        />
        <Route
          path="/jobs/edit/:jobId"
          element={<ProtectedRoute element={<JobForm />} roles={['Admin']} />}
        />
        <Route
          path="/calendar"
          element={<ProtectedRoute element={<JobCalendar />} roles={['Admin', 'Engineer']} />}
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthWrapper>
      <NotificationProvider>
        <ShipsProvider>
          <JobsProvider>
            <Router>
              <AppContent />
            </Router>
          </JobsProvider>
        </ShipsProvider>
      </NotificationProvider>
    </AuthWrapper>
  );
}

const AuthWrapper = ({ children }) => {
  const AuthProvider = require('./contexts/AuthContext').AuthProvider;
  return <AuthProvider>{children}</AuthProvider>;
};
