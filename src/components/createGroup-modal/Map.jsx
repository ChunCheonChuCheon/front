import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import React, { useEffect, useState } from 'react';

const Map = (props) => {
    const mapRef = React.useRef(null);
    const [location, setLocation] = useState(props.location);
    


    // 지도 드래그 이벤트 핸들러
    const handleDrag = () => {
        if (mapRef.current) {
            const newLocation = mapRef.current.getCenter();
            setLocation([newLocation.lat, newLocation.lng]);
           
        }
    };

    useEffect(() => {props.setLocation(location)}, [location]);

    return (
        <div>
            <MapContainer
                center={props.location}
                style={{ height:'40vh'}}
                zoom={20}
                scrollWheelZoom={false}
                whenReady={(map) => {
                    map.target.on('drag', handleDrag);
                    mapRef.current = map.target;
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* 가운데에 고정된 마커 추가 */}
                <Marker position={location} draggable={true}>
                    {/* Popup은 선택사항입니다. 필요하면 추가하십시오. */}
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map;
