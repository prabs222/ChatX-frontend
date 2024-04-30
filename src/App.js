import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import React, { useState, useEffect } from 'react';

import Navbar from './components/common/Navbar';
import Explore from './pages/Explore';
import MyRooms from './pages/MyRooms';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import withAuthentication from './helpers/withAuthentication';
import RoomChat from './components/myRoomComponents/RoomChat';



function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(null);


  return (
    <div className='bg-richblack-900 w-screen min-h-screen text-richblack-50'>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/myrooms/*" element={<MyRooms />} />
       
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
