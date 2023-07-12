import React from 'react';

const User = ({ user }) => {
    const { username, email } = user;
  
    return (
      <div className="user-card">
        <h3>{username}</h3>
        <p>Email: {email}</p>
      </div>
    );
  };

export default User;