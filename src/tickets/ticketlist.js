import React,{useContext,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import {Container,Row,Table,Col} from 'react-bootstrap';
import {  deleteTicket,fetchTickets } from "../tickets/interaction.js";
import { CredentialsContext } from "../App";


const TicketList = ({tickets,setTickets,ticket}) =>
{

  const {User,token} = useContext(CredentialsContext);

 const handleDelete= ({_id})=>{
    deleteTicket(token,_id).then((data)=>{
      handleTickets()
        console.log("Tickets:::",data)
    })
  } 
  const handleTickets = ()=>{
    fetchTickets(token).then((data)=>{
        setTickets(data)
        console.log("Tickets:::",data)
    })
  }
  
  useEffect(()=>{
    handleTickets();
  },[])
  

      return(
  <Container >
    <Row className=" ticket-list my-3">
   <Col xs={12} md={12}>
   {tickets.length !== 0 ?
                 <div>
                     <div className="table-responsive ">
                        <table className="table table-hover table-striped " >
                            <thead className="thead-dark">
                              <tr>
                                <th >Ticket No.</th>
                                <th >Subject</th>
                                <th >Department</th>
                                <th >Priority</th>
                                <th> Created Date</th>
                                <th> Status</th>
                                <th> Updated</th>
                                <th> </th>
                              </tr>
                            </thead>
                            <tbody>
                              {tickets?.map((ticket, index) => (
                                <tr key={index}>
                                  <td>{ticket.ticketno} </td>
                                  <td>{ticket.subject} </td>
                                  <td>{ticket.department}</td>
                                  <td>{ticket.priority}</td>
                                  <td>{ ticket.date} </td>
                                  <td>{ticket.status}</td>
                                  <td>{ticket.updated}</td>
                                  <td><button type="button" className="btn btn-danger btn-sm " style={{ color: "white",marginLeft:"10px",fontSize:"12px" }} onClick={() =>handleDelete(ticket) }>Delete</button></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      
                      </div>
                  
                :<p className="text-style">"No ticket(s) available !!"</p> }
   </Col>
    
    </Row>
  </Container>
      
      )
 }
export default TicketList;