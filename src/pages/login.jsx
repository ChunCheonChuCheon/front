import React from 'react';

import Login from '../components/login-modal/login';
import DefaultLayout from '../layouts/default';
import AnimationWrapper from '../components/AnimationWrapper';

export default function LoginPage() {
  return (
<DefaultLayout>
      <Login />
    </DefaultLayout>
    
  );
}
