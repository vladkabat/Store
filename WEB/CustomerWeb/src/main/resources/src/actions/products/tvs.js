import axios from 'axios'
import {
    SET_TVS
} from '../../constants/products/tvs'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage} from "../message"
import {dataClearNameFilterProducts, dataSetErrorMessage} from "./filter/filterProducts"

export const getTvs = (page, size) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/tvs?page=' + page + '&size=' + size + '&sort=id')
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataClearNameFilterProducts());
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



