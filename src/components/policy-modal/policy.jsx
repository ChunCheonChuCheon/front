import React from 'react'
import WhiteBox from '../white-box'
import { useState, useEffect } from 'react';
import TextNormal from '../text-normal';
import { useNavigate } from 'react-router-dom';
import arrowImage1 from '../../assets/icons/arrow-button-black.svg';

export default function PolicyModal() {

  const [textContent, setTextContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTextContent = async () => {
      try {
        const response = await fetch('policy.txt'); // 경로는 public 폴더를 기준으로 합니다.
        const text = await response.text();

        // 텍스트 파일에서 줄바꿈 문자를 HTML 줄바꿈 태그로 변환
        const formattedText = text.replace(/\n/g, '<br>').replace(/=/g, '-');
        

        setTextContent(formattedText);
      } catch (error) {
        console.error('텍스트 읽기 오류:', error);
      }
    };
    fetchTextContent();
  }, []);

  return (
    <WhiteBox>
      <div class='mb-3 flex justify-between items-center '>
        <div className='flex flex-col items-center '>
          <button onClick={() => { navigate('/login') }}>
            <img src={arrowImage1} alt='arrow' class='w-6 h-6 ' />
          </button>
        </div>
      </div>
      <TextNormal>
        <div className='text-[0.4rem] whitespace-pre-line'>
          <div dangerouslySetInnerHTML={{ __html: textContent }} />
        </div>
      </TextNormal>
    </WhiteBox>
  )
}


