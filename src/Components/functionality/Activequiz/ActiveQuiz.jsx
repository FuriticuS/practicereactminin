import React from 'react';
import {block} from 'bem-cn';
import Answerlist from "../../containers/Answerlist/Answerlist";

import './activequiz.scss';

const cn = block('activequiz');

const ActiveQuiz = ({answers, questions, onAnswerClick, quizLength, answerNumber, answerState}) => {

    return (
        <div className={cn()}>

            <h1>Ответьте на все вопросы</h1>

            <p className={cn('question')}>
                <span>
                    <strong>{answerNumber}.</strong>&nbsp;
                    {questions}
                </span>

                <small>{answerNumber} из {quizLength}</small>
            </p>

            <Answerlist answers={answers} onAnswerClick={onAnswerClick} answerState={answerState} />
        </div>
    );
};

export default ActiveQuiz;
