import React, { useState, useEffect } from 'react';

const Topics = ({ topics, setRooms }) => {
    const BASE_URL = "http://192.168.30.26:8000/";

    const [selectedTopicId, setSelectedTopicId] = useState(null); 
    const [error, setError] = useState(null); 

    const fetchTopicData = (id) => {
        if (!id) return;

        console.log("Fetching data for topic:", id);
        fetch(`${BASE_URL}topic-rooms/?topic_id=${id}`) 
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error fetching data for ${id}: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                setRooms(data);
                setError(null);
            })
            .catch((error) => {
                console.error('Failed to fetch data:', error);
                setError(error.message);
            });
    };

    useEffect(() => {
        if (selectedTopicId) {
            console.log("Fetching topic data for:", selectedTopicId);
            fetchTopicData(selectedTopicId);
        }
    }, [selectedTopicId]); 

    return (
        <div>
            <h2 className='font-bold text-4xl text-white border-b border-richblack-600 pb-2'>Hot Topics</h2>
            <ul className='flex flex-col gap-2 capitalize mt-2'>
                {topics.map((topic, index) => (
                    <li
                        key={index}
                        className='hover:text-white cursor-pointer'
                        onClick={() => setSelectedTopicId(topic.id)}
                    >
                        {topic.name}
                    </li>
                ))}
            </ul>
            {error && <div className='text-red-500'>Error: {error}</div>} 
        </div>
    );
};

export default Topics;
