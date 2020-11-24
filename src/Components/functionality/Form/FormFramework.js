//функция чтобы не дублировать state
export function createControl (config, validation) {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: ''
    }
}

//функция чтобы не дублировать контроллы
export function createOptionControl (number) {
    return createControl({
        id: number,
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым'
    }, {required: true})
}

// функция для обнуления FormControl
export function createFormsControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

// функция для валидации инпута в форме
export function validate(value, validation = null) {
    if (!validation) {
        return true;
    }

    let isValid = true;

    if (validation.required) {
        isValid = value.trim() !== '' && isValid;
    }

    return isValid;
}

// функция для валидации всей формы
export function validateForm(formControls) {
    let isFormValid = true;

    //проверка всей формы, где isFormValid из нашего state
    Object.keys(formControls).forEach(name => {
        isFormValid = formControls[name].valid && isFormValid
    })

    return isFormValid;
}
