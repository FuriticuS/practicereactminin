import React, {Component} from 'react';
import {block} from 'bem-cn';
import ActiveQuiz from "../../functionality/Activequiz/ActiveQuiz";
import FinishedQuiz from "../FinishedQuiz/FinishedQuiz";
import Axios from "../../functionality/Axios/Axios";
import Loader from "../UI/Loader/Loader";

import './quiz.scss';

const cn = block('quiz');

class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: {},
            quiz: [],
            loading: true,
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
        }
    }

    onAnswerClick = (answerId) => {
        // проверка по есть какойто answerstate то го дальше
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];

            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        //правильный ответ
        const rightQuestion = this.state.quiz[this.state.activeQuestion];
        // Результаты ответов
        const results = this.state.results;

        if (rightQuestion.rightAnswerId === answerId) {

            //добавление в массив results результата ответа - success где rightQuestion.id - номер вопроса
            if (!results[rightQuestion.id]) {
                results[rightQuestion.id] = 'success';
            }

            //подстветка правильности или нет ответа
            this.setState({
                answerState: {[answerId]: 'success'},
                results: results
            })

            //задержка по ответу для перехода
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout);
            }, 1500)
        } else {

            //добавление в массив results результата ответа - error
            results[rightQuestion.id] = 'error';

            //подстветка правильности или нет ответа
            this.setState({
                answerState: {[answerId]: 'error'},
                results: results
            });
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    // повторение опросника - обнулить state
    onRetry = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    //запрос к базе данных для получения нужного теста
    async componentDidMount() {

        console.log(this.props.match.params.id);
        try {
            const response = await Axios.get(`quiz/${this.props.match.params.id}.json`);
            const quiz = response.data;

            this.setState({
                quiz: quiz,
                loading: false
            })
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className={cn()}>
                <div className={cn('wrapper')}>

                    {
                        this.state.loading
                            ? <Loader/>
                            : this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.onRetry}
                            />
                            : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                questions={this.state.quiz[this.state.activeQuestion].questions}
                                onAnswerClick={this.onAnswerClick}
                                answerState={this.state.answerState}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                            />

                    }

                </div>
            </div>
        );
    }
};

export default Quiz;
