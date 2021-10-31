 import axios from 'axios';

 const BASE_URL = ' https://helpdeskticket-server.herokuapp.com';

 //getTickets
export const fetchTickets =(token)=>{
    return axios
    .get(`${BASE_URL}/user/tickets`,{
        headers:{
            "Content-Type": "application/json",
            "auth-token" : token
        }
    })
    .then((res)=>res.data)
   
}

//addTickets
export const addTicket=(token,subject,department,priority)=>{
    return axios
    .post(`${BASE_URL}/user/add-ticket`,
    {subject,department,priority},
    {
        headers:{
            "Content-Type": "application/json",
            'auth-token':token
        }
    }
    )
    .then((res)=>res.data)
   
}

//addContactusform
export const addContactForm=(token,firstname,lastname,message)=>{
    return axios
    .post(`${BASE_URL}/user/contactus`,
    {firstname,lastname,message},
    {
        headers:{
            "Content-Type": "application/json",
            'auth-token':token
        }
    }
    )
    .then((res)=>res.data)
   
}

//deleteTickets
export const deleteTicket =(token,ticketno)=>{
    return axios
    .delete(`${BASE_URL}/delete-ticket/${ticketno}`,{
        headers:{
            "Content-Type": "application/json",
            'auth-token':token
        }
    })
    .then((res)=>res.data)
  
}
