import React from 'react';
import { useForm } from 'react-hook-form';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import arrowImage from '../../assets/icons/arrow-button.svg';

export default function JoinGroup() {
  const { register, handleSubmit, setFocus } = useForm();
  const navigate = useNavigate();
  const [baseURL] = useState(useSelector((state) => state.baseURL));

  const token = localStorage.getItem('token');

  async function onSubmit(data) {
    try {
      const pinNumber = Object.values(data).join('');

      const response = await axios.get(`${baseURL}/group?pin=${pinNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const result = response.data;

        navigate(`/group/${data.pinNumber}`, { state: result });
      } else {
        console.error('API 호출 실패');
      }
    } catch (error) {
      console.error('API 호출 중 오류(joinGroup: Onsubmit):', error);
      alert('핀번호가 존재하지 않습니다.');
    }
  }

  const JoinGroupWhiteBox = ({ children }) => {
    return (
      <div class='w-full  h-auto px-7 py-7 bg-white rounded-3xl shadow-xl flex flex-col'>
        {children}
      </div>
    );
  };

  const handlePinInputChange = (index, e) => {
    if (index + 1 === 6) {
      e.target.blur();
    }
    setFocus(`pinNumber${index + 1}`);
  };

  return (
    <div class='w-4/5 max-w-[400px]'>
      <JoinGroupWhiteBox>
        <div class='flex flex-row justify-between'>
          <TextBold>
            <div class='mb-7'>그룹 참가하기</div>
          </TextBold>
          <button type='button' onClick={handleSubmit(onSubmit)}>
            <img src={arrowImage} alt='arrow' class='w-10 h-10' />
          </button>
        </div>
        <TextNormal>공유받은 핀 번호를 입력해주세요</TextNormal>

        <form class='flex flex-row justify-between mt-5' id='pin'>
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              {...register(`pinNumber${i}`, { required: true, maxLength: 1 })}
              className='w-1/6 min-w-10 h-14 bg-gray-200 border-none outline-none text-center font-bold text-lg rounded-[10px] mx-1'
              type='text'
              placeholder=''
              onInput={(e) => handlePinInputChange(i, e)}
            />
          ))}
        </form>
      </JoinGroupWhiteBox>
      <div class='flex justify-center items-center mt-7'>
        <div class='border-b-2 border-[#000000] w-2/5 mr-2'></div>
        <TextNormal>아니면..</TextNormal>
        <div class='border-b-2 border-[#000000] w-2/5  ml-2'></div>
      </div>
      <div class='flex flex-col mt-5'>
        <button
          class='bg-gradient-to-b from-[#369fff] to-[#318fe6] hover:bg-[#0077e1] rounded-lg  p-3 text-white font-normal'
          onClick={() => {
            navigate('/new');
          }}
        >
          <TextBold>새로운 그룹 만들기</TextBold>
        </button>
      </div>
    </div>
  );
}
