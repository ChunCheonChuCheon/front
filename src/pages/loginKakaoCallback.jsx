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
  const [redirectPath,setRedirectPath] = useState('/main')
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = await axios
        .post(`${baseURL}/auth/login/social/kakao`, { code: code })
        .then((response) => response.data.token);

      localStorage.setItem('token', token);

      const storedRedirectPath = localStorage.getItem('redirectPath');
      console.log('로그인콜백페이지: 스테이트redeirectPath',redirectPath);
      console.log('로그인콜백페이지: 로컬스토리지에서 받아온거',storedRedirectPath);

      if (storedRedirectPath) {
        setRedirectPath(storedRedirectPath).then(console.log('스테이트변경후: ',redirectPath));
      }
      navigate(localStorage.getItem('redirectPath'));
    })();
  }, [baseURL, code, navigate,redirectPath]);
  
  
  return <DefaultLayout>
    <div className='text-5xl animate-spin'>
    <AiOutlineLoading3Quarters />
    </div>
  </DefaultLayout>;
}
