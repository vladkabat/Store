import axios from 'axios'
import {dataAuthenticatedAdminFalse, dataAuthenticatedAdminTrue} from './status'
import {dataClearErrorMessage, dataSetErrorMessage} from './message'
import {API_URL} from '../constants/store'

export const login = (admin) => {
    return (dispatch) =>
        axios
            .get(API_URL + '/users', {
                    params: {username: admin.username, password: admin.password}
                }
            )
            .then((response) => {
                let dataAdminFromServer = response.data;
                if (dataAdminFromServer.authorities[0] === 'ROLE_ADMIN') {
                    let token = window.btoa(admin.username + ':' + admin.password);
                    axios.defaults.headers.common['Authorization'] = 'Basic ' + token;
                    dispatch(dataClearErrorMessage());
                    dispatch(dataAuthenticatedAdminTrue());
                } else {
                    dispatch(dataSetErrorMessage('You are not admin!'));
                }
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
};

export const setFilter = (value) => {
    let data = new FormData();
    data.append("value", value);
    axios.post(API_URL + '/products/filter', data);
};

export const logout = () => {
    delete axios.defaults.headers.common['Authorization'];
    return (dispatch) => {
        dispatch(dataClearErrorMessage());
        dispatch(dataAuthenticatedAdminFalse());
    };
};

