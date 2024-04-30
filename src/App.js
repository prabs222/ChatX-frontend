import { Route, Routes  } from 'react-router-dom';
import './App.css';
import React, { useState, } from 'react';

import Navbar from './components/common/Navbar';
import Explore from './pages/Explore';
import MyRooms from './pages/MyRooms';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Room from './components/admin/Room';
import Topic from './components/admin/Topic';


function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  return (
    <div className='bg-richblack-900 w-screen min-h-screen text-richblack-50'>
    
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/myrooms/*" element={<MyRooms />} />
       
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin}/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="admin/room" element={<Room />} />
        <Route path="admin/topic" element={<Topic />} />
      </Routes>
     </div>

  );
}

export default App;
