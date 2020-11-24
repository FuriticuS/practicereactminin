import React from 'react';
import {block} from 'bem-cn';
import Answeritem from "./Answeritem/Answeritem";

import './answerlist.scss';

const cn = block('answer-list');

const Answerlist = ({answers, onAnswerClick, answerState}) => {

    return (
        <ul className={cn()}>
            {
                answers.map((answer, index) => {
                    return(
                        <Answeritem
                            key={index}
                            answer={answer}
                            onAnswerClick={onAnswerClick}
                            answerState={answerState ? answerState[answer.id] : null}
                        />
                    )
                })
            }
        </ul>
    );
};

export default Answerlist;
