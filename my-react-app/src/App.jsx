import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LocalPage from './pages/LocalPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';

// Componente para rotas protegidas
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/locais"
          element={
            <ProtectedRoute>
              <LocalPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/eventos"
          element={
            <ProtectedRoute>
              <EventPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
