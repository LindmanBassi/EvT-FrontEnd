import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LocalPage from './pages/LocalPage';
import LoginPage from './pages/LoginPage';
import EventoPage from './pages/EventoPage';
import FuncionariosPage from './pages/FuncionariosPage';
import ParticipacaoPage from './pages/ParticipacaoPage';

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
              <ParticipacaoPage />
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
              <EventoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/funcionarios"
          element={
            <ProtectedRoute>
              <FuncionariosPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/participacoes"
          element={
            <ProtectedRoute>
              <ParticipacaoPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
