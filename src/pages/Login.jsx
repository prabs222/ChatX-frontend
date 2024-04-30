import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Login({setIsAuthenticated}) {
  const navigate = useNavigate();
  const BASE_URL = "http://192.168.30.26:8000/";
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleFormSubmit = () => {
    fetch(`${BASE_URL}api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        const token = data.token;
        localStorage.setItem("userid", data.user.id);
        document.cookie = `token=${token}; path=/`;
        setIsAuthenticated(true);
        toast.success("Login succesfull")
        navigate("/myrooms");
      })
      .catch((error) => {
        toast.error("Login failed")
        console.log(error);
      });
  };

  return (
    <div className='flex justify-center '>

   
    <div className='container flex flex-col items-center border w-fit border-richblack-700 mt-32 p-10 rounded-md'>
      <h2 className='text-4xl font-bold'>Login</h2>
      <div className='mt-3 w-[30rem]'>
        <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          type='email'
          label="Email"
          className='p-4 rounded-md bg-richblack-800 w-full'
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          
        />
      </div>
      <div className='mt-3 w-[30rem]'>
        <label htmlFor="password">Password</label>
        <br />
        <input
          id="password"
          type='password'
          label="Password"
          className='p-4 rounded-md bg-richblack-800 w-full'
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          
        />
      </div>
      <div className='mt-5 '>
        <Button variant="contained" onClick={handleFormSubmit}>
          Login
        </Button>
      </div>
    </div>
    </div>
  );
}

export default Login;
