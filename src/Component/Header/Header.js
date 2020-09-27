import React, { useContext } from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import './Header.css';
import logo from './Logo.png';
import { Link } from 'react-router-dom';
import { UserLoggedInContext } from '../../App';


const Header = () => {
    const [userLoggedIn, setUserLoggedIn] = useContext(UserLoggedInContext);
    console.log(userLoggedIn);
    return (
        <Navbar className="container" collapseOnSelect expand="lg" bg="" variant="">
            <Link to="/home">
                <Navbar.Brand >
                    <img className="logo" src={logo} alt=""/>
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Form inline className="ml-5">
                        <FormControl type="text" placeholder="Search Your Destination" className="mr-sm-2" />
                        <Button variant="danger"><SearchIcon></SearchIcon> Search</Button>
                    </Form>
                </Nav>
                <Nav>
                    <Nav.Link className="mx-3 my-auto">News</Nav.Link>
                    <Nav.Link className="mx-3 my-auto">Contact</Nav.Link>
                    <Nav.Link className="mx-3 my-auto">Blog</Nav.Link>
                    {
                        userLoggedIn.isLoggedIn ? 
                        <div className="d-flex justify-content-center align-items-center">
                            <h5 className="mx-3 my-auto">{userLoggedIn.name}</h5>
                        </div>
                        
                        : 
                        <Link to="/login" className="mx-3 my-auto">
                            <Button variant="warning">Login</Button>
                        </Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;