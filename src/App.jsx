import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/main';
import LoginPage from './pages/login';
import JoinGroupPage from './pages/joinGroup';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/main' element={<JoinGroupPage />} />

    </Routes>
  );
}

export default App;
