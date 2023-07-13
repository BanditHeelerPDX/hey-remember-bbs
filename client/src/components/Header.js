import React from "react";
import { Link } from "react-router-dom";

const Header = ({ loggedIn }) => {
  const navState = (loggedIn) => {
    if (loggedIn) {
      return (
        <nav className="text-orange-light-3 bg-blue-dark-4 o-90 justify-between">
          <div className="container">
            <h1 className="font-xxl text-orange">phoneBook</h1>
            <ul className="display-f">
              <li className="ml-1 text-hover-secondary">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="ml-1 text-hover-secondary">
                <Link to="/">Logout</Link>
              </li>
            </ul>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="text-orange-light-3 navbar bg-blue-dark-4 o-90 justify-between">
          <div className="container">
            <Link to="/"><h1 className="font-xxl text-hover-secondary">phoneBook</h1></Link>
            <ul className="display-f">
              <li className="ml-1 text-hover-secondary">
                <Link to="/Signup">Signup</Link>
              </li>
              <li className="ml-1 text-hover-secondary">
                <Link to="/Logon">Login</Link>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
  };

  // Invoke navState and return the JSX it generates
  return navState(loggedIn);
};

export default Header;