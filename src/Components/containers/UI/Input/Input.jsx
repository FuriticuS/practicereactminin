import React from 'react';
import {block} from 'bem-cn';

import './input.scss';

const cn = block('input');

//функция проверки правильности ввода в инпуты
function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = (props) => {

    const inputType = props.type || 'text';
    // массив классов
    const inputClass = [ cn ]
    const htmlFor = `${inputType}-${Math.random()}`;

    //проверка правильности ввода
    if(isInvalid(props)) {
        inputClass.push('invalid');
    }

    return (
        <div className={inputClass.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input id={htmlFor} type={inputType} value={props.value} onChange={props.onChange}/>

            {
                isInvalid(props)
                    ? <span>{props.errorMessage || 'Введите верное значение'}</span>
                    : null
            }

        </div>
    );
};

export default Input;
