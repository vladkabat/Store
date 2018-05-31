import {
    CLEAR_ERROR_MESSAGE,
    SET_ERROR_MESSAGE
} from '../constants/message'

const message = (state = "", action) => {
    if (action.type === CLEAR_ERROR_MESSAGE) {
        return "";
    } else if (action.type === SET_ERROR_MESSAGE) {
        return action.payload;
    }
    return state
};

export default message
