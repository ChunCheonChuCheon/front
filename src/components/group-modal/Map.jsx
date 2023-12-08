import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import React, { useState } from 'react';

const Map = (props) => {
    const [location] = useState(props.location);


    
    

    return (
        <div className='text-center'>
            <MapContainer
                center={props.location}
                style={{ height: props.height }}
                zoom={15}
                zoomControl={false}
                dragging={false}
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
