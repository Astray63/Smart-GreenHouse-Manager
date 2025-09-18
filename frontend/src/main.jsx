import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles.css';
import { AuthProvider, useAuth } from './state/AuthContext.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Seuils from './pages/Seuils.jsx';
import Alertes from './pages/Alertes.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/seuils" element={<PrivateRoute><Seuils /></PrivateRoute>} />
            <Route path="/alertes" element={<PrivateRoute><Alertes /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
