import React from 'react';

import './loader.css';

const Loader = () => {
    return (
        <div className={"loader-center"}>
            <div className="lds-roller">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    );
};

export default Loader;
