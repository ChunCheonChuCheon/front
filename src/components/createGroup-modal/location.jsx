import React, { useEffect, useState} from 'react';
import Map from './Map';
import WhiteBox from '../white-box';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';
export default function Location(props) {
  const [userlocation, setUserLocation] = useState([37.86877, 127.73804]);

  useEffect(() => {
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                },
                (error) => {
                    console.error('Error getting geolocation:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };
    getLocation();
},[]);



  return (
    <WhiteBox>
      <div class='flex justify-between items-center'>
                <button class='font-bold text-2xl mb-5' onClick={()=>{props.handleStep(-1)}} >
                    ←
                </button>
                <div class='text-normal'>2/4</div>
            </div>
      <TextBold>
        <div class='mb-7'>모임 장소 정하기</div>
      </TextBold>
      <Map location={userlocation} setLocation={setUserLocation}/>

      <button
          class='bg-[#369fff] hover:bg-[#0077e1] rounded-lg mt-5 p-2 text-white'
          onClick={()=>{
            props.handleStep(1)
            props.setValue('location', userlocation)
          }}
        >
        <TextNormal>다음</TextNormal>
        </button>
        
    </WhiteBox>
  );
   
};


