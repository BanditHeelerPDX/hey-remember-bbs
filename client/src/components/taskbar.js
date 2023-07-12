import React from "react";
import { Link } from "react-router-dom";

const taskbar = () => {
  const navState = (loggedIn) => {
    // This returns the type of navbar based on if you are
    // logged in or logged out.
    if (loggedIn) {
      return (
        <nav className="navbar bg-purple-dark-7 o-90 justify-between">
          <div className="container">
            <h1 className="font-xxl text-orange">phoneBook</h1>
            <ul className="display-f">
              <li className="ml-1 text-hover-secondary">
                <Link to="/home">Home</Link>
              </li>
              <li className="ml-1 text-hover-secondary">
                <Link to="/bulletin">Bulletin</Link>
              </li>
              <li className="ml-1 text-hover-secondary">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="ml-1 text-hover-secondary">
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="navbar bg-purple-dark-7 o-90 justify-between">
          <div className="container">
            <h1 class="font-xxl text-orange">phoneBook</h1>
            <ul className="navbar">
              <li className="ml-1 text-hover-secondary">
                <Link to="/">Home</Link>
              </li>
              <li className="ml-1 text-hover-secondary">
                <Link to="/login">Signup</Link>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
  };

  return { navState };
};

export default taskbar;
