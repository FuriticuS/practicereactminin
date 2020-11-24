import React from 'react';
import {block} from 'bem-cn';
import Button from "../UI/Button/Button";
import {Link} from "react-router-dom";

import './finishedQuiz.scss';

const cn = block('finished-quiz');

const FinishedQuiz = ({quiz, results, onRetry}) => {

    //подсчет правильных ответов - где objects.key - передает массив ключей обьекта
    //фукнция reduce - подсчет всех ответов
    const successCount = Object.keys(results).reduce((total, key) => {
        if(results[key] === 'success') {
            total++
        }

        return total
    }, 0);

    return (
        <div className={cn()}>
            <h1>Результаты опроса</h1>
            <ul>
                {
                    quiz.map((quizItem, index) => {

                        const classIcon = [
                            'fa',
                            results[quizItem.id] === 'error'? 'fa-times' : 'fa-check',
                            results[quizItem.id]
                        ];
                        return(
                            <li key={index}>
                                <strong>{index+1}. </strong>
                                {quizItem.questions}
                                <i className={classIcon.join(' ')}/>
                            </li>
                        )
                    })
                }
            </ul>

            <p>Правильно {successCount} из {quiz.length}</p>

            <div>
                <Button onClick={onRetry} type="primary">Повторить</Button>
                <Link to='/'><Button type="success">Перейти в список тестов</Button></Link>
            </div>
        </div>
    );
};

export default FinishedQuiz;
