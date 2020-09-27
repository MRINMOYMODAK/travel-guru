import React from 'react';
import { Button, Carousel, Col, Row } from 'react-bootstrap';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import "./Home.css";
import Data from '../FakeData/FakeData.json';
import { Link } from 'react-router-dom';

const coxBazarInfo = Data.find( place => place.category === "coxsbazar");
const sreemangalInfo = Data.find ( place => place.category === "sreemangal");
const sundarbanInfo = Data.find ( place => place.category === "sundarban");

const Home = () => {
    
    return (
        <div className="text-light background">
            <Carousel className="container p-3">
                <Carousel.Item>
                    <Row className="d-flex align-items-center">
                        <Col md={12} lg={6}>
                            <div className="p-3">
                                <h1 className="text-center">{coxBazarInfo.place_name}</h1>
                                <p>{coxBazarInfo.description}</p>
                                <div className="d-flex justify-content-center">
                                    <Link to={`/info/${coxBazarInfo.id}`}><Button variant="warning">Booking <ArrowRightAltIcon /> </Button></Link>
                                </div> 
                            </div>
                        </Col>
                        <Col md={12} lg={6}>
                            <div className="p-5">
                                <img className="carousel-img" src={coxBazarInfo.imgURL} alt="First slide"/>
                            </div>
                        </Col>
                    </Row>
                </Carousel.Item>
                
                <Carousel.Item>
                    <Row className="d-flex align-items-center">
                        <Col md={12} lg={6}>
                            <div className="p-3">
                                <h1 className="text-center">{sreemangalInfo.place_name}</h1>
                                <p>{sreemangalInfo.description}</p>
                                <div className="d-flex justify-content-center">
                                    <Link to={`/info/${sreemangalInfo.id}`}> <Button variant="warning">Booking <ArrowRightAltIcon /> </Button></Link>
                                </div>
                            </div>
                        </Col>
                        <Col md={12} lg={6}>
                            <div className="p-5">
                                <img className="carousel-img" src={sreemangalInfo.imgURL} alt="First slide"/>
                            </div>
                        </Col>
                    </Row>
                </Carousel.Item>

                <Carousel.Item>
                    <Row className="d-flex align-items-center">
                        <Col md={12} lg={6}>
                            <div className="p-3">
                                <h1 className="text-center">{sundarbanInfo.place_name}</h1>
                                <p>{sundarbanInfo.description}</p>
                                <div className="d-flex justify-content-center">
                                    <Link to={`/info/${sundarbanInfo.id}`}><Button variant="warning">Booking <ArrowRightAltIcon /> </Button></Link>
                                </div>
                            </div>
                        </Col>
                        <Col md={12} lg={6}>
                            <div className="p-5">
                                <img className="carousel-img" src={sundarbanInfo.imgURL} alt="First slide"/>
                            </div>
                        </Col>
                    </Row>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Home;