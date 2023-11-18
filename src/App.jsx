import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/main';
import LoginPage from './pages/login';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  );
}

export default App;
