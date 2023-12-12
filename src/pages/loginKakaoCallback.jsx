import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
      navigate('/');
    })();
  }, [baseURL, code, navigate]);

  return <div>{code}</div>;
}
