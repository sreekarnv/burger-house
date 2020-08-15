export const onChangeFormInput = (e, state) => {
    return {
        ...state,
        formInput: {
            ...state.formInput,
            [e.target.name]: e.target.value
        }
    }
}

export const clearFields = (state) => {
    let stateCopy = { ...state.formInput };
    let formInput = {};
    Object.keys(stateCopy).map(el => {
        return formInput[el] = ''
    })
    return formInput;
}