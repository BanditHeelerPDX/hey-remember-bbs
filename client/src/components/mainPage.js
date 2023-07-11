import React, { useState } from 'react';

// This is going to return a html chunk that will have the header "Bulletin", a bar to swap post types,
// and below those two, a section full of card that will be user posted thoughts/comments, etc
const mainPage = () => {

    //These are used to handle the drop menu options.
    const [Value, setValue] = useState[0];

    const valueHandler = (event) => {
        setValue(event.target.value);
    };

    return (
        <div>
            <div className='header'>
                <h2> Bulletin </h2>

                {/* This is a react dropdown menu, not quite sure on functionality,
                    but it should work spit out those values when we want to change
                    the card search order. */}
                <select value={Value} onChange={valueHandler}>
                    <option value="newest">Newest Posts</option>
                    <option value="oldest">Oldest Posts</option>
                    <option value="friends">Friend Posts</option>
                </select>
            </div>

            {/* This is where card components will be displayed! */}
            <div className='cardContainer'>

            </div>
        </div>
    );
};

export default mainPage;