import {
    LOGIN,
    LOGOUT
} from '../constants/customer'

const initialState = {
    isAuthenticated: false,
    id: '',
    username: '',
    password: ''
};

const customer = (state = initialState, action) => {
    if (action.type === LOGIN) {
        let customer = action.payload;
        localStorage.setItem("customer", JSON.stringify(customer));
        return customer;
    } else if (action.type === LOGOUT) {
        localStorage.removeItem("customer");
        return initialState;
    }
    return state
};

export default customer
