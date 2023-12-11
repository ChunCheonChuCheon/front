import React from 'react'
import WhiteBox from '../white-box';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';
import arrowImage1 from '../../assets/icons/arrow-button-black.svg';
import arrowImage2 from '../../assets/icons/arrow-button.svg';


export default function GroupName(props) {
  return (
    <WhiteBox>
      <div class='mb-6 flex justify-between items-center '>
        <div className='flex flex-col items-center '>
          <button  onClick={() => { props.handleStep(-1) }}>
            <img src={arrowImage1} alt='arrow' class='w-6 h-6 ' />
          </button>
        </div>
        <TextBold>
          <div>새로운 그룹 만들기</div>
        </TextBold>
        <button  onClick={() => {
          props.handleStep(1)
        }}>
          <img src={arrowImage2} alt='arrow' class='w-10 h-10' />
        </button>
      </div>

      <TextNormal>그룹 이름을 입력해 주세요</TextNormal>

      <div class='flex flex-col mt- my-5'>
        <input
          {...props.register('name', { required: true})}
          class='border-b-2 border-[#369fff] focus:outline-none focus:border-[#0077e1] p-2'
          type='text'
          placeholder='그룹 이름'
        />
        
    
      </div>     
      
    </WhiteBox>
  );
}

