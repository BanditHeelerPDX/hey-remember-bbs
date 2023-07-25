import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [createUser, { error, data }] = useMutation(CREATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await createUser({
        variables: { ...formState },
      });

      Auth.login(data.createUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="display-f row justify-center mb-4">
      <div className="col-12 col-10-md">
        <div className="mt-4 card bg-blue-dark-4 o-90">
          <h2 className="card-title text-orange-light-3 ml-3">Sign-up</h2>
          <div className="card-body flex-row justify-center mb-2">
            {data ? (
              <p>
                <Link to="/Posts">come on in!.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <label className="text-orange-light-3">Username: </label>
                <input
                  className="card col-12-xs mb-2 bg-blue-light-9"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
                <label className="text-orange-light-3">Email: </label>
                <input
                  className="card col-12-xs mb-2 bg-blue-light-9"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <label className="text-orange-light-3">Password: </label>
                <input
                  className="card col-12-xs mb-2 bg-blue-light-9"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn-outlined-orange text-blue text-hover-white"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}
            {error}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
