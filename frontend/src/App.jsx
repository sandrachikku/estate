import React,{useState} from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './Components/login/Login'
import Signup from './Components/signup/Signup';
import Email from './Components/email/Email';
import EmailVerificationSuccess from './Components/verifysuccess/EmailVerificationSuccess';
import Home from './Components/home/Home';
import Navbar from './Components/nav/Navbar';
import Profile from './Components/profile/Profile';
import Company from './Components/company/Company';
import './App.css'

const App = () => {
  const [username,setUsername]=useState("");
  const [role,setRole]=useState("");
  const [loggedIn,setLoggedIn]=useState(false); 
  return (
    <BrowserRouter>
     {loggedIn&& <Navbar username={username} role={role} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/email' Component={Email}/>
        <Route path='/signup' Component={Signup}/>
        <Route path='/emailsuccess' Component={EmailVerificationSuccess}/>
        <Route path='/home' element={<Home  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/profile' element={<Profile  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/company' element={<Company  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App