import React from 'react'
import WhiteBox from '../white-box';
import TextBold from '../text-bold';

const MenuModal = (props) => {






  return (
    <WhiteBox>
      <div class='flex flex-col justify-between items-center'>
        <img src={props.category.img} alt='category food' class="w-4/5 h-4/5 my-3 rounded-2xl shadow-xl border border-solid border-gray"></img>
        <TextBold>
          <div class='mb-5'>{props.category.name}</div>
        </TextBold>
        <div class='flex justify-between items-center w-4/5'>


          <button class='p-3 rounded-lg bg-[#ff6666]' onClick={props.onBadButtonClick}>별로</button>
          <button class='p-3 rounded-lg bg-[#d5d5d5]' onClick={props.onNormalButtonClick}>보통</button>
          <button class='p-3 rounded-lg bg-[#369fff] hover:bg-[#0077e1] text-white' onClick={props.onGoodButtonClick}>좋음</button>
        </div>
      </div>
    </WhiteBox>
  )
}

export default MenuModal
