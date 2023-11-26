import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import React, { useEffect, useState } from 'react';

const Map = (props) => {
    const mapRef = React.useRef(null);
    const [location, setLocation] = useState(props.location);



    

    return (
        <div>
            <MapContainer
                center={props.location}
                style={{ height: props.height }}
                zoom={15}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* 가운데에 고정된 마커 추가 */}
                <Marker position={location} >
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map;
