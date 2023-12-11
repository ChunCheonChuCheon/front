import React, { useEffect, useState } from 'react';
import WhiteBox from '../white-box';
import TextBold from '../text-bold';
import TextNormal from '../text-normal';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import arrowImage1 from '../../assets/icons/arrow-button-black.svg';
import arrowImage2 from '../../assets/icons/arrow-button.svg';

export default function Location(props) {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
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
    return <div>Loading...</div>;
  }

  return (
    <WhiteBox>
      <div class='mb-3 flex justify-between items-center '>
        <div className='flex flex-col items-center '>
          <button  onClick={() => { props.handleStep(-1) }}>
            <img src={arrowImage1} alt='arrow' class='w-6 h-6 ' />
          </button>
        </div>
        <TextBold>
          <div>모임 장소 정하기</div>
        </TextBold>
        <button  onClick={() => {
          props.handleStep(1)
          props.setValue('location', userLocation);
        }}>
          <img src={arrowImage2} alt='arrow' class='w-10 h-10' />
        </button>
      </div>
      <div className='my-2'>
          <TextNormal>모임 장소를 지정해 주세요</TextNormal>
          </div>  

      <MapContainer
        center={userLocation}
        style={{ height: '30vh' }}
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
        <Marker position={userLocation} />
      </MapContainer>


    </WhiteBox>
  );
}
