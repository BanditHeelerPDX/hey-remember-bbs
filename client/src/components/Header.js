import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="text-orange-light-3 bg-blue-dark-4 o-90 justify-between">
      <div className="container">
        <div>
          <Link to="/">
            <h1 className="font-xxl text-hover-secondary">phoneBook</h1>
          </Link>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <ul className="display-f">
                <li className="ml-1 text-hover-secondary">
                  <Link to="/Posts">
                    Posts
                  </Link>
                </li>
                <li className="ml-1 text-hover-secondary">
                  <Link to="/me">
                    User
                  </Link>
                </li>
                <li className="ml-1 text-hover-secondary">
                  <Link onClick={logout} to="/">Logout</Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className="display-f">
                <li className="ml-1 text-hover-secondary">
                  <Link to="/Signup">Signup</Link>
                </li>
                <li className="ml-1 text-hover-secondary">
                  <Link to="/Logon">Login</Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
