import React from 'react';

function Loader() {
    return(
        <div className="ui active inverted dimmer">
            <div className="ui text loader">
                Loading Weather!
            </div>
        </div>
    );
}

export default Loader;