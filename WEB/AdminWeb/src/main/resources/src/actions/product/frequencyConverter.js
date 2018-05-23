import axios from 'axios'
import {
    SET_FREQUENCY_CONVERTER
} from '../../constants/product/frequencyConverter'
import {
    dataDeleteTrue,
    dataCreatedTrue,
    dataUpdatedTrue
} from '../status'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"

export const getFrequencyConverter = (id) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/frequencyConverters/' + id)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataGetFrequencyConverter(response.data))
            })
    }
};

export const createFrequencyConverter = (file, name, manufacturer, outputPower, outputCurrent, amount, outputVoltage) => {
    let data = new FormData();
    data.append("file", file);
    data.append("name", name);
    data.append("manufacturer", manufacturer);
    data.append("outputPower", outputPower);
    data.append("outputCurrent", outputCurrent);
    data.append("amount", amount);
    data.append("outputVoltage", outputVoltage);
    return (dispatch) => {
        return axios
            .post(API_URL + '/frequencyConverters/', data, {
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

export const updateFrequencyConverter = (file, id, name, manufacturer, outputPower, outputCurrent, amount, outputVoltage) => {
    let data = new FormData();
    if(file !== undefined){
        data.append("file", file);
    }
    data.append("id", id);
    data.append("name", name);
    data.append("manufacturer", manufacturer);
    data.append("outputPower", outputPower);
    data.append("outputCurrent", outputCurrent);
    data.append("amount", amount);
    data.append("outputVoltage", outputVoltage);
    return (dispatch) => {
        return axios
            .put(API_URL + '/frequencyConverters/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                dispatch(dataClearErrorMessage());
                dispatch(dataUpdatedTrue());
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const deleteFrequencyConverter = (id) => {
    return (dispatch) => {
        return axios
            .delete(API_URL + '/frequencyConverters/' + id)
            .then(() => {
                dispatch(dataClearErrorMessage());
                dispatch(dataDeleteTrue());
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

const dataGetFrequencyConverter = (frequencyConverter) => {
    return {type: SET_FREQUENCY_CONVERTER, payload: frequencyConverter};
};



