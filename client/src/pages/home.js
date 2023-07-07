// Imports
import React, { useState } from 'react';
import login from './login';
import logout from './logout'
import profile from './profile';
import search from './search';

const homePage = () => {
    //Logic needed for login status

    //Logic for navbar
    const navState = (loggedIn) => {
        // This returns the type of navbar based on if you are
        // logged in or logged out.
        switch(loggedIn){
            case loggedIn:
                return(
                    <div className='navbar'>
                        <button type='navButton' onClick={() => setpageType(0)}>Home</button>
                        <button type='navButton' onClick={() => setpageType(2)}>Profile</button>
                        <button type='navButton' onClick={() => setpageType(3)}>Search</button>
                        <button type='navButton' onClick={() => setpageType(4)}>Logout</button>
                    </div>
                );
            default:
                return(
                    <div className='navbar'>
                        <button type='navButton' onClick={() => setpageType(0)}>Home</button>
                        <button type='navButton' onClick={() => setpageType(1)}>Login</button>
                    </div>
                );
        }
    }

    //Logic for page type
    const pageState = (state) => {
        // This returns the whole given page
        switch(state){
            case 0:
                return 'mainPage';
            case 1:
                return 'login';
            case 2:
                return 'profile';
            case 3:
                return 'search';
            case 4:
                return 'logout';
            default:
                return 'mainPage';
        }
    };
    //Holds state var for above function
    const [pageType, setpageType] = useState(0);

    // Fully constructed homepage
    // Will change depending on loggedIn & usage of pageState
    return (
        /* Main Div */
        <div>
            <div className='Header'>
                <h1>Phonebook</h1>

                {/* Navbar changes based on logged in state */}
                {this.navState(loggedIn)}
            </div>

            {/* Upper section is static on every page, this determines page type */}
            {this.pageState(pageType)}

        </div>
    );
};

export default homePage;