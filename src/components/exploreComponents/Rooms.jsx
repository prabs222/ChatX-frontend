import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { TbMessageSearch } from "react-icons/tb";


const Rooms = ({ rooms, setRooms }) => {
  const BASE_URL = "http://192.168.30.26:8000/";

  const [currentRoomId, setCurrentRoomId] = useState(null);

  const getAuthTokenFromCookie = () => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === 'token') {
        return value;
      }
    }
    return null;
  };

  const joinRoom = async (authToken) => {
    try {
      const response = await fetch(`${BASE_URL}join-room/${currentRoomId}/`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      toast.success("Joined successfully");

      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== currentRoomId));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    if (currentRoomId === null) {
      return;
    }
    const authToken = getAuthTokenFromCookie();
    if (authToken) {
      joinRoom(authToken);
    } else {
      console.error("No authentication token found");
    }
  }, [currentRoomId]);

  return (
    <div>
      <h2 className='text-4xl font-bold text-white border-b border-richblack-600 pb-2'>Rooms</h2>
      
      {rooms.length === 0 ? (
        <div className='flex flex-col items-center justify-center mt-28'>
        <div className='text-[10rem]'>

        <TbMessageSearch/>
        </div>
        <p className='text-4xl font-semibold mt-4 text-center'>You broke the record ! <br /> You have joined all available rooms</p>
      </div>
      ) : (
        <ul className='flex flex-row flex-wrap gap-2 mt-2'>
          {rooms.map((room, index) => (
            <li
              key={index}
              className='bg-richblack-800 p-4 rounded-md flex flex-col justify-between'
              style={{ flex: '0 1 30%' }}
            >
              <div>
                <h2 className='text-lg font-semibold'>{room.name}</h2>
                <p className='text-richblack-400'>{room.description}</p>
              </div>
              <div>
                <button
                  className='bg-richblack-700 px-4 py-1 mt-2 rounded-md hover:bg-richblack-600 border border-richblack-500'
                  onClick={() => setCurrentRoomId(room.id)}
                >
                  Join
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Rooms;
