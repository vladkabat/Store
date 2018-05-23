import axios from 'axios'
import {
    SET_FREQUENCY_CONVERTERS
} from '../../constants/products/frequencyConverters'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"
import {dataOperationsFalse} from "../status"

export const getFrequencyConverters = (page, size) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/frequencyConverters?page=' + page + '&size=' + size + '&sort=id')
            .then((response) => {
                dispatch(dataOperationsFalse());
                dispatch(dataClearErrorMessage());
                dispatch(dataGetFrequencyConverters(response.data));
            })
    }
};

const dataGetFrequencyConverters = (frequencyConverters) => {
    return {type: SET_FREQUENCY_CONVERTERS, payload: frequencyConverters};
};



