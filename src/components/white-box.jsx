import React from 'react';

export default function WhiteBox({ children }) {
  return (
    <div class='w-4/5 max-w-[400px] h-auto p-5 bg-white rounded-2xl shadow-xl flex flex-col '>
      {children}
    </div>
  );
}
