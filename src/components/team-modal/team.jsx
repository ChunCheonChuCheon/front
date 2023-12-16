import React from 'react'
import WhiteBox from '../white-box'
import TextNormal from '../text-normal';
import TextBold from '../text-bold';
import { useNavigate } from 'react-router-dom';
import arrowImage1 from '../../assets/icons/arrow-button-black.svg';

export default function TeamModal() {

    const navigate = useNavigate();
  return (
    <WhiteBox>
        <div className='flex  items-center '>
          <button onClick={() => { navigate('/login') }}>
            <img src={arrowImage1} alt='arrow' class='w-6 h-6 ' />
          </button>
        </div>
        <div className='pl-2'>
      <p className='py-4'><TextBold>팀 소개</TextBold></p>
      <TextNormal>


        저희는 강원대학교 AI융합학과 오픈소스프로그래밍 수업에서 출발한 팀으로, 
        단체 식사 시 맛집을 추천하는 서비스를 개발하고 있습니다.
        
  
      <div className='py-2'>
      <h2 clas>Contribute at</h2>
      <a className='pl-2 hover:underline text-blue-500 hover:text-blue-700 transition-colors duration-300'href="https://github.com/ChunCheonChuCheon">ChunCheonChuCheon</a>
      </div>
      
      <div className='py-2'>
      <h2>Contribute by</h2>
      <ul className='pl-2 '>
        <li ><a href='https://github.com/being0606' className='pl-2 hover:underline text-blue-500 hover:text-blue-700 transition-colors duration-300'>JIN HyunLim</a> / DS</li>
        <li><a href='https://github.com/SongKKang' className='pl-2 hover:underline text-blue-500 hover:text-blue-700 transition-colors duration-300'>SongKKang</a> / FE</li>
        <li><a href='https://github.com/gd5097' className='pl-2 hover:underline text-blue-500 hover:text-blue-700 transition-colors duration-300'>jab_cho</a> / BE</li>
        <li><a href='https://github.com/Awhn' className='pl-2 hover:underline text-blue-500 hover:text-blue-700 transition-colors duration-300'>Awhn</a> / PO</li>
      </ul>
      </div>
      </TextNormal>
      
    </div>
    </WhiteBox>
  )
}


