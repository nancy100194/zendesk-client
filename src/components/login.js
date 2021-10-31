import React, { useState,useContext } from 'react';
import {  Link ,useHistory} from 'react-router-dom';
import '../App.css';
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import { CredentialsContext } from "../App";
import Tickets from '../tickets/tickets.js';

import axios from 'axios'

    
 export default function Login({handleLogin}) {
     const history = useHistory();
    const {User,logout} = useContext(CredentialsContext);
    const [user,setUser]=useState({email:"",password:""});
    const [message,setMessage]=useState("");
    const[ispassword,setpass]=useState(false);
    const [custommessage,setcustomMessage]=useState("");
 
    const login = (e)=>{
        e.preventDefault();
        setMessage("")
        const {email,password} = user;
        if(email==="")
        {
            setcustomMessage("Enter valid email.")
        }
        else if(password==="")
        {
            setcustomMessage("Enter valid Password.")
        }
        else
        {
            setcustomMessage(" ")
            return axios
            .post(` https://helpdeskticket-server.herokuapp.com/user/login`,{email,password})
         
            .then((res)=>{let data = res.data;
                let token = data.token;
            setMessage(data.message);
            setUser({email:"",password:""});
            if(token)
            {  
              
                handleLogin(user,token);
                history.push('/user/tickets');   
            }
        })
        .catch((error)=>(error.response.data));
    }
  
    }
  const  handleForgotpassword = () =>
  {
      setMessage("");
       setcustomMessage("");
      setpass(true);
  }

  const handlePassword = (e) =>
  {
      setMessage("");
      e.preventDefault();
      const {email} = user;
      if(email==="")
      {
          setcustomMessage("Enter email address.")
      }
   else{
       setcustomMessage("");
       return axios.post(' https://helpdeskticket-server.herokuapp.com/user/forgetpassword', {
        email
        })
     
        .then(function (response) {
            
            let data = response.data
          console.log(data.message);
          setMessage(data.message);
          setUser({email:"",password:""});
    
     
        }) .catch((error)=>(error.response.data));

   }
   history.push('/')
  }

  if(ispassword)
  {
    return(
        <Container>
            <Row>
                <Col xs={12} md={4}></Col>
                <Col xs={12} md={4} className="login-form my-5">
                    <h4 className="text-center p-3">Confirm your email address</h4>
                    <Form onSubmit={handlePassword}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" className="form-control login-text-style" style={{ fontSize: "12px" }} name="email" value={user.email} onChange={(e) => { setUser((usr) => ({ ...usr, email: e.target.value })) }} placeholder="Email Address" required="required" />
                        </Form.Group>
                        <Button variant="success" type="submit" style={{ color: 'white' }} onClick={handlePassword}>
                            Submit
                        </Button>
                    </Form>
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
    return (
   <>
            <Container>
                <Row>
                    <Col xs={12} md={4}></Col>
                    <Col xs={12} md={4}></Col>
                    <Col xs={12} md={4} className="login-form my-4">
                        <Form onSubmit={login}>
                            <h4 className="text-center login-text-style">Log In</h4>
                            <br></br>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" className="form-control login-text-style" style={{ fontSize: "12px" }} name="email" value={user.email} onChange={(e) => { setUser((usr) => ({ ...usr, email: e.target.value })) }} placeholder="Email Address" required="required" />
                                <Form.Text className="text-muted login-text-style" style={{ fontSize: "10px" }}>
                                    We'll never share your email with anyone else.
                            </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" style={{ fontSize: "12px" }} className="login-text-style" name="password" value={user.password} onChange={(e) => { setUser((usr) => ({ ...usr, password: e.target.value })) }} placeholder="Password" required="required" />
                            </Form.Group>
                            <Button variant="success" type="submit" size="sm" className="btn login-text-style" style={{ color: 'white' }} >
                                    Log In
                            </Button>
                          
                            <button type="submit" className="btn btn-link login-text-style" style={{ color: "black" }} onClick={handleForgotpassword} >
                                forgot Password?
                        </button>
                            <div className="or-seperator login-text-style"><i>OR</i></div>
                            <p className="text-center login-text-style" style={{ color: 'black' }}><b>Login with your social media account</b></p>
                            <div className="text-center social-btn">
                                <Link to="/" className="btn btn-secondary login-text-style" style={{ fontSize: "12px" }}>Facebook</Link>
                                <Link to="/" className="btn btn-info login-text-style" style={{ color: 'white', fontSize: "12px" }}> Twitter</Link>
                                <Link to="/" className="btn btn-danger login-text-style" style={{ fontSize: "12px" }}> Google</Link>
                            </div>
                        </Form>
                        <br></br>
                        <p className="text-center text-muted small signup-text-style">Don't have an account? <Link to="/register" className="signup-text-style" style={{ color: 'black' }}><b>Sign up here!</b></Link></p>
                        <hr></hr>
                        <div className='text-style '>
                            <p >{custommessage}</p>
                            <p >{message}</p>

                        </div>
                    </Col>
                </Row>
            </Container>
  
   </>
  );
}

