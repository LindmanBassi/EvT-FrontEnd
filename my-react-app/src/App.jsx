import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LocalPage from './pages/LocalPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/locais" element={<LocalPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
