import React from 'react';
// import Header from '../components/header';   // 헤더 필요시 해제
// import Footer from '../components/footer';   // 푸터 필요시 해제

function DefaultLayout({ children }) {
  return (
    <div class='w-screen h-screen grid place-items-center '>
      {/* <Header /> 헤더 필요시 해제*/}
      {children}
      {/* <Footer /> 푸터 필요시 해제*/}
    </div>
  );
}

export default DefaultLayout;
// background-color: linear-gradient(to bottom, rgba(219, 236, 255, 1) 0%,rgba(226, 217, 255, 1) 100%);
