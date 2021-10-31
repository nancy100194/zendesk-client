import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

//react-bootstrap
import {Container,Row,Card,Col} from 'react-bootstrap';


function Footer ()
{
    
    return(
<>
<Container fluid>
    <Row >
        <Col xs={12} md={12} className="text-center p-3">
       <hr ></hr>
           <small className=" text-center  " style={{ fontSize: "11px",color:"white"}} >&copy; 2021 All rights reserved & Powered by <b>NANCY BRISILLA</b></small>
 
        </Col>
    </Row>
</Container>
</>
        
       
          
   
    )
}

export default  Footer;