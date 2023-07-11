// Imports
import React, { useState } from 'react';
import mainPage from './mainPage';
import login from './login';
import logout from './logout'
import profile from './profile';
import search from './search';

function Homepage () {
    //Logic needed for login status
    //Set false for testing, change later
    let loggedIn = false;

    //Logic for navbar
    const navState = (loggedIn) => {
        // This returns the type of navbar based on if you are
        // logged in or logged out.
        if (loggedIn){
                return(
                    <div className='navbar'>
                        <button type='navButton' onClick={() => setPagetype(0)}>Home</button>
                        <button type='navButton' onClick={() => setPagetype(2)}>Profile</button>
                        <button type='navButton' onClick={() => setPagetype(3)}>Search</button>
                        <button type='navButton' onClick={() => setPagetype(4)}>Logout</button>
                    </div>
                );
        }

        return(
            <div className='navbar'>
                <button type='navButton' onClick={() => setPagetype(0)}>Home</button>
                <button type='navButton' onClick={() => setPagetype(1)}>Login</button>
            </div>
        );
    }

    //Logic for page type
    const pageState = (state) => {
        // This returns the correct bottom portion of the page
        switch(state){
            case 0:
                return mainPage();
            case 1:
                return login();
            case 2:
                return profile();
            case 3:
                return search();
            case 4:
                return logout();
            default:
                return mainPage();
        }
    };
    //Holds state var for above function
    const [Pagetype, setPagetype] = useState(0);

    // Fully constructed homepage
    // Will change depending on loggedIn & usage of pageState
    return (
        /* Main Div */
        <div>
            <div className='Header'>
                <h1>Phonebook</h1>

                {/* Navbar changes based on logged in state */}
                {navState(loggedIn)}
            </div>

            {/* Upper section is static on every page, this determines page type */}
            {pageState(Pagetype)}

        </div>
    );
};

export default Homepage;