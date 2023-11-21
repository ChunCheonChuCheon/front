import React, { useEffect } from 'react';
import Maps from './Maps';
import WhiteBox from '../white-box';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';
export default function Location(props) {
  return (
    <WhiteBox>
      <div class='flex justify-between items-center'>
                <button class='font-bold text-2xl mb-5'>
                    ←
                </button>
                <div class='text-normal'>2/4</div>
            </div>
      <TextBold>
        <div class='mb-7'>모임 장소 정하기</div>
      </TextBold>
      <Maps />

      <button
          class='bg-[#369fff] hover:bg-[#0077e1] rounded-lg mt-5 p-2 text-white font-bold'
          onClick={()=>{props.handleStep(1)}}
        >
          다음
        </button>
    </WhiteBox>
  );
   
};


