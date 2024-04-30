import { Button } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function SignUp() {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    bio: ""
  });
  const handleFormSubmit = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}api/register/`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success("Sign Up succesfull")
      const data = response.data;
      navigate("/explore");

      console.log(data);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("User already exists");
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      } else {
        toast.error("Network error. Check your connection.");
      }
      console.log(error);
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='container flex flex-col items-center border w-fit border-richblack-700 mt-4 p-10 rounded-md'>
        <h2 className='text-4xl font-bold'>Sign Up</h2>

        {/* Email input */}
        <div className='mt-3 w-[30rem]'>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            type='email'
            className='p-4 rounded-md bg-richblack-800 w-full'
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        {/* First Name input */}
        <div className='mt-3  w-[30rem]'>
          <label htmlFor="first_name">First Name</label>
          <br />
          <input
            id="first_name"
            type='text '
            className='p-4 rounded-md bg-richblack-800 w-full'
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          />
        </div>

        {/* Last Name input */}
        <div className='mt-3  w-[30rem]'>
          <label htmlFor="last_name">Last Name</label>
          <br />
          <input
            id="last_name"
            type='text'
            className='p-4 rounded-md bg-richblack-800 w-full'
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          />
        </div>

        {/* Bio input */}
        <div class='mt-3  w-[30rem]'>
          <label htmlFor="bio">Bio</label>
          <br />
          <input
            id="bio"
            type='text'
            className='p-4 rounded-md bg-richblack-800 w-full'
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </div>

        {/* Password input */}
        <div className='mt-3  w-[30rem]'>
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            type='password'
            className='p-4 rounded-md bg-richblack-800 w-full'
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        {/* Submit button */}
        <div className='mt-3'>
          <Button variant="contained" onClick={handleFormSubmit}>
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
