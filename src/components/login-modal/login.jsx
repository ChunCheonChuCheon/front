import React from 'react';
import { useForm } from 'react-hook-form';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import ccccIcon from '../../assets/icons/ccccicon.png';
export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseURL = useSelector((state) => state.baseURL);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, {
        id: data.id,
        password: data.password,
      });

      if (response.status === 201) {
        const result = response.data;
        dispatch(setAuthToken(result.access_token));
        localStorage.setItem('token', result.access_token);

        navigate('/main');

      } else {
        console.error('API 호출 실패');

      }
    } catch (error) {
      console.error('API 호출 중 오류:', error)
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
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
      <div className="w-2/5 mb-1">
        <img src={ccccIcon} alt='Icon' class="w-full h-full object-cover"></img>
      </div>
      <TextNormal><div className='mb-8 text-[#369fff]'>춘천추천: 단체 식사 맛집 추천</div></TextNormal>

      <LoginWhiteBox>
        <TextBold>
          <div class='mb-3'>로그인</div>
        </TextBold>
        <TextNormal>소셜로그인은 아니지만 로그인하기 </TextNormal>
        {/*make login form prettier using react-hook-form*/}
        <form class='flex flex-col mt-5' onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('id', { required: true, maxLength: 20 })}
            class='border-b-2 border-[#369fff] focus:outline-none focus:border-[#0077e1] p-2'
            type='text'
            placeholder='아이디'
          />
          <input
            {...register('password', {
              required: true,
              maxLength: 20,
            })}
            class='border-b-2 border-[#369fff] focus:outline-none focus:border-[#0077e1] p-2'
            type='password'
            placeholder='비밀번호'
          />
          <button
            class='bg-[#369fff] hover:bg-[#0077e1] rounded-lg mt-5 p-2 text-white font-bold'
            type='submit'
          >
            로그인
          </button>
        </form>
        {/* 회원가입 버튼 */}
        <button
          class='ml-auto text-blue-500 hover:text-blue-700 hover:underline  mt-5 '
          onClick={() => navigate('/signup')}

        ><TextNormal>회원가입</TextNormal>
        </button>
      </LoginWhiteBox>
      <button
        className='ml-auto  hover:underline mt-2 p-2 '
        onClick={() => navigate('/policy')}  // 원하는 경로로 수정
      ><TextNormal>
          이용 약관 및 오픈소스 이용 안내
        </TextNormal>
      </button>
    </div>

  );
}
