// Imports
import React, { useState } from 'react';
import Logon from './Logon';
import Signup from './Signup';

function Homepage () {
    //Logic needed for login status

    // Fully constructed homepage
    // Will change depending on loggedIn & usage of pageState
    return (
        /* Main Div */
        <div className=' font-lg container mt-3 p-1 text-orange-light-3 bg-blue-dark-4'>
            <div className='row justify-center'>
            <div className="col-12-xs col-10-md">
<p className='m-1'>Welcome to PhoneBook, the ultimate social media app that's got all the vibes and connects you with your crew like never before!</p>

<p className='m-1'>Tired of the same old boring social platforms? We feel you! That's why we created PhoneBook, a game-changer that's gonna light up your social life. We're talking about a place where you can share your hottest moments, keep up with your squad, and discover what's poppin' in the world.</p>

<p className='m-1'>With PhoneBook, you can vibe with your friends and fam, whether they're just around the corner or miles away. Connect, chat, and stay in the loop with the latest tea, juicy gossips, and inside jokes that make you LOL 'til your sides hurt.</p>



<p className='m-1'>PhoneBook: Where the vibes never stop, and the connections are off the charts!</p>
            </div>

       
          </div>

        </div>
    );
};

export default Homepage;