import React, {Component} from 'react';
import {block} from 'bem-cn';
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import is from 'is_js';
import axios from 'axios';

import './Auth.scss';

const cn = block('auth');

class Auth extends Component {

    constructor(props) {
        super(props);

        // значения state для проверки ввода в поля input
        this.state = {
            isFormValid: false,
            formControls: {
                email: {
                    value: '',
                    type: 'email',
                    label: 'Email',
                    errorMessage: 'Введите корректный Email',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        email: true
                    }
                },
                password: {
                    value: '',
                    type: 'password',
                    label: 'Пароль',
                    errorMessage: 'Введите корректный пароль',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6
                    }
                }
            }
        }
    }

    //кнопка login
    loginHandler = async() => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try{
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDapKhMqtD_2ya2FQGKPdyOjOSIgzCthkM', authData);
            console.log(response.data);
        }
        catch(error){
            console.log(error);
        }
    }

    //кнопка регистрация
    registerHandler = async() => {

        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try{
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDapKhMqtD_2ya2FQGKPdyOjOSIgzCthkM', authData);
            console.log(response.data);
        }
        catch(error){
            console.log(error);
        }
    }

    //отправка формы
    submitHandler = () => {
        // event.preventDefault();
    }

    //функция правил валидации inputов
    validateControl = (value, validation) => {
        if (!validation) {
            return true
        }

        let isValid = true;

        //проверка на пустой инпут
        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        // взяли в поиске google -> npm i is_js - пакет проверки email или regexp
        if (validation.email) {
            isValid = is.email(value) && isValid
        }

        //проверка на длину вводимого слова в инпуте
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid;
    }

    //фукнция onChange на инпуте
    onChangeHandler = (event, controlName) => {

        // создаем копии обьектов из state
        const formControls = {...this.state.formControls}
        // создаем копии контрола
        const control = {...formControls[controlName]}

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        // получение всех актуальных контролов со всеми актуальными значениями
        formControls[controlName] = control;

        //проверка всей формы, где isFormValid из нашего state
        let isFormValid = true;
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls,
            isFormValid
        })
    }

    //функция вывода inputов
    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            // для укорочевания записи
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}

                    touched={control.touched}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                />
            )
        })
    }

    render() {
        return (
            <div className={cn()}>
                <div className={cn('container')}>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler}>

                        {/*функция вывода inputов*/}
                        {this.renderInputs()}

                        <Button
                            type='success'
                            const={this.loginHandler}
                            disabled={!this.state.isFormValid}> {/*блок кнопок если форма невалидная*/}
                            Войти
                        </Button>
                        <Button
                            type='primary'
                            const={this.registerHandler}
                            disabled={!this.state.isFormValid}>
                            Регистрация
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
};

export default Auth;
