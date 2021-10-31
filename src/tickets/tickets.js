import React ,{useState,useEffect,useContext}from 'react' ;

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

//react
import {Navbar,Nav,Container,Row,Col,Button} from 'react-bootstrap';
import axios from 'axios';
import logo from '../images/logo.png'
import { Link } from "react-router-dom";
import TicketList from '../tickets/ticketlist.js';
import Ticketform from '../tickets/ticketform.js';
import { CredentialsContext } from "../App";
import {  fetchTickets } from "../tickets/interaction.js";
import Contactus from '../components/contactus';

const style = {fontFamily:'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif',
fontWeight: 'bold',
fontSize:'25px',
float:'left',
color:'rgba(15, 138, 15, 0.63)'}

function Tickets ({logout}) 
{
  const [tickets , setTickets] = useState([]);
  const [ticket , setTicket] = useState("");
  const [form , setForm] = useState(false);
  const [Cform , setCForm] = useState(false);
  const [message,setMessage]=useState("");
  const [custommessage,setcustomMessage]=useState("");
 
 const {User,token} = useContext(CredentialsContext);

 const handleTickets = ()=>{
  fetchTickets(token).then((data)=>{
      setTickets(data)
      //console.log("Tickets:::",data)
  })
}

useEffect(()=>{
  handleTickets();
},[])

    return(
<>
    <Navbar bg="light" expand="lg">
            <img src={logo} className=" imager d-inline-block align-top ml-2 " alt="logo" />
            <Navbar.Brand href="/" style={style}>HelpDesk Ticketing</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">      
                </Nav>
            </Navbar.Collapse>
            <Button  style={{ fontSize: "13px" }} variant="info" className="text-style mr-3" onClick={()=>setForm(true)}><b><small>+</small>New Ticket</b></Button> 
            <Button  style={{ fontSize: "13px" }} variant="success" className="text-style mr-3" onClick={()=>setCForm(true)}><b>ContactUs</b></Button>  
            <Button  style={{ fontSize: "13px" }} variant="danger" className="text-style mr-2"onClick={logout}><b>LogOut</b></Button>
             
      </Navbar>

 <Container>
 <Row>
   <Col xs={12} md={12} className="ticket my-5">
     {Cform && <Contactus Cform={Cform} setCForm={setCForm}/>}
   {form && 
        <Ticketform tickets={tickets} setTickets={setTickets} form={form} setForm={setForm}/>
   }
          <TicketList tickets={tickets} setTickets={setTickets} ticket={ticket}/>
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

export default Tickets;
