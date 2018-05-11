import axios from 'axios'
import {
    LOGOUT,
    LOGIN
} from '../constants/customer'
import {dataClearErrorMessage, dataSetErrorMessage} from './message'
import {API_URL} from '../constants/store'

export const registrationUser = (user) => {
    return (dispatch) =>
        axios
            .post(API_URL + '/users', user)
            .then((response) => {
                let customer = {
                    id: response.data.id,
                    username: user.username,
                    password: user.password,
                    isAuthenticated: true
                };
                let token = btoa(customer.username + ':' + customer.password);
                axios.defaults.headers.common['Authorization'] = 'Basic ' + token;
                dispatch(dataClearErrorMessage());
                dispatch(dataLoginUserData(customer));
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
};

export const loginUser = (user) => {
    return (dispatch) =>
        axios
            .get(API_URL + '/users', {
                    params: {
                        username: user.username,
                        password: user.password
                    }
                }
            )
            .then((response) => {
                if (response.data.authorities[0] === 'ROLE_CUSTOMER') {
                    let customer = {
                        id: response.data.id,
                        username: user.username,
                        password: user.password,
                        isAuthenticated: true
                    };
                    let token = btoa(customer.username + ':' + customer.password);
                    axios.defaults.headers.common['Authorization'] = 'Basic ' + token;
                    dispatch(dataClearErrorMessage());
                    dispatch(dataLoginUserData(customer));
                } else {
                    dispatch(dataSetErrorMessage('You are not customer!'));
                }
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
};

export const logoutUser = () => {
    delete axios.defaults.headers.common['Authorization'];
    return (dispatch) => {
        dispatch(dataClearErrorMessage());
        dispatch(dataLogoutUser());
    };
};

const dataLogoutUser = () => {
    return {type: LOGOUT};
};

export const dataLoginUserData = (customer) => {
    return {type: LOGIN, payload: customer};
};

