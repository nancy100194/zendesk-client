
import React,{ useState} from 'react';
import './App.css';

import { BrowserRouter as Router,Route,Switch} from "react-router-dom";

// importing components
import Contactus from './components/contactus';
import Login from './components/login';
import Register from './components/register';
import Navigation from './components/navbar';
import Footer from './components/footer';
import Activate from './components/activate';
import Password from './components/password';
import Tickets from './tickets/tickets';

// usecontext 
export const CredentialsContext = React.createContext(
  {
    User:null,
    token:null,
    logout:()=>{}
  }
  );

  //App component
function App() {

  const [User, setUser]=useState(null);
  const [token,setToken]=useState(null);

 
  const logout = ()=>{
 
    localStorage.clear();
    window.location.href = '/';
    }

const handleLogin = (usr,token)=>{
  console.log(usr,token)
  setUser(usr);
  setToken(token);
  console.log(token);

  localStorage.setItem('token', token);
}

  return (
    <>
    <CredentialsContext.Provider value={
         {  User,
            token,
          logout}
       }>
   <Router>
  
      <Switch>

        <Route exact path="/contactus">
            <Contactus />
        </Route>

        <Route exact path="/">
        <Navigation/>
          <Login handleLogin={handleLogin}/>
            <Footer/>
        </Route>

        <Route exact path="/register">
        <Navigation/>
          <Register />
          <Footer/>
        </Route>

        <Route exact path="/activate-user/:token">
          <Activate/>
        </Route>

        <Route exact path="/reset-password/:token">
          <Password/>
        </Route>
        
        <Route exact path="/user/tickets">
          <Tickets logout={logout}/>
        </Route>

      </Switch>
      
      </Router>
      </CredentialsContext.Provider>
    </>
   
  );
}

export default App;
