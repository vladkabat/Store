import axios from 'axios'
import {
    SET_PHONES
} from '../../constants/products/phones'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"
import {dataClearNameFilterProducts} from "./filter/filterProducts"

export const getPhones = (page, size) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/phones?page=' + page + '&size=' + size + '&sort=id')
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataClearNameFilterProducts());
                dispatch(dataGetPhones(response.data));
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

const dataGetPhones = (phones) => {
    return {type: SET_PHONES, payload: phones};
};


