import React from 'react'
import WhiteBox from '../white-box';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';

export default function GroupName(props) {
  return (
    <WhiteBox>
      <div class='flex justify-between items-center'>
        <button class='font-bold text-2xl mb-5' onClick={()=>{props.handleStep(-1)}}>
        ←
        </button>
        <TextNormal>1/4</TextNormal>
      </div>
      
      <TextBold>
        <div class='mb-7'>새로운 그룹 만들기</div>
      </TextBold>
      <TextNormal>그룹 이름을 입력해주세요</TextNormal>

      <div class='flex flex-col mt-5'>
        <input
          {...props.register('name', { required: true})}
          class='border-b-2 border-[#369fff] focus:outline-none focus:border-[#0077e1] p-2'
          type='text'
          placeholder='그룹 이름'
        />
        <button
          class='bg-[#369fff] hover:bg-[#0077e1] rounded-lg mt-5 p-2 text-white'
          onClick={()=>{
            props.handleStep(1)
          }}
        >
         <TextNormal>다음</TextNormal>
        </button>
    
      </div>     
      
    </WhiteBox>
  );
}

