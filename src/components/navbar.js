import React from 'react';
import { Link } from "react-router-dom";
import logo from '../images/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav} from 'react-bootstrap';
import '../App.css';

const style = {fontFamily:'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif',
fontWeight: 'bold',
fontSize:'25px',
color:'rgba(15, 138, 15, 0.63)'}


function Navigation ()
{
    return(
       
            <Navbar bg="light" expand="lg">
            <img src={logo} className=" imager d-inline-block align-top ml-2 " alt="logo" />
            <Navbar.Brand href="/" style={style}>ZenDesk Ticketing</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className=" justify-content-end" id="basic-navbar-nav ">
                <Nav >
                    <Nav.Link href="/register" style={{ fontSize: "13px" }} className="text-style"><b>Register</b></Nav.Link>
                    <Nav.Link href="/" style={{ fontSize: "13px" }} className="text-style"><b>Login</b></Nav.Link>
                    
                </Nav>
            </Navbar.Collapse>
        </Navbar>
      
        

    )
}

export default Navigation;
