import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Room = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [rooms, setRooms] = useState([]);
    const [topics, setTopics] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [roomIdToUpdate, setRoomIdToUpdate] = useState(null);

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
    const authToken = getAuthTokenFromCookie(); 

    useEffect(() => {
        fetchRooms();
        fetchTopics();
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchRooms = async () => {
        try {
            const authToken = getAuthTokenFromCookie(); 
            const response = await axios.get(`${BASE_URL}admins/rooms/`, { headers: { Authorization: `Bearer ${authToken}` } });
            setRooms(response.data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    const fetchTopics = async () => {
        try {
            const authToken = getAuthTokenFromCookie(); 
            const response = await axios.get(`${BASE_URL}admins/topics/`, { headers: { Authorization: `Bearer ${authToken}` } });
            setTopics(response.data);
        } catch (error) {
            console.error('Error fetching topics:', error);
        }
    };

    const handleCreateRoom = async () => {
        try {
            const response = await axios.post(`${BASE_URL}admins/rooms/`, { name, description, topic: selectedTopic, participants: [] }, { headers: { Authorization: `Bearer ${authToken}` } });
            setRooms([...rooms, response.data]);
            setName('');
            setDescription('');
            setSelectedTopic(null);
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };

    const handleUpdateRoom = async (roomId) => {
        try {
            const response = await axios.put(`${BASE_URL}admins/rooms/${roomId}/`, { name, description, topic: selectedTopic, participants: [] }, { headers: { Authorization: `Bearer ${authToken}` } });
            setRooms(rooms.map(room => (room.id === roomId ? response.data : room)));
            setName('');
            setDescription('');
            setSelectedTopic(null);
            setRoomIdToUpdate(null);
        } catch (error) {
            console.error('Error updating room:', error);
        }
    };

    const handleDeleteRoom = async (roomId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this room?");
        if (confirmDelete) {
            try {
                await axios.delete(`${BASE_URL}admins/rooms/${roomId}/`, { headers: { Authorization: `Bearer ${authToken}` } });
                setRooms(rooms.filter(room => room.id !== roomId));
            } catch (error) {
                console.error('Error deleting room:', error);
            }
        }
    };


    const handleEditRoom = (room) => {
        setName(room.name);
        setDescription(room.description);
        setSelectedTopic(room.topic);
        setRoomIdToUpdate(room.id);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom marginTop={2}>
                Rooms
            </Typography>
            <Grid container spacing={2}>
                {rooms.map(room => (
                    <Grid item key={room.id} xs={12} sm={6} md={4}>
                        <div className='bg-richblack-800 p-4 rounded-md'>
                            <div>
                                <Typography variant="h6">{room.name}</Typography>
                                <Typography>{room.description}</Typography>
                            </div>
                            <div className='flex gap-2 mt-4'>
                                <Button variant="contained" color="primary" onClick={() => handleEditRoom(room)}>Edit</Button>
                                <Button variant="contained" color="error" onClick={() => handleDeleteRoom(room.id)}>Delete</Button>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
            <br />
            <Typography variant="h5" gutterBottom>
                {roomIdToUpdate ? 'Update Room' : 'Create New Room'}
            </Typography>
            <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                    style: { color: "white" },
                }}
                InputLabelProps={{
                    style: { color: "gray" },
                }}
                style={{ background: "#161D29", color: "white" }}
            />
            <TextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                InputProps={{
                    style: { color: "white" },
                }}
                InputLabelProps={{
                    style: { color: "gray" },
                }}
                style={{ background: "#161D29", color: "white" }}
            />
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="topic-label"
                    style={{ color: "gray" }}

                >Select Topic</InputLabel>
                <Select
                    labelId="topic-label"
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    label="Select Topic"
                    InputProps={{
                        style: { color: "white" },
                    }}
                    InputLabelProps={{
                        style: { color: "gray" },
                    }}
                    style={{ background: "#161D29", color: "white" }}
                >
                    {topics.map(topic => (
                        <MenuItem key={topic.id} value={topic.id}>{topic.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                onClick={roomIdToUpdate ? () => handleUpdateRoom(roomIdToUpdate) : handleCreateRoom}
            >
                {roomIdToUpdate ? 'Update' : 'Create'}
            </Button>
        </Container>
    );
};

export default Room;
