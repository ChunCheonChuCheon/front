import React from 'react';
import { useForm } from 'react-hook-form';
import WhiteBox from '../white-box';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await fetch('{{baseURL}}/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data.id,
          password: data.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result); // 처리 결과를 콘솔에 출력하거나 다른 작업 수행
        
      } else {
        console.error('API 호출 실패');
      }
    } catch (error) {
      console.error('API 호출 중 오류:', error);
    }
  };

  return (
    <WhiteBox>
      <TextBold>
        <div class='mb-3'>로그인</div>
      </TextBold>
      <TextNormal>소셜로그인은 아니지만 로그인하기 </TextNormal>
      {/*make login form prettier using react-hook-form*/}
      <form class='flex flex-col mt-5' onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('id', { required: true, maxLength: 20 })}
          class='border-b-2 border-[#E2D9FF] focus:outline-none focus:border-[#E2D9FF] p-2'
          type='text'
          placeholder='아이디'
        />
        <input
          {...register('password', {
            required: true,
            maxLength: 20,
            pattern: /^[A-Za-z0-9]+$/i,
          })}
          class='border-b-2 border-[#E2D9FF] focus:outline-none focus:border-[#E2D9FF] p-2'
          type='password'
          placeholder='비밀번호'
        />
        <button
          class='bg-[#E2D9FF] hover:bg-[#866dd8] rounded-lg mt-5 p-2 text-white font-bold'
          type='submit'
        >
          로그인
        </button>
      </form>
    </WhiteBox>
  );
}
