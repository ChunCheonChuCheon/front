import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DefaultLayout from '../layouts/default';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useNavigate, useSearchParams } from 'react-router-dom';

export default function LoginKakaoCallbackPage() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const [baseURL] = useState(useSelector((state) => state.baseURL));
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = await axios
        .post(`${baseURL}/auth/login/social/kakao`, { code: code })
        .then((response) => response.data.token);

      localStorage.setItem('token', token);

      const storedRedirectPath = localStorage.getItem('redirectPath');
      

      if (storedRedirectPath) {
        navigate(storedRedirectPath);
      }
      else
      {
        navigate('/main');
      }
      localStorage.removeItem('redirectPath');
      console.log('로컬스토리지에서 패쓰삭제');
    })();
  }, [baseURL, code, navigate]);
  
  
  return <DefaultLayout>
    <div className='text-5xl animate-spin'>
    <AiOutlineLoading3Quarters />
    </div>
  </DefaultLayout>;
}
