import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

//react-bootstrap
import {Navbar,Nav,Container,Row,Col,Button,Form} from 'react-bootstrap';
import { CredentialsContext } from "../App";

import { addTicket, fetchTickets } from "../tickets/interaction.js";

function Ticketform({tickets, setTickets,form,setForm}) {
    const history = useHistory();

    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("");
    const [custommessage, setcustomMessage] = useState("");
    const [department, setDepartment] = useState("Sales")
    const [priority, setPriority] = useState("low")

    const { User, token } = useContext(CredentialsContext);

    function handleDepartment(e) { setDepartment(e.target.value) }
    function handlePriority(e) { setPriority(e.target.value) }

    const handleClose=()=>{
        setSubject(""); setDepartment(""); setPriority("");
         setForm(false);
    }

    const handleCreate = (e)=>{
        e.preventDefault();
        setMessage("");  
        if(subject===" ")
        {
            setcustomMessage("Enter your subject.")
        }else if(!department || !priority)
        {
            setcustomMessage("Select department and priority to proceed.")
        }else{
        setcustomMessage(" ")
        const  ticket ={subject,department,priority};
        addTicket(token, subject,department,priority).then(()=>{
        handleTickets();
        handleClose();
        })
    }
}

    const handleTickets = ()=>{
        fetchTickets(token).then((data)=>{
            setTickets(data)
            console.log("Tickets:::",data)
        })
    }
 
      
    return (
        <>
            <Container>
                <Row>
                    <Col xs={12} md={4}></Col>
                    <Col xs={12} md={4} className="ticket-form">
                        <Form onSubmit={handleCreate}>
                            <Form.Group controlId="formBasicSubject">
                                <Form.Control type="text" value={subject} onChange={(e) => { setSubject(e.target.value) }} style={{ fontSize: "12px" }} placeholder="Subject" required="required" />
                            </Form.Group>
                            <Form.Group inline>
                            <Form.Label className="my-1 mr-2 text-style text-muted" htmlFor="inlineFormCustomSelectPref" style={{ fontSize: "12px"}}>
                            Department
                            </Form.Label>
                            <Form.Control
                                as="select"
                                className="my-1 mr-sm-2"
                                id="inlineFormCustomSelectPref"
                                custom
                                value={department}
                                onChange={handleDepartment}
                                style={{ fontSize: "12px" }}
                            >
                                
                                       <option selected value="sales">Sales</option>
                                        <option value="marketing">Marketing</option>
                                        <option value="IT support">IT support</option>
                                        <option value="Hardware">Hardware</option>
                            </Form.Control>
                            </Form.Group>
                            <Form.Group inline>
                            <Form.Label className="my-1 mr-2 text-style text-muted" htmlFor="inlineFormCustomSelectPref" style={{ fontSize: "12px" }}>
                            Department
                            </Form.Label>
                            <Form.Control
                                as="select"
                                className="my-1 mr-sm-2"
                                id="inlineFormCustomSelectPref"
                                custom
                                value={priority}
                                onChange={handlePriority}
                                style={{ fontSize: "12px" }}
                            >         <option selected value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="extreme">Extreme</option>
                            </Form.Control>
                            </Form.Group>
                         <Form.Group>
                         <Button variant="success" type="submit" size="sm" className="-text-style" style={{ color: 'white',fontSize:"12px" }} >
                                +Add Ticket
                            </Button>
                         </Form.Group>
                           
                        <Form.Group>
                        <Button variant="danger" type="submit" size="sm" className="-text-style" onClick={handleClose} style={{ color: 'white',fontSize:"12px" }} >
                                Cancel
                            </Button>
                        </Form.Group>
                        </Form>
                        
                        <div className='text-style '>
                            <p >{custommessage}</p>
                            <p >{message}</p>

                        </div>
                    </Col>
                </Row>
            </Container>
            
        </>
    )
}

export default Ticketform;