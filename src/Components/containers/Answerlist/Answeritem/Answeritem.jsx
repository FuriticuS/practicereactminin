import React from 'react';
import {block} from 'bem-cn';

import './answeritem.scss';

const cn = block('answer-item');

const Answeritem = ({answer, onAnswerClick, answerState}) => {

    const classError = [];

    if(answerState) {
        classError.push('-'+[answerState]);
    }

    return (
       <li className={cn()+classError.join()} onClick={() => onAnswerClick(answer.id)}>
           {answer.text}
       </li>
    );
};

export default Answeritem;
