import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/main');
  }, [navigate]);

  return <div />;
}

