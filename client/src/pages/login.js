import React, { useState } from "react";

const login = () => {
  function handleSubmit(e) {
    // Prevent browser from loading new page
    e.preventDefault();

    // Reads the given form's data
    const field = e.target;
    const fieldData = new fieldData(field);

    // Send away here depending on method
  }

  return (
    <div className="container">
      <div className="card bg-purple-dark-7 o-90">
        <h2 className='card-title text-orange ml-3"'>Log-in</h2>
        <div className="card-body">
          <form method="get" onSubmit={handleSubmit}>
            <label htmlFor="login-username">Username: </label>
            <input
              className="card col-12-xs mb-2 bg-purple-light-9"
              placeholder="Your username"
              type="text"
              value={this.state.value}
              id="login-username"
            ></input>

            <label htmlFor="login-password">Password: </label>
            <input
              className="card col-12-xs mb-2 bg-purple-light-9"
              placeholder="******"
              type="text"
              value={this.state.value}
              id="login-password"
            ></input>
            <button
              className="btn-outlined-orange text-purple text-hover-white"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="card bg-purple-dark-7 o-90">
        <h2 className="card-title text-orange ml-3">Sign-up</h2>
        <div className="card-body flex-row justify-center mb-2">
          <form method="post" onSubmit={handleSubmit}>
            <label htmlFor="signup-username">Username: </label>
            <input
              className="card col-12-xs mb-2 bg-purple-light-9"
              placeholder="Your username"
              type="text"
              value={this.state.value}
              id="signup-username"
            ></input>

            <label htmlFor="signup-password">Password: </label>
            <input
              className="card col-12-xs mb-2 bg-purple-light-9"
              placeholder="******"
              type="text"
              value={this.state.value}
              id="signup-password"
            ></input>

            <label htmlFor="signup-email">Email: </label>
            <input
              className="card col-12-xs mb-2 bg-purple-light-9"
              placeholder="Your email"
              type="text"
              value={this.state.value}
              id="signup-email"
            ></input>
            <button
              className="btn-outlined-orange text-purple text-hover-white"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login;