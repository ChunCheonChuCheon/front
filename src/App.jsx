import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/main';
import LoginPage from './pages/login';
import JoinGroupPage from './pages/joinGroup';
import CreateGroupPage from './pages/createGroup';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/main' element={<JoinGroupPage />} />
      <Route path='/new' element={<CreateGroupPage />} />
    </Routes>
  );
}

export default App;
