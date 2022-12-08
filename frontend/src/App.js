import React, { useState, useEffect, createContext } from 'react';
import Paper from '@mui/material/Paper';
import PublicItems from './components/PublicItems';
import PersonalItems from './components/PersonalItems';
import NewUser from './components/NewUser';
import Login from './components/Login';
import NewItem from './components/NewItem';
import AuthContext from './components/AuthContext';
import Header from './components/Header';
import { Router, Routes, Route } from 'react-router-dom';


function App() {
  const [currentUser, setUser] = useState({auth: false, setAuth: () => {}});

  return (
    <AuthContext.Provider value={currentUser}>
    <Paper sx={{color: 'lightblue'}}>
    <Header/>
    <Routes>
      <Route path="/" element={<PublicItems user={currentUser}/>}/>
      <Route path="/personalitems" element={<PersonalItems user={currentUser}/>}/>
      <Route path="/newuser" element={<NewUser />}/>
      <Route path="/login" element={<Login />}/>
    </Routes> 
   </Paper>
   </AuthContext.Provider>
  );
}

export default App;
