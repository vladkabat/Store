import axios from 'axios'
import {
    SET_PHONE
} from '../../constants/product/phone'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"

export const getPhone = (id) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/phones/' + id)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataSetPhone(response.data));
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const updateRatingPhone = (id, rating) => {
    return (dispatch) => {
        return axios
            .put(API_URL + '/phones/' + id + '/rating', rating)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataSetPhone(response.data));
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

const dataSetPhone = (phone) => {
    return {type: SET_PHONE, payload: phone};
};



