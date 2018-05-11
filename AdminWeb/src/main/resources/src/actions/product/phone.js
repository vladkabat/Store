import axios from 'axios'
import {
    SET_PHONE
} from '../../constants/product/phone'
import {
    dataDeleteProductTrue,
    dataCreatedProductTrue,
    dataUpdatedProductTrue
} from '../status'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"

export const getPhone = (id) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/phones/' + id)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataGetPhone(response.data));
            })
    }
};

export const deletePhone = (id) => {
    return (dispatch) => {
        return axios
            .delete(API_URL + '/phones/' + id)
            .then(() => {
                dispatch(dataClearErrorMessage());
                dispatch(dataDeleteProductTrue());
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const createPhone = (file, name, description, ram, numberCores, amount, screenSize) => {
    let data = new FormData();
    data.append("file", file);
    data.append("name", name);
    data.append("description", description);
    data.append("ram", ram);
    data.append("numberCores", numberCores);
    data.append("amount", amount);
    data.append("screenSize", screenSize);
    return (dispatch) => {
        return axios
            .post(API_URL + '/phones/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                dispatch(dataClearErrorMessage());
                dispatch(dataCreatedProductTrue());
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const updatePhone = (file, id, name, description, ram, numberCores, amount, screenSize) => {
    let data = new FormData();
    if(file !== undefined){
        data.append("file", file);
    }
    data.append("id", id);
    data.append("name", name);
    data.append("description", description);
    data.append("ram", ram);
    data.append("numberCores", numberCores);
    data.append("amount", amount);
    data.append("screenSize", screenSize);
    return (dispatch) => {
        return axios
            .put(API_URL + '/phones/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                dispatch(dataClearErrorMessage());
                dispatch(dataUpdatedProductTrue());
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

const dataGetPhone = (phone) => {
    return {type: SET_PHONE, payload: phone};
};



