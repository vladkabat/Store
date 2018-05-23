import axios from 'axios'
import {
    SET_ENGINES,
    SET_ENGINE
} from '../../constants/products/engines'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"
import {
    dataOperationsFalse,
    dataDeleteTrue,
    dataCreatedTrue,
    dataUpdatedTrue
} from "../status"

export const getEngines = (page, size) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/engines?page=' + page + '&size=' + size + '&sort=id')
            .then((response) => {
                dispatch(dataOperationsFalse());
                dispatch(dataClearErrorMessage());
                dispatch(dataGetEngines(response.data));
            })
    }
};

export const getEngine = (id) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/engines/' + id)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataGetEngine(response.data));
            })
    }
};

export const deleteEngine = (id) => {
    return (dispatch) => {
        return axios
            .delete(API_URL + '/engines/' + id)
            .then(() => {
                dispatch(dataClearErrorMessage());
                dispatch(dataDeleteTrue());
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const createEngine = (file, name, manufacturer, ratedPower, ratedCurrent, amount, ratedVoltage) => {
    let data = new FormData();
    data.append("file", file);
    data.append("name", name);
    data.append("manufacturer", manufacturer);
    data.append("ratedPower", ratedPower);
    data.append("ratedCurrent", ratedCurrent);
    data.append("amount", amount);
    data.append("ratedVoltage", ratedVoltage);
    return (dispatch) => {
        return axios
            .post(API_URL + '/engines/', data, {
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

export const updateEngine = (file, id, name, manufacturer, ratedPower, ratedCurrent, amount, ratedVoltage) => {
    let data = new FormData();
    if(file !== undefined){
        data.append("file", file);
    }
    data.append("id", id);
    data.append("name", name);
    data.append("manufacturer", manufacturer);
    data.append("ratedPower", ratedPower);
    data.append("ratedCurrent", ratedCurrent);
    data.append("amount", amount);
    data.append("ratedVoltage", ratedVoltage);
    return (dispatch) => {
        return axios
            .put(API_URL + '/engines/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataUpdatedTrue());
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

const dataGetEngine = (engine) => {
    return {type: SET_ENGINE, payload: engine};
};

const dataGetEngines= (engines) => {
    return {type: SET_ENGINES, payload: engines};
};







