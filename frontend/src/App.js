import React, { useState, useEffect, createContext } from 'react';
import config from './config'
import Paper from '@mui/material/Paper';
import PublicItems from './components/PublicItems';
import PersonalItems from './components/PersonalItems';
import NewUser from './components/NewUser';
import Login from './components/Login';
import AuthContext from './components/AuthContext';
import Header from './components/Header';
import { Router, Routes, Route } from 'react-router-dom';

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

function App() {
  const [currentUser, setUser] = useState({auth: false, setAuth: () => {}});

  return (
    <AuthContext.Provider value={currentUser}>
    <Paper sx={{color: 'lightblue'}}>
    <Header/>
    <Routes>
      <Route path="/" element={<PublicItems/>}/>
      <Route path="/personalitems" element={<PersonalItems/>}/>
      <Route path="/newuser" element={<NewUser />}/>
      <Route path="/login" element={<Login />}/>
    </Routes> 
   </Paper>
   </AuthContext.Provider>
  );
}

export default App;
