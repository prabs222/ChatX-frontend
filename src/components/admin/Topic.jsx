import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

const Topic = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [topics, setTopics] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [topicIdToUpdate, setTopicIdToUpdate] = useState(null);

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
        fetchTopics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchTopics = async () => {
        try {
            const response = await axios.get(`${BASE_URL}admins/topics/`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            setTopics(response.data);
        } catch (error) {
            console.error('Error fetching topics:', error);
        }
    };

    const handleCreateTopic = async () => {
        try {
            await axios.post(
                `${BASE_URL}admins/topics/`,
                { name, description },
                { headers: { Authorization: `Bearer ${authToken}` } }
            );
            fetchTopics(); // Refresh topics after creation
            setName('');
            setDescription('');
        } catch (error) {
            console.error('Error creating topic:', error);
        }
    };

    const handleUpdateTopic = async (topicId) => {
        try {
            await axios.put(
                `${BASE_URL}admins/topics/${topicId}/`,
                { name, description },
                { headers: { Authorization: `Bearer ${authToken}` } }
            );
            fetchTopics(); // Refresh topics after update
            setName('');
            setDescription('');
            setTopicIdToUpdate(null);
        } catch (error) {
            console.error('Error updating topic:', error);
        }
    };

    const handleDeleteTopic = async (topicId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this topic?");
        if (confirmDelete) {
            try {
                await axios.delete(
                    `${BASE_URL}admins/topics/${topicId}/`,
                    { headers: { Authorization: `Bearer ${authToken}` } }
                );
                fetchTopics(); // Refresh topics after deletion
            } catch (error) {
                console.error('Error deleting topic:', error);
            }
        }
    };

    const handleEditTopic = (topic) => {
        setName(topic.name);
        setDescription(topic.description);
        setTopicIdToUpdate(topic.id);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom marginTop={2}> 
                Topics
            </Typography>
            <Grid container spacing={2}>
                {topics.map(topic => (
                    <Grid item key={topic.id} xs={12} sm={6} md={4}>
                        <div className='bg-richblack-800 p-4 rounded-md h-full flex flex-col justify-between'> 
                        <div>
                            <Typography variant="h6">{topic.name}</Typography>
                            <Typography>{topic.description}</Typography>
                        </div>
                        <div className='flex gap-2 mt-4'>
                            <Button variant="contained" color="primary" onClick={() => handleEditTopic(topic)}>Edit</Button>
                            <Button variant="contained" color="error" onClick={() => handleDeleteTopic(topic.id)}>Delete</Button>
                        </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
            <br />
            <Typography variant="h5" gutterBottom>
                {topicIdToUpdate ? 'Update Topic' : 'Create New Topic'}
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
            <Button
                variant="contained"
                color="primary"
                onClick={topicIdToUpdate ? () => handleUpdateTopic(topicIdToUpdate) : handleCreateTopic}
            >
                {topicIdToUpdate ? 'Update' : 'Create'}
            </Button>
        </Container>
    );
};

export default Topic;
