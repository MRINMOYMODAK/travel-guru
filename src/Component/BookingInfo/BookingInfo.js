import React from 'react';
import { useParams } from 'react-router-dom';
import './BookingInfo.css';
import Data from '../FakeData/FakeData.json';
import { Col, Row } from 'react-bootstrap';
import BookingCard from '../BookingCard/BookingCard';



const BookingInfo = () => {

    const {bookInfoKey} = useParams();
    const placeInfo = Data.find( item => item.id === Number(bookInfoKey));
    const {place_name, description} = placeInfo;

    return (
        <div className="text-light background">
            <div className="container">
                <Row className="d-flex align-items-center justify-content-center">
                    <Col md={12} lg={6}>
                        <div className="p-3 m-3">
                            <h1 className="text-center">{place_name}</h1>
                            <p>{description}</p>
                        </div>
                    </Col>
                    <Col md={12} lg={6}>
                        <div className="booking-card text-dark m-4 p-4">
                            <BookingCard id={bookInfoKey}></BookingCard>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default BookingInfo;