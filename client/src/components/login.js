import React, { useState } from 'react';

const login = () => {

    function handleSubmit(e){
        e.preventDefault();

        const field = e.target;
        const fieldData = new field 
    }

    return(
        <div>
            <div className="login">
                <h2>Log-in</h2>
                <h3>Username:</h3>
                <input
                type="text" 
                value={this.state.value} 
                >
                
                </input>
                <h3>Password:</h3>

            </div>
            <div className="signup">

            </div>
        </div>
    );
}

export default login;