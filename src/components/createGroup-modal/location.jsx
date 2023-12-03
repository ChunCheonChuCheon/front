import React, { useEffect, useState } from 'react';
import WhiteBox from '../white-box';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

export default function Location(props) {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true); // 추가: 로딩 상태를 관리하는 상태

  const mapRef = React.useRef(null);

  const getLocation = async () => {
    try {
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    } catch (error) {
      console.error('Error getting geolocation:', error);
    } finally {
      setLoading(false); // 위치 정보를 가져오든 못가져오든 로딩 상태 종료
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

 

  const handleDrag = () => {
    if (mapRef.current) {
      const newLocation = mapRef.current.getCenter();
      setUserLocation([newLocation.lat, newLocation.lng]);
    }
  };

  if (loading) {
    // 로딩 중일 때 로딩 상태를 표시
    return <div>Loading...</div>;
  }

  return (
    <WhiteBox>
      <div className='flex justify-between items-center'>
        <button className='font-bold text-2xl mb-5' onClick={() => { props.handleStep(-1) }}>
          ←
        </button>
        <div className='text-normal'>2/4</div>
      </div>
      <TextBold>
        <div className='mb-7'>모임 장소 정하기</div>
      </TextBold>
      <MapContainer
        center={userLocation}
        style={{ height: '40vh' }}
        zoom={15}
        zoomControl={false}
        whenReady={(map) => {
          map.target.on('drag', handleDrag);
          mapRef.current = map.target;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* 가운데에 고정된 마커 추가 */}
        <Marker position={userLocation} />
      </MapContainer>

      <button
        className='bg-[#369fff] hover:bg-[#0077e1] rounded-lg mt-5 p-2 text-white'
        onClick={() => {
          props.handleStep(1);
          props.setValue('location', userLocation);
          console.log("현재 내위치: " + userLocation);
        }}
      >
        <TextNormal>다음</TextNormal>
      </button>
    </WhiteBox>
  );
}
