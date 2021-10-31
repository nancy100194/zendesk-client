import React,{useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';
import {handleErrors} from './login'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Col, Container,Form,Button,Row  } from 'react-bootstrap';


function Password (){
    const history = useHistory();
    const [user,setUser]=useState({password:"",cpassword:""});
    const [message,setMessage]=useState("");
    const [custommessage,setcustomMessage]=useState("");
    const {token} = useParams();
    const [error, setError] = useState("");

  
const handlePassword = (e) =>
{
   setMessage("")
    setcustomMessage("")
    e.preventDefault();
    const {password,cpassword} = user;
    console.log(password,cpassword);
    if(password==="" || password.length<6)
    {
        setcustomMessage("Please enter a password of at least 6 characters.")
    }else if(cpassword==="")
    {
        setcustomMessage("Confirm password should not be empty.")
    }else if(password !== cpassword)
    {
        setcustomMessage("Password and confirm password should match.")
    }
    else
    {  
        setcustomMessage("")
        axios.post(' https://zendeskticket-server.herokuapp.com/user/resetpassword', {password,cpassword},{
            params: {
                token
            }
          })
          .then(function (response) {
              let data = response.data
            console.log(data.message);
            setMessage(data.message);
            setUser({password:"" , cpassword:""});
            history.push("/")
           
          })  .catch((error)=>(error.response.data));

      
    }
   
    }

    return(
        <>
            <Container>
                <Row>
                    <Col xs={12} md={4}></Col>
                    <Col xs={12} md={4} className="reset-form my-5">
                        <Form >
                            <h4 className="text-center reset-text-style my-3">Reset Password</h4>
                            <p className="reset-text-style text-muted"style={{fontSize:"12px"}} >Enter your email address below and we'll send you a link to reset your password.</p>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" style={{ fontSize: "12px" }} className="reset-text-style" name="password" value={user.password} onChange={(e) => { setUser((usr) => ({ ...usr, password: e.target.value })) }} placeholder="New Password" required="required" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" style={{ fontSize: "12px" }} className="reset-text-style" name="cpassword" value={user.cpassword} onChange={(e) => { setUser((usr) => ({ ...usr, cpassword: e.target.value })) }} placeholder="Confirm New Password" required="required" />
                            </Form.Group>


                            <Button variant="success" type="submit" size="sm" className="btn reset-text-style" style={{ color: 'white' }} onClick={handlePassword} >
                                Save Password
                            </Button>
                            <br></br>
                        </Form>
                        <hr></hr>
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

export default Password;
