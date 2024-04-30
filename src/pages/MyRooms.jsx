import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JoinedRooms from '../components/myRoomComponents/JoinedRooms';
import RoomChat from '../components/myRoomComponents/RoomChat';
import { IoChatbubblesOutline } from "react-icons/io5";


const MyRooms = () => {



  return (
    <div>
      <div className='flex w-11/12 m-auto mt-2'>
        {/* Joined Rooms List */}
        <div className='w-3/12 border-r border-richblack-700 pr-2 '>
          <JoinedRooms />
        </div>

        {/* Room Chat */}
        <div className='w-9/12 pl-2  '>
          <Routes>
            <Route path='/'
              element={
                <div className='flex flex-col items-center justify-center h-[100%]'>
                  <div className='text-[10rem]'>

                  <IoChatbubblesOutline/>
                  </div>
                  <p className='text-4xl font-bold mt-4'>Select a room to chat</p>
                </div>
              }
            />
            <Route path=':roomId' element={<RoomChat />} /> {/* Dynamic route */}
          </Routes>

        </div>
      </div>
    </div>
  );
};

export default MyRooms;
