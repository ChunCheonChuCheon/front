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
    const pinNumber = Object.values(data).join('');
    try {
      

      const response = await axios.get(`${baseURL}/group?pin=${pinNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const result = response.data;
        navigate(`/group/${pinNumber}`, { state: result });
      } else {
        console.error('API 호출 실패');
      }
    } catch (error) { //각 케이스별로 테스트 해봐야함
      if(error.response.data.message==='해당하는 PIN의 그룹을 찾을 수 없습니다.'){
        alert('해당하는 PIN의 그룹을 찾을 수 없습니다.')
      }
      else if(error.response.data.message==='Invalid token')
      {
        navigate('/login', { state: { from:`/group/${pinNumber}`} });
        
      }
      //핀번호가 틀렷을시에
      console.error('API 호출 중 오류(joinGroup: Onsubmit):', error);
      console.log('error.response: ',error.response.data);
      console.log('error.respnse.message: ',error.response.data.message);


      //여기서 핀번호를 먼저 거르고 토큰을 걸러서 만약 둘다 이상할경우에 핀번호 오류를 먼저 띄우자
      //그러면 토큰이 이상할경우에 핀번호는 맞을테니 핀번호 페이지로 이동해서 거기서 검사없이 바로
      //핀번호로 그룹정보 가져오는 콜에 오류 안걸릴듯

      //토큰이 이상한 경우에
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

  const handleCreateButton =async ()=>{
      try {
        
        const response = await axios.get(`${baseURL}/auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          navigate('/new');

        } else {
          console.error('API 호출 실패');
        }
      } catch (error) { 
        console.error('API 호출 중 오류(joinGroupPage-그룹생성버튼클릭후 토큰인증):', error);
  
  
        //토큰이 이상한 경우에
         navigate('/login', { state: { from:`/new`} });
      }

    }
  
  


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
            handleCreateButton();
            
          }}
        >
          <TextBold>새로운 그룹 만들기</TextBold>
        </button>
      </div>
    </div>
  );
}
