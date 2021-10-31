import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

//importing component
import {handleErrors} from './login';

//react-bootstrap
import {Container,Row,Col,Form,Button} from 'react-bootstrap';

import axios from 'axios';
import { Link ,useHistory} from "react-router-dom";


function Register ()
{
    const history = useHistory();

    const [user,setUser]=useState({firstname:"",lastname:"",email:"",password:""})
    const [message,setMessage]=useState("");
    const [custommessage,setcustomMessage]=useState("");



    const handleRegister=(e)=>{

        setMessage("");
        e.preventDefault();
        
        const {firstname,lastname,email,password} =user
        if(firstname === "" || lastname==="")
        {
           setcustomMessage("Enter your first name and lastname.");
        
        }
        else if(email==="")
        {
            setcustomMessage("Enter valid email.")
        }
        else if(password==="")
        {
            setcustomMessage("Enter valid Password.")
        }
        else{
            setcustomMessage("")
            return axios
            .post(` https://helpdeskticket-server.herokuapp.com/user/register`,{firstname,lastname,email,password})
            .then((res)=>
            {
                let data = res.data;
                setMessage(data.message);
                console.log(data.message);
                setUser({firstname:"",lastname:"",email:"",password:""});
             
            }
            
            )
            .catch((error)=>(error.response.data));
        }
       
     history.push('/login')
    
    }
    return(

        
        <Container >
                <Row>
                    <Col xs={12} md={4}></Col>
                    <Col xs={12} md={4}></Col>
                    <Col xs={12} md={4} className="signup-form my-4">
                        <Form onSubmit={handleRegister}>
                            <h4 className="text-center signup-text-style my-3">Register</h4>
                            <p className="signup-text-style text-center">Please fill in this form to create an account!</p>
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
                                <Form.Control type="email" className="form-control signup-text-style" style={{ fontSize: "12px" }} name="email" value={user.email} onChange={(e) => { setUser((usr) => ({ ...usr, email: e.target.value })) }} placeholder="Email Address" required="required" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" style={{ fontSize: "12px" }} className="signup-text-style" name="password" value={user.password} onChange={(e) => { setUser((usr) => ({ ...usr, password: e.target.value })) }} placeholder="Password" required="required" />
                            </Form.Group>
                        <div class="mb-2 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label signup-text-style" for="exampleCheck1"> I accept the <Link to="/login"><b style={{ color: "black" }}>Terms of Use</b></Link> &amp; <Link to="/login"><b style={{ color: "black" }}>Privacy Policy</b></Link></label>
                        </div>
        
                            <Button variant="success" type="submit" size="sm" className="btn signup-text-style" style={{color:'white'}} >
                                   Register
                            </Button>
                            <br></br>
                        </Form>
                        <br></br>
                        <div className="text-center signup-text-style" >Already have an account? <Link to="/"><b style={{color:"black"}}>Login here</b></Link></div>
                        <hr></hr>
                        <div className='text-style '>
                            <p >{custommessage}</p>
                            <p >{message}</p>

                        </div>
                    </Col>
                </Row>
        </Container>

          
   
    )
}

export default  Register;
