import React, { useState } from 'react';
import WhiteBox from '../white-box';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';

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
        return '탐색범위를 선택해주세요.';
    }
  };

  return (
    <WhiteBox>
      <div className='flex justify-between items-center'>
        <button className='font-bold text-2xl mb-5' onClick={() => {props.handleStep(-1)}}>
          ←
        </button>
        <TextNormal>4/4</TextNormal>
      </div>
      <TextBold>
        <div className='mb-7'>탐색범위 정하기</div>
        <div className='flex justify-between items-center'>
          <button
            className={`flex flex-col rounded-lg p-2 ${selectedOption === 3 ? ' bg-blue-500 text-white' : ''}`}
            onClick={() => handleOptionClick(3)}
          >
            가깝게
          </button>
          <button
            className={`flex flex-col rounded-lg p-2 ${selectedOption === 6 ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => handleOptionClick(6)}
          >
            멀게
          </button>
          <button
            className={`flex flex-col rounded-lg p-2 ${selectedOption === -1 ? 'bg-blue-500 text-white' : ''}`}
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
      <button
        className='bg-[#369fff] hover:bg-[#0077e1] rounded-lg mt-5 p-2 text-white'
        onClick={() =>  {
          props.setValue('range', selectedOption)
          props.handleStep(1)
               }}
        disabled={!selectedOption} // 선택된 옵션이 없으면 버튼 비활성화
      >
       <TextNormal>다음</TextNormal>
       
      </button>
   
    </WhiteBox>
  );
}
