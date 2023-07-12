import React from 'react';
import { Link } from 'react-router-dom';

const taskbar = () => {

    const navState = (loggedIn) => {
        // This returns the type of navbar based on if you are
        // logged in or logged out.
        if(loggedIn){
            return(
                <ul className='navbar'>
                    <li>
                        <Link to='/home'>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to='/bulletin'>
                            Bulletin
                        </Link>
                    </li>
                    <li>
                        <Link to='/profile'>
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to='/logout'>
                            Logout
                        </Link>
                    </li>
                </ul>
            );
        }
        else{
            return(
                <ul className='navbar'>
                    <li>
                        <Link to='/'>
                            Home
                        </Link>
                        <Link to='/login'>
                            Signup
                        </Link>
                    </li>
                </ul>
            );
        }
    }

    return(
        {navState}
    );
};

export default taskbar;