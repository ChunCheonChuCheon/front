import React from 'react'
import WhiteBox from '../white-box'
import { useState,useEffect } from 'react';
import TextNormal from '../text-normal';
export default function PolicyModal() {

    const [textContent, setTextContent] = useState('');

    useEffect(() => {
        const fetchTextContent = async () => {
            try {
              const response = await fetch('policy.txt'); // 경로는 public 폴더를 기준으로 합니다.
              const text = await response.text();
              
              // 텍스트 파일에서 줄바꿈 문자를 HTML 줄바꿈 태그로 변환
              const formattedText = text.replace(/\n/g, '<br>');
      
              setTextContent(formattedText);
            } catch (error) {
              console.error('텍스트 읽기 오류:', error);
            }
          };
          fetchTextContent();
        }, []);
      
    return (
        <WhiteBox>
            <TextNormal>
            <div className='text-[6px]'>
            <div dangerouslySetInnerHTML={{ __html: textContent }} />
                </div>            
            </TextNormal>
        </WhiteBox> 
  )
}


