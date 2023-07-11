import React from 'react';

const User = ({ user }) => {
    const { username, firstName, lastName, email } = user;
  
    return (
      <div className="user-card">
        <h3>{username}</h3>
        <p>First Name: {firstName}</p>
        <p>Last Name: {lastName}</p>
        <p>Email: {email}</p>
      </div>
    );
  };

export default User;