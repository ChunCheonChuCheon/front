import React, { useState } from 'react';
import WhiteBox from '../white-box';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';
import arrowImage1 from '../../assets/icons/arrow-button-black.svg';
import arrowImage2 from '../../assets/icons/arrow-button.svg';

export default function Range(props) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const getDescription = () => {
    switch (selectedOption) {
      case 3:
        return '도보로 이동할 수 있는 3km 범위의 식당을 추천합니다.';
      case 6:
        return '차량으로 이동할 수 있는 6km 범위의 식당을 추천합니다.';
      case -1:
        return '춘천 전 지역을 추천합니다.';
      default:
        return '탐색범위를 선택해 주세요.';
    }
  };

  return (
    <WhiteBox>
      <div class='mb-6 flex justify-between items-center '>
        <div className='flex flex-col items-center '>
          <button  onClick={() => { props.handleStep(-1) }}>
            <img src={arrowImage1} alt='arrow' class='w-6 h-6 ' />
          </button>
        </div>
        <TextBold>
        <div >탐색범위 정하기</div>
        </TextBold>
        <button   onClick={() =>  {
          props.setValue('range', selectedOption)
          props.handleStep(1)
               }}
        disabled={!selectedOption}>
          <img src={arrowImage2} alt='arrow' class='w-10 h-10' />
        </button>
      </div>
      <TextBold>
        
        <div className='flex justify-between items-center '>
          <button
            className={`justify-center items-center w-1/4 flex flex-col rounded-lg p-2 ${selectedOption === 3 ? ' bg-blue-500 text-white' : ''}`}
            onClick={() => handleOptionClick(3)}
          >
            가깝게
          </button>
          <button
            className={`justify-center items-center w-1/4 flex flex-col rounded-lg p-2 ${selectedOption === 6 ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => handleOptionClick(6)}
          >
            멀게
          </button>
          <button
            className={`justify-center items-center  w-1/4 flex flex-col rounded-lg p-2 ${selectedOption === -1 ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => handleOptionClick(-1)}
          >
            전체
          </button>
        </div>
      </TextBold>
      <div className="w-full h-0.5 bg-black my-4"></div>
      {/* 설명 */}
      <div className="mb-4"><TextNormal>{getDescription()}</TextNormal></div>
      {/* 다음 버튼 */}
      
   
    </WhiteBox>
  );
}
