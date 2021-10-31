import React,{useState,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { CredentialsContext } from "../App";
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import { addContactForm } from "../tickets/interaction.js";

function Contactus ({Cform,setCForm})
{
 
	const [user,setUser]=useState({firstname:"",lastname:"",cmessage:""})
    const [message,setMessage]=useState("");
    const [custommessage,setcustomMessage]=useState("");
    const {User,token} = useContext(CredentialsContext);

    const handleClose=()=>{
        setMessage("");
        setCForm(false);
    }

    
    const handleSubmitContact= (e)=>{
        e.preventDefault();
        setMessage("");  
        const {firstname,lastname,cmessage} = user;
        if(cmessage===" ")
        {
            setcustomMessage("Enter your message.")
        }else if(!firstname || !lastname)
        {
            setcustomMessage("Fill necessary credentials.")
        }else{
            setcustomMessage("")
            const  ContactForm ={firstname,lastname,cmessage};
            addContactForm(token, firstname,lastname,cmessage).then((res)=>{
            setMessage(res.message);
           
        })
       
    }
}

    return(
        <>
		  
		  <Container >
                <Row>
                    <Col xs={12} md={4}></Col>
                    <Col xs={12} md={4} className="contact-form my-4">
                        <Form onSubmit={handleSubmitContact} >
                            <h4 className="text-center contact-text-style my-2">Contact Us</h4>
							<p className="contact-text-style text-muted"style={{fontSize:"12px"}} >We'd love to hear from you, please drop us a line if you've any query or comments related to our services.</p>
                            <hr></hr>
                            <Row>
                                <Col>
                                    <Form.Control placeholder="First name" value={user.firstname} onChange={(e) => { setUser((usr) => ({ ...usr, firstname: e.target.value })) }}style={{fontSize:"12px"}} placeholder="First Name" required="required"/>
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Last name" style={{fontSize:"12px"}} value={user.lastname} onChange={(e) => { setUser((usr) => ({ ...usr, lastname: e.target.value })) }}placeholder="Last Name" required="required"/>
                                </Col>
                            </Row>
                            <br></br>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" className="form-control signup-text-style" style={{ fontSize: "12px" }} name="email" value={User.email}  placeholder="Email Address" required="required" />
                            </Form.Group>
							<Form.Group controlId="exampleForm.ControlTextarea1">
								<Form.Control as="textarea" rows={3} style={{fontSize:"12px"}} className="contact-text-style" placeholder="Enter your message here" value={user.cmessage} onChange={(e) => { setUser((usr) => ({ ...usr, cmessage: e.target.value })) }} required="required"/>
							</Form.Group>
                            <Form.Group>
                            <Button variant="success" type="submit" size="sm" className=" contact-text-style" style={{color:'white',fontSize:"12px"}} >
							Send Message
                            </Button> 
                            </Form.Group>
                            <Form.Group>
                            <Button variant="danger" type="submit" size="sm" className=" contact-text-style" style={{color:'white',fontSize:"12px"}} onClick={handleClose} >
							Back
                            </Button> 
                            </Form.Group>
							<hr></hr>
                        <div className='text-style '>
                            <p >{custommessage}</p>
                            <p >{message}</p>

                        </div>    
                        </Form>
                       
                    </Col>
                </Row>
        </Container>
  
        </>
    )
}

export default  Contactus;