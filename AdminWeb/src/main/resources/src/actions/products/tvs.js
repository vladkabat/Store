import axios from 'axios'
import {
    SET_TVS
} from '../../constants/products/tvs'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"
import {dataOperationsProductFalse} from "../status"

export const getTvs = (page, size) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/tvs?page=' + page + '&size=' + size + '&sort=id')
            .then((response) => {
                dispatch(dataOperationsProductFalse());
                dispatch(dataClearErrorMessage());
                dispatch(dataGetTvs(response.data));
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

const dataGetTvs = (tvs) => {
    return {type: SET_TVS, payload: tvs};
};



