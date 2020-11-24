import React from 'react';
import {block} from 'bem-cn';

import './select.scss';

const cn = block('select');

const Select = ({label, value, onChange, options}) => {

    const htmlFor = `${label}-${Math.random()}`

    return (
        <div className={cn()}>
            <label htmlFor={htmlFor}>{label}</label>
            <select
                id={htmlFor}
                value={value}
                onChange={onChange}
            >
                {options.map((option, index) => {
                    return(
                        <option key={option.value+index} value={option.value}>
                            {option.text}
                        </option>
                    )
                })}
            </select>
        </div>
    );
};

export default Select;
