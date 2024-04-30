import React, { useEffect } from 'react'
import logo from '../../assets/ChatX.png'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin }) => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);


    const handleLogout = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        localStorage.removeItem('userid');
        setIsAuthenticated(false);
        navigate('/login');
    };


    return (
        <div className='border-b border-richblack-700'>
            <div className='w-11/12 m-auto flex flex-row justify-between items-center h-[60px] '>
                {/* logo */}
                <div>
                    <img src={logo} alt="" width={80} />
                </div>


                {/* login signup explore myrooms */}

                {
    isAuthenticated ? (
        isAdmin ? (
            <div className='flex flex-row gap-10 items-center'>
                <Link to={"/admin/room"} className='hover:text-white'>Rooms</Link>
                <Link to={"/admin/topic"} className='hover:text-white'>Topics</Link>
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md hover:bg-richblack-700' onClick={handleLogout}> Log out</button>
            </div>
        ) : (
            <div className='flex flex-row gap-10 items-center'>
                <Link to={"/explore"} className='hover:text-white'>Explore</Link>
                <Link to={"/myrooms"} className='hover:text-white'>My Rooms</Link>
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md hover:bg-richblack-700' onClick={handleLogout}> Log out</button>
            </div>
        )
    ) : (
        <div className='flex flex-row gap-2 items-center'>
            <Link to={"/login"}>
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md hover:bg-richblack-700'> Login</button>
            </Link>
            <Link to={"/signup"}>
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md hover:bg-richblack-700'> Sign Up</button>
            </Link>
        </div>
    )
}




            </div>
        </div>
    )
}

export default Navbar