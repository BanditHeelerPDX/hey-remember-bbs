import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="display-f row justify-center mb-4">
      <div className="col-12 col-10-md">
        <div className="mt-4 card bg-purple-dark-7 o-90">
          <h2 className="card-title text-orange ml-3">Sign-up</h2>
          <div className="card-body flex-row justify-center mb-2">
            <form method="post" onSubmit={handleSubmit}>
              <label htmlFor="signup-username">Username: </label>
              <input
                className="card col-12-xs mb-2 bg-purple-light-9"
                placeholder="Your username"
                type="text"
                value={formState.name}
                id="signup-username"
                onChange={handleChange}
              ></input>

              <label htmlFor="signup-password">Password: </label>
              <input
                className="card col-12-xs mb-2 bg-purple-light-9"
                placeholder="******"
                type="text"
                value={formState.password}
                id="signup-password"
                onChange={handleChange}
              ></input>

              <label htmlFor="signup-email">Email: </label>
              <input
                className="card col-12-xs mb-2 bg-purple-light-9"
                placeholder="Your email"
                type="text"
                value={formState.email}
                id="signup-email"
                onChange={handleChange}
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
    </div>
  );
};

export default Signup;
