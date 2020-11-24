import React, {Component} from 'react';
import {block} from 'bem-cn';
import {NavLink} from "react-router-dom";
import Loader from "../UI/Loader/Loader";
import Axios from "../../functionality/Axios/Axios";

import './quizlist.scss';

const cn = block('quiz-list');


class QuizList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quizes : [],
            loading: true
        }
    }

    renderQuizes() {
        return this.state.quizes.map((quiz)=> {
            return(
                <li key={quiz.id}>
                    <NavLink to={'/quiz/'+quiz.id}>{quiz.name}</NavLink>
                </li>
            )
        })
    }

    //получение всех тестов с нашего сервера https://react-quiz-2ffda.firebaseio.com/quizes.json
    async componentDidMount() {

        try{
            const response = await Axios.get('quizes.json');

            //добавление тестов в state.quizes
            const quizes = [];

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест № ${index+1}`
                })
            })

            this.setState({
                quizes: quizes,
                loading: false
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className={cn()}>
                <div>
                    <h1>Список тестов</h1>

                    { this.state.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
                </div>
            </div>
        );
    }
};

export default QuizList;
