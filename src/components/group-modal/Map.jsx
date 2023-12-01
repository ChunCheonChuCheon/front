import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import React, { useEffect, useState } from 'react';

const Map = (props) => {
    const mapRef = React.useRef(null);
    const [location, setLocation] = useState(props.location);



    

    return (
        <div className='text-center'>
            <MapContainer
                center={props.location}
                style={{ height: props.height }}
                zoom={15}
                zoomControl={false}
            >   



                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={location} >
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map;
