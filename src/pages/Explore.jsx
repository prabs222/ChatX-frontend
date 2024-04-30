import React, { useEffect, useState } from 'react';
import Topics from '../components/exploreComponents/Topics';
import Rooms from '../components/exploreComponents/Rooms';
import withAuthentication from '../helpers/withAuthentication';

const Explore = () => {
  const BASE_URL = "http://192.168.30.26:8000/";
  const [rooms, setRooms] = useState([]);
  const [topics, setTopics] = useState([]);


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

  const getAllData = async (authToken) => {
    try {
      const response = await fetch(`${BASE_URL}home/`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      
      setRooms(data.rooms)
      setTopics(data.topics)
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};

useEffect(() => {
    const authToken = getAuthTokenFromCookie();
    if (authToken) {
        getAllData(authToken);
    } else {
        console.error("No authentication token found");
    }
}, []);


  return (
    <div>
      <div className='flex w-11/12 m-auto min-h-screen mt-2'>
        <div className='w-2/12 border-r border-richblack-700 pr-2'>
          <Topics setRooms={setRooms} topics = {topics} />
        </div>
        <div className='w-10/12 pl-4'>
          <Rooms rooms = {rooms} setRooms={setRooms} />
        </div>
      </div>
    </div>
  );
};

export default withAuthentication(Explore);
