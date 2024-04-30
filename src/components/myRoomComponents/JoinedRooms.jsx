import React, { useState, useEffect } from 'react';
import { Box, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const JoinedRooms = () => {
  const [userList, setUserList] = useState([]);
  const [userLoader, setUserLoader] = useState(true);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const getAuthTokenFromCookie = () => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'token') {
        return value;
      }
    }
    return null;
  };

  useEffect(() => {
    const authToken = getAuthTokenFromCookie();

    if (authToken) {
      fetch(`${BASE_URL}my-rooms/`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          setUserList(data);
          setUserLoader(false);
        })
        .catch((error) => {
          console.error('Error making API request:', error);
          setUserLoader(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRoomClick = (roomId) => {
    navigate(`/myrooms/${roomId}`);
  };

  return (
    <div className='sidebar'>
      {userLoader ? (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className='bg-richblack-800 h-[100%] py-4 rounded-md'>
          <h2 className='font-bold text-xl text-white px-6 border-b border-richblack-100 pb-4'>Joined Rooms</h2>
          <ul className='mt-2 flex flex-col'>
            {userList.length === 0 ? (
              <li className='text-center text-gray-400 py-4'>
                You haven't joined any rooms. Please join a room to get started!
              </li>
            ) : (
              userList.map((item) => (
                <li
                  key={item.id}
                  className='cursor-pointer hover:text-white hover:bg-richblack-900 px-6 py-4 duration-200 transition-all border-b border-richblack-600'
                  onClick={() => handleRoomClick(item.id)}
                >
                  {item.name}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JoinedRooms;
