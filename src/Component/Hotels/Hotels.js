import React from 'react';
import 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Data from '../FakeData/FakeData.json';
import HotelDetails from '../HotelDetails/HotelDetails';
import RouteMap from '../RouteMap/RouteMap';

const Hotels = () => {

    const {hotelId} = useParams();
    const hotelsInfo = Data.find( item => item.id === Number(hotelId));
    const {place_name, hotel_info} = hotelsInfo;
    
    return (
        <div className="container">
            <hr/>
            <div className="row">
                <div className="col-8">
                    <h4>Stay in - {place_name}</h4><br/>
                    {
                        hotel_info.map(hotel => <HotelDetails key={hotel.key} info={hotel}></HotelDetails>)
                    }
                </div>
                <div className="col-4">
                    <RouteMap></RouteMap>
                </div>
            </div>
        </div>
    );
};

export default Hotels;