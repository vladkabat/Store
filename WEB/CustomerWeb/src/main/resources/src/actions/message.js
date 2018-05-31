import {
    CLEAR_ERROR_MESSAGE,
    SET_ERROR_MESSAGE
} from '../constants/message'

export const clearErrorMessage = () => {
    return (dispatch) => dispatch(dataClearErrorMessage())
};

export const dataClearErrorMessage = () => {
    return {type: CLEAR_ERROR_MESSAGE}
};

export const dataSetErrorMessage = (message) => {
    return {type: SET_ERROR_MESSAGE, payload: message}
};
