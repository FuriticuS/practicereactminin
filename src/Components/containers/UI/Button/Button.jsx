import React from 'react';

import './button.scss';

const Button = ({onClick, children, disabled, type}) => {

    const clss = [
        'button ',
        type
    ]

    return (
        <button
            onClick={onClick}
            className={clss.join('')}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
