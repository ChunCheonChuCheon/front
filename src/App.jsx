import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/main';
import LoginPage from './pages/login';
import SignUpPage from './pages/signUp';
import JoinGroupPage from './pages/joinGroup';
import CreateGroupPage from './pages/createGroup';
import GroupPage from './pages/group';
import MenuPage from './pages/menu';
import PolicyPage from './pages/policy';
import { AnimatePresence } from 'framer-motion';
import AnimationWrapper from './components/AnimationWrapper';
import LoginKakaoCallbackPage from './pages/loginKakaoCallback';
import TeamPage from './pages/team';
function App() {
  return (
    <AnimatePresence mode='wait'>
      <Routes >
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<AnimationWrapper key='login' ><LoginPage /></AnimationWrapper >} />
        <Route path='/login/social/kakao/callback' element={<LoginKakaoCallbackPage/>}></Route>
        <Route path='/signup' element={<AnimationWrapper key='signup' ><SignUpPage /></AnimationWrapper>}/>
        <Route path='/main' element={<AnimationWrapper key='main'><JoinGroupPage /></AnimationWrapper>} />
        <Route path='/new' element={<AnimationWrapper key='new'><CreateGroupPage /></AnimationWrapper>} />
        <Route path='/group/:pin' element={<AnimationWrapper key='group'><GroupPage /></AnimationWrapper>} />
        <Route path='/menu' element={<AnimationWrapper key='menu'><MenuPage /></AnimationWrapper>} />
        <Route path='/policy' element={<AnimationWrapper key='policy'><PolicyPage></PolicyPage></AnimationWrapper>}/>
        <Route path='/team' element={<AnimationWrapper key='team'><TeamPage></TeamPage></AnimationWrapper>}/>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
