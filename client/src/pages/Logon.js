import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Logon = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="display-f row justify-center mb-4">
      <div className="col-12 col-10-md">
        <div className="mt-4 card bg-purple-dark-7 o-90">
          <h2 className='card-title text-orange ml-3"'>Log-in</h2>
          <div className="card-body flex-row justify-center mb-2">
            <form method="get" onSubmit={handleSubmit}>
              <label htmlFor="login-username">Username: </label>
              <input
                className="card col-12-xs mb-2 bg-purple-light-9"
                placeholder="Your username"
                type="text"
                value={formState.name}
                id="login-username"
                onChange={handleChange}
              ></input>

              <label htmlFor="login-password">Password: </label>
              <input
                className="card col-12-xs mb-2 bg-purple-light-9"
                placeholder="******"
                type="text"
                value={formState.password}
                id="login-password"
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

export default Logon;
