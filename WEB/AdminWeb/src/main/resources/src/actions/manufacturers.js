import axios from 'axios'
import {
    SET_MANUFACTURERS,
    DELETE_MANUFACTURER
} from '../constants/manufacturers'
import {API_URL} from '../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "./message"
import {
    dataOperationsFalse,
    dataDeleteTrue,
    dataCreatedTrue,
    dataUpdatedTrue
} from "./status"

export const getManufacturers = (page, size) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/manufacturers?page=' + page + '&size=' + size + '&sort=id')
            .then((response) => {
                dispatch(dataOperationsFalse());
                dispatch(dataClearErrorMessage());
                dispatch(dataGetManufacturers(response.data));
            })
    }
};

export const deleteManufacturer = (id) => {
    return (dispatch) => {
        return axios
            .delete(API_URL + '/manufacturers/' + id)
            .then(() => {
                dispatch(dataClearErrorMessage());
                dispatch(dataDeleteTrue());
                dispatch(dataDeleteManufacturer(id));

            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const createManufacturer = (name, phone, email, description) => {
    let data = new FormData();
    data.append("name", name);
    data.append("phone", phone);
    data.append("email", email);
    data.append("description", description);
    return (dispatch) => {
        return axios
            .post(API_URL + '/manufacturers/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                dispatch(dataClearErrorMessage());
                dispatch(dataCreatedTrue());
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const updateManufacturer = (manufacturer) => {
    return (dispatch) => {
        return axios
            .put(API_URL + '/manufacturers/', manufacturer)
            .then(() => {
                dispatch(dataClearErrorMessage());
                dispatch(dataUpdatedTrue());
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

const dataDeleteManufacturer = (id) => {
    return {type: DELETE_MANUFACTURER, payload: id};
};

const dataGetManufacturers= (manufacturers) => {
    return {type: SET_MANUFACTURERS, payload: manufacturers};
};