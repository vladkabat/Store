import axios from 'axios'
import {
    SET_FREQUENCY_CONVERTER
} from '../../constants/product/frequencyConverter'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"

export const getFrequencyConverter = (id) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/frequencyConverters/' + id)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataSetFrequencyConverter(response.data))
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const updateRatingFrequencyConverter = (id, rating) => {
    return (dispatch) => {
        return axios
            .put(API_URL + '/frequencyConverters/' + id + '/rating', rating)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataSetFrequencyConverter(response.data));
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

const dataSetFrequencyConverter = (frequencyConverter) => {
    return {type: SET_FREQUENCY_CONVERTER, payload: frequencyConverter};
};



