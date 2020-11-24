import React, {Component} from 'react';
import axios from 'axios';
import {block} from 'bem-cn';
import Button from "../UI/Button/Button";
import {createFormsControls, validate, validateForm} from "../../functionality/Form/FormFramework";
import Input from "../UI/Input/Input";
import Auxiliary from "../../HOC/Auxiliary";
import Select from "../UI/Select/Select";

import './quizcreator.scss';

const cn = block('quizcreator');

class QuizCreator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quiz: [],
            isFormValid: false,
            formControls: createFormsControls(),
            rightAnswer: 1
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
    }

    // кнопка добавления вопроса
    addQuestionHandler = (event) => {
        event.preventDefault();

        //копия массива из state
        const quiz = [...this.state.quiz];
        // index номер для id
        const index = quiz.length + 1;
        //сокращение для объекта массива answer
        const {question, option1, option2, option3, option4} = this.state.formControls

        // создаем объект каждого вопроса и кладем его в массив
        const questionIten = {
            question: question.value,
            id: index,
            rightAnswer: this.state.rightAnswerId,
            answers:[
                {text: option1.value, id:option1.id},
                {text: option2.value, id:option2.id},
                {text: option3.value, id:option3.id},
                {text: option4.value, id:option4.id}
            ]
        }

        //добавление в массив
        quiz.push(questionIten);

        // изменяем state на новый + ОБНУЛЯЕМ
        this.setState({
            quiz: quiz,
            isFormValid: false,
            formControls: createFormsControls(),
            rightAnswer: 1
        })
    }

    // кнопка создание и добавления теста и async запрос
    createQuizHandler = async event => {
        event.preventDefault();

        //отправка теста на https://react-quiz-2ffda.firebaseio.com/
        // axios.post('https://react-quiz-2ffda.firebaseio.com/quizes.json', this.state.quiz)
        //     .then( response => {
        //         console.log(this.state.quiz);
        // })
        //     .catch(
        //         error => console.log(error)
        //     )

        //отправка теста на https://react-quiz-2ffda.firebaseio.com/
        try {
            const response = await axios.post('https://react-quiz-2ffda.firebaseio.com/quizes.json', this.state.quiz)
            console.log(response.data);

            this.setState({
                quiz: [],
                isFormValid: false,
                formControls: createFormsControls(),
                rightAnswer: 1
            })
        } catch (error) {
            console.log(error);
        }
    }

    //фукнция onChange на инпуте
    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    // метод создания inputs
    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            // для укорочевания записи
            const control = this.state.formControls[controlName];

            return (
                // Auxiliary - hoc для того чтобы вставить два компонента без div
                <Auxiliary  key={controlName+index}>
                    <Input
                        type={control.type}
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />

                    {/*добавление гор.черты после 1-элемента*/}
                    {
                        index === 0 && <hr/>
                    }
                </Auxiliary>
            )
        })
    }

    selectChangeHandler = (event) => {
        this.setState({
            rightAnswer: +event.target.value
        })
    }

    render() {
        return (
            <div className={cn()}>
                <div className={cn('block')}>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>

                        {
                            this.renderInputs()
                        }

                        <Select
                            label={'Выберите правильный ответ'}
                            value={this.state.rightAnswer}
                            options={[
                                {text:1, value:1},
                                {text:2, value:2},
                                {text:3, value:3},
                                {text:4, value:4}
                            ]}
                            onChange={this.selectChangeHandler}
                        />

                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}>
                            Добавить вопрос
                        </Button>

                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={this.state.quiz.length === 0}>
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
};

export default QuizCreator;
