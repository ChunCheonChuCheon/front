import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';

const Maps = () => {
    const [location, setLocation] = useState([37.86877,127.73804]);


    function DraggableMarker() {
        const [draggable, setDraggable] = useState(false);
        const [position, setPosition] = useState([37.86877,127.73804]);
        const markerRef = useRef(null);

        const eventHandlers = useMemo(
            () => ({
                dragend() {
                    const marker = markerRef.current;
                    if (marker != null) {
                        setPosition(marker.getLatLng());
                    }
                },
            }),
            []
        );

        const toggleDraggable = useCallback(() => {
            setDraggable((d) => !d);
        }, []);

        return (
            <Marker draggable={true} eventHandlers={eventHandlers} position={position} ref={markerRef}>
                <Popup minWidth={90}>
                    <span onClick={toggleDraggable}>
                        {draggable ? '마커를 드래그할 수 있습니다.' : '마커를 드래그하려면 클릭하세요.'}
                    </span>
                </Popup>
            </Marker>
        );
    }



    //위치정보 받아오기(한번만 실행)
    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation([latitude, longitude]);
                        console.log(latitude, longitude);
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
    }, []);



    return (
        <div>
            

            {/* 왜 location값이 바꼇는데 렌더링이 안되는거지? */}
            <MapContainer center={location} style={{ height: '20rem' }} zoom={20} scrollWheelZoom={false} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <DraggableMarker />
            </MapContainer>
        </div>

    );

};

export default Maps;
