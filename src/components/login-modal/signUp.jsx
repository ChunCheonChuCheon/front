import React from 'react';
import { useForm } from 'react-hook-form';
import WhiteBox from '../white-box';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const baseURL = useSelector((state) => state.baseURL);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/user`, {
        id: data.id,
        password: data.password,
      });

      if (response.status === 201) {
        navigate('/login');
      } else {
        console.error('API 호출 실패:', response);
      }
    } catch (error) {
      console.error('API 호출 중 오류:', error);
      alert('이미 있는 아이디입니다.');
    }
  };

  return (
    <WhiteBox>
      <TextBold>
        <div className='mb-3'>회원가입</div>
      </TextBold>
      <TextNormal>소셜 회원가입은 아니지만 회원가입하기</TextNormal>
      <form className='flex flex-col mt-5' onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('id', {
            required: '아이디는 필수 항목입니다.',
            minLength: { value: 4, message: '아이디는 4자 이상이어야 합니다.' },
            maxLength: { value: 12, message: '아이디는 12자 이하이어야 합니다.' },
            pattern: {
              value: /^[A-Za-z][A-Za-z0-9]*$/,
              message: '영어로 시작하는 영어와 숫자의 조합이어야 합니다.',
            },
          })}
          className='border-b-2 border-[#369fff] focus:outline-none focus:border-[#0077e1] p-2'
          type='text'
          placeholder='아이디'
        />
        {errors && errors.id && <p className='text-red-500'>{errors.id.message}</p>}

        <input
          {...register('password', {
            required: '비밀번호는 필수 항목입니다.',
            minLength: { value: 8, message: '비밀번호는 8자 이상이어야 합니다.' },
            maxLength: { value: 36, message: '비밀번호는 36자 이하이어야 합니다.' },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
              message: '영어 문자와 특수문자(!@#$%^&*)를 최소 하나씩 포함해야 합니다.',
            },
          })}
          className='border-b-2 border-[#369fff] focus:outline-none focus:border-[#0077e1] p-2'
          type='password'
          placeholder='비밀번호'
        />
        {errors && errors.password && <p className='text-red-500'>{errors.password.message} </p>}

        <button
          className='bg-[#369fff] hover:bg-[#0077e1] rounded-lg mt-5 p-2 text-white font-bold'
          type='submit'
        >
          가입하기
        </button>
      </form>

      <button
        className='ml-auto text-blue-500 hover:text-blue-700 hover:underline mt-5 p-2 '
        onClick={() => navigate('/login')}
      >
        로그인
      </button>
    </WhiteBox>
  );
}
