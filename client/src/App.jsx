import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CourseDetail from "./pages/CourseDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Root Route Component (shows login for unauthenticated users, home for authenticated)
const RootRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        background: '#f8fafc'
      }}>
        Loading application...
      </div>
    );
  }

  // Simple test render
  if (typeof isAuthenticated === 'undefined') {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        background: '#f8fafc',
        padding: '20px'
      }}>
        <h2>Authentication Status Unknown</h2>
        <p>Checking authentication...</p>
      </div>
    );
  }

  try {
    return isAuthenticated ? <Home /> : <Login />;
  } catch (error) {
    console.error('Component render error:', error);
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        background: '#f8fafc',
        padding: '20px'
      }}>
        <h2>Application Error</h2>
        <p>There was an error loading the application.</p>
        <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '10px' }}>
          Error: {error.message}
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            background: '#06b6d4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Reload Page
        </button>
      </div>
    );
  }
};

// Public Route Component (redirects to home if already authenticated, but allows access to auth pages)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  // Allow access to login and register pages even if authenticated
  // This enables navigation between login and register pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  if (isAuthPage) {
    return children;
  }

  // For other public routes, redirect authenticated users to home
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

function AppContent() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isRootLogin = location.pathname === '/' && !isAuthenticated;

  return (
    <>
      {!isAuthPage && !isRootLogin && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route path="/course/:id" element={
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/interview" element={
            <ProtectedRoute>
              <Interview />
            </ProtectedRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
        </Routes>
      </main>

      {!isAuthPage && !isRootLogin && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;