import React from 'react';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ccccIcon from '../../assets/icons/ccccicon.png';
import { useState } from 'react';
import kakaoIcon from '../../assets/icons/kakao_login_large_wide.png'

export default function Login() {
  const navigate = useNavigate();
  const baseURL = useSelector((state) => state.baseURL);
  const location = useLocation();
  const [redirectPath] = useState(location.state?.from || '/main');
  const ax = axios.create({
    baseURL: baseURL,
  });

  const onSubmit = async () => {
    try {
      console.log(baseURL)
      const url = await ax
        .get(`${baseURL}/auth/login/social/kakao`)
        .then((response) => response.data.url);
      // go to url

      localStorage.setItem('redirectPath', redirectPath);
      console.log("redirectPath: ", redirectPath)
      window.location.href = url;
    } catch (error) {
      console.error('API 호출 중 오류:', error);
      // alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  function LoginWhiteBox({ children }) {
    return (
      <div class='w-full h-auto p-5 bg-white rounded-2xl shadow-xl flex flex-col '>
        {children}
      </div>
    );
  }

  return (
    <div class='w-4/5 max-w-[400px] flex flex-col items-center'>
      <div className='w-2/5 mb-1'>
        <img src={ccccIcon} alt='Icon' class='w-full h-full object-cover'></img>
      </div>
      <TextNormal>
        <div className='mb-8 text-[#369fff]'>춘천추천: 단체 식사 맛집 추천</div>
      </TextNormal>

      <LoginWhiteBox>
        <div className='flex flex-col '>
          <div className='mb-3'>
          <TextBold>로그인</TextBold>
          </div>
          <TextNormal>카카오 계정으로 손쉽게 로그인 </TextNormal>
          <div className='flex justify-center items-center p-5'>
            <button onClick={() => {
              onSubmit()
            }}>
              <img src={kakaoIcon} alt="kakaoIcon" />
            </button>
          </div>
        </div>


      </LoginWhiteBox>
      <button
        className='ml-auto  hover:underline mt-2 p-2 '
        onClick={() => navigate('/policy')} // 원하는 경로로 수정
      >
        <TextNormal>이용 약관 및 오픈소스 이용 안내</TextNormal>
      </button>
    </div>
  );
}
