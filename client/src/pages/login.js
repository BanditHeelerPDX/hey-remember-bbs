import React, { useState } from 'react';

const login = () => {

    function handleSubmit(e){
        // Prevent browser from loading new page
        e.preventDefault();

        // Reads the given form's data
        const field = e.target;
        const fieldData = new fieldData(field);

        // Send away here depending on method
    }

    return(
        <div>
            <form method="get" onSubmit={handleSubmit}>
                <h2>Log-in</h2>
                <label htmlFor='login-username'>Username: </label>
                <input
                type="text" 
                value={this.state.value} 
                id='login-username'
                >
                </input>

                <label htmlFor='login-password'>Password: </label>
                <input
                type='text'
                value={this.state.value}
                id='login-password'
                >
                </input>

            </form>
            <form method="post" onSubmit={handleSubmit}>
                <h2>Sign-up</h2>
                <label htmlFor='signup-username'>Username: </label>
                <input
                type='text'
                value={this.state.value}
                id='signup-username'>
                </input>

                <label htmlFor='signup-password'>Password: </label>
                <input
                type='text'
                value={this.state.value}
                id='signup-password'>  
                </input>

                <label htmlFor='signup-email'>Email: </label>
                <input
                type='text'
                value={this.state.value}
                id='signup-email'>  
                </input>
            </form>
        </div>
    );
}

export default login;