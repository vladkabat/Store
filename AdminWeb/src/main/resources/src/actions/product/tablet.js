import axios from 'axios'
import {
    SET_TABLET
} from '../../constants/product/tablet'
import {
    dataDeleteProductTrue,
    dataCreatedProductTrue,
    dataUpdatedProductTrue
} from '../status'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"

export const getTablet = (id) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/tablets/' + id)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataGetTablet(response.data))
            })
    }
};

export const createTablet = (file, name, description, ram, numberCores, amount, screenSize) => {
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
            .post(API_URL + '/tablets/', data, {
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

export const updateTablet = (file, id, name, description, ram, numberCores, amount, screenSize) => {
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
            .put(API_URL + '/tablets/', data, {
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

export const deleteTablet = (id) => {
    return (dispatch) => {
        return axios
            .delete(API_URL + '/tablets/' + id)
            .then(() => {
                dispatch(dataClearErrorMessage());
                dispatch(dataDeleteProductTrue());
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

const dataGetTablet = (tablet) => {
    return {type: SET_TABLET, payload: tablet};
};



