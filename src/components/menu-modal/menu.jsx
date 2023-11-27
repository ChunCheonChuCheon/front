import React from 'react'
import WhiteBox from '../white-box';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';

const MenuModal = (props) => {






  return (
    <WhiteBox>
      <div class='flex flex-col justify-between items-center'>
        <img src={props.menu.img} class="w-4/5 h-4/5 my-5 rounded-2xl shadow-xl border border-solid border-gray"></img>
        <TextBold>{props.menu.name}</TextBold>
        <div class='flex justify-between items-center w-4/5'>
          {/* 회색 넘기기 버튼, 파란색 선호 버튼 */}


          <button class='p-3 rounded-lg bg-[#d5d5d5]' onClick={props.onNextModal}>넘기기</button>
          <button class='p-3 rounded-lg bg-[#369fff] hover:bg-[#0077e1] text-white' onClick={props.onFavoriteButtonClick}>선호 </button>
        </div>
      </div>
    </WhiteBox>
  )
}

export default MenuModal
