import React from 'react'
import { useForm } from 'react-hook-form';
import WhiteBox from '../white-box';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';

export default function PersonalName(props){
  const { register, handleSubmit } = useForm();


  //닉네임 받은거 처리하는 곳
  const onSubmit = async (data) => {
    props.onClose();
  };

  return (
    <WhiteBox>
      <TextBold>
        <div class='mb-7'>닉네임 만들기</div>
      </TextBold>
      <TextNormal>서비스에서 사용할 닉네임을 입력해주세요</TextNormal>

      <form class='flex flex-col mt-5' onSubmit={handleSubmit(onSubmit)}>
        <input
         {...register('personalName', { required: true})}
          class='border-b-2 border-[#369fff] focus:outline-none focus:border-[#E2D9FF] p-2'
          type='text'
          placeholder='닉네임'
        />
        <button
          class='bg-[#369fff] hover:bg-[#0077e1] rounded-lg mt-5 p-2 text-white font-bold'
          type='submit'
        >
          확인
        </button>
      </form>
    </WhiteBox>


  )
}

 
